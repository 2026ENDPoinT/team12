"""Prepare openly licensed campus geometry; does not copy SMASH application code.
Usage: PYTHONPATH=/tmp/sai-geo-deps python3 scripts/prepare-campus.py source.json
Requires shapely 2.x only when regenerating data. The website uses the saved JSON.
"""
import json, math, sys
from pathlib import Path
from shapely.geometry import Polygon, LineString, Point, MultiLineString
from shapely.ops import unary_union, nearest_points

source=json.loads(Path(sys.argv[1]).read_text())
campus=unary_union([Polygon(r).buffer(0) for r in source['campus']])
clip=campus.buffer(10)
buildings=[]
name_ids={'미래관':'future','어의관':'eoui','다빈치관':'davinci','도서관/정보전산원':'library','프론티어관':'frontier','다산관':'dasan','창학관':'changhak','대학본부':'admin','제1학생회관':'student','100주년기념관':'memorial','무궁관':'mugung','서울테크노파크':'techno','청운관':'cheongun','창조관':'creative','하이테크관':'hightech','테크노큐브':'cube','체육관':'gym','제2학생회관':'student2'}
for b in source['buildings']:
 p=Polygon(b['o'],b.get('ho',[])).buffer(0)
 if p.is_empty or not campus.covers(p.representative_point()) or '기계공' in (b.get('n') or ''):continue
 if p.geom_type!='Polygon':p=max(p.geoms,key=lambda q:q.area)
 center=p.centroid;name=b.get('n') or '교내 건물'
 buildings.append({'id':name_ids.get(name,b['id'].replace('/','-')),'sourceId':b['id'],'name':'중앙도서관' if name=='도서관/정보전산원' else name,'outline':list(p.exterior.coords)[:-1],'holes':[list(h.coords)[:-1] for h in p.interiors],'x':round(center.x,2),'z':round(center.y,2),'h':b['h'],'floors':b.get('lv') or max(1,round(b['h']/4)),'roof':b.get('rc'),'kind':'학교 건물 · 공개 지도 데이터'})
polys=[Polygon(b['outline'],b['holes']) for b in buildings]
obstacles=unary_union(polys).buffer(.15)
def lines(geometry):
 if geometry.is_empty:return []
 if geometry.geom_type=='LineString':return [geometry]
 if hasattr(geometry,'geoms'):return [part for g in geometry.geoms for part in lines(g)]
 return []
roads=[]
for r in source['roads']:
 for line in lines(LineString(r['p']).intersection(clip)):
  if line.length<.5:continue
  roads.append({'kind':r['k'],'name':r.get('n') or '교내 보행로','points':list(line.coords)})
routable=[r for r in roads if r['kind'] in ('footway','path','steps','service','living_street')]
network=unary_union([LineString(r['points']).difference(obstacles) for r in routable])
# Build a preliminary graph to identify its main connected component.
def make_graph(geoms):
 nodes={};edges=[];lookup={};seen=set()
 def node(p):
  key=(round(p[0],1),round(p[1],1))
  if key not in lookup:
   id='n'+str(len(nodes));lookup[key]=id;nodes[id]={'x':key[0],'z':key[1],'name':'교내 보행로'}
  return lookup[key]
 for line in lines(geoms):
  coords=list(line.coords)
  for a,b in zip(coords,coords[1:]):
   u,v=node(a),node(b)
   if u==v:continue
   key=tuple(sorted([u,v]))
   if key in seen:continue
   seen.add(key);mid=Point((a[0]+b[0])/2,(a[1]+b[1])/2)
   parent=min(routable,key=lambda r:LineString(r['points']).distance(mid))
   length=math.hypot(nodes[u]['x']-nodes[v]['x'],nodes[u]['z']-nodes[v]['z'])
   edges.append({'a':u,'b':v,'meters':round(length,2),'stairs':parent['kind']=='steps','name':parent['name']})
 return nodes,edges
nodes,edges=make_graph(network)
adj={id:set() for id in nodes}
for e in edges:adj[e['a']].add(e['b']);adj[e['b']].add(e['a'])
components=[];pending=set(nodes)
while pending:
 todo=[pending.pop()];component=set(todo)
 while todo:
  u=todo.pop()
  for v in adj[u]:
   if v not in component:component.add(v);pending.discard(v);todo.append(v)
 components.append(component)
main=max(components,key=len)
mainlines=[LineString([(nodes[e['a']]['x'],nodes[e['a']]['z']),(nodes[e['b']]['x'],nodes[e['b']]['z'])]) for e in edges if e['a'] in main]
base_network=unary_union(mainlines)
anchors={};connectors=[]
start_ids=['future','eoui','davinci','library','frontier','dasan','student','memorial']
for b in buildings:
 if b['id'] not in start_ids:continue
 poly=Polygon(b['outline'],b['holes'])
 candidates=[]
 for line in mainlines:
  a,p=nearest_points(poly.exterior,line);connector=LineString([a,p])
  # Do not introduce connectors through another building.
  other=unary_union([q for q in polys if not q.equals(poly)])
  if connector.length>.1 and connector.intersection(other.buffer(-.05)).length>.1:continue
  candidates.append((connector.length,a,p,connector))
 _,a,p,connector=min(candidates,key=lambda row:row[0])
 entrance=b['id']+'Door';anchors[entrance]={'x':round(a.x,1),'z':round(a.y,1),'name':b['name']+' 입구 인근'};b['entry']=entrance
 if connector.length>.1:connectors.append(connector)
# Approximate main gate from an existing OSM path coordinate, not a surveyed entrance.
gate=Point(-146.6,432.7);nearest=nearest_points(gate,base_network)[1]
anchors['gate']={'x':round(nearest.x,1),'z':round(nearest.y,1),'name':'정문 인근'}
# Force a split at every connector and gate by noding the linework.
all_lines=mainlines+connectors
if gate.distance(nearest)>.05:all_lines.append(LineString([gate,nearest]))
# Tiny cross-lines force noding at anchors already lying on an existing line.
for a in anchors.values():
 p=Point(a['x'],a['z']);target=nearest_points(p,unary_union(all_lines))[1]
 all_lines.append(LineString([(target.x-.001,target.y-.001),(target.x+.001,target.y+.001)]))
nodes,edges=make_graph(unary_union(all_lines))
# Remap nearest graph nodes to stable entrance IDs.
renames={}
for id,anchor in anchors.items():
 nearest=min(nodes,key=lambda n:math.hypot(nodes[n]['x']-anchor['x'],nodes[n]['z']-anchor['z']))
 renames[nearest]=id
 nodes[nearest]['name']=anchor['name']
new_nodes={renames.get(id,id):value for id,value in nodes.items()}
for e in edges:e['a']=renames.get(e['a'],e['a']);e['b']=renames.get(e['b'],e['b'])
lands=[]
for land in source['lands']:
 for ring in land['r']:
  p=Polygon(ring).buffer(0).intersection(campus)
  candidates=list(p.geoms) if p.geom_type=='MultiPolygon' else [p]
  for poly in candidates:
   if poly.geom_type=='Polygon' and poly.area>8:lands.append({'kind':land['k'],'outline':list(poly.exterior.coords)[:-1]})
trees=[]
for i,t in enumerate(source['trees']):
 p=Point(t[0],t[1])
 if i%2==0 and campus.covers(p) and not obstacles.covers(p):trees.append([t[0],t[1],t[2]])
result={'attribution':{'databaseLicense':'ODbL-1.0','osm':'© OpenStreetMap contributors','geometrySource':'https://github.com/Hong-Iron/SMASH-SEOULTECH/blob/5f3e93bcd8570f796dc405c2c33906dcd353fd2b/data/campus.json','supplemental':'국토교통부 브이월드 · 공공누리 제1유형','changes':'Clip to campus; flat ground; derive an unverified walking graph; approximate entrance connectors. SMASH application code and artwork are not included.'},'meta':source['meta'],'boundary':[list(campus.exterior.coords)[:-1]],'buildings':buildings,'roads':roads,'lands':lands,'trees':trees,'nodes':new_nodes,'edges':edges}
Path('data/seoultech.json').write_text(json.dumps(result,ensure_ascii=False,separators=(',',':')))
Path('dist/data/seoultech.json').write_text(json.dumps(result,ensure_ascii=False,separators=(',',':')))
print(f"{len(buildings)} buildings, {len(roads)} road lines, {len(new_nodes)} walking nodes, {len(edges)} edges, {len(trees)} trees")
print('components:',sorted(map(len,components),reverse=True)[:8]);print('anchors',anchors)
