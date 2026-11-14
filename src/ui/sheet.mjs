// 좌표는 화면 px, 높이는 CSS px입니다(모바일 패널은 zoom: .9 사용).
export function draggedSheetHeight(startHeight, deltaY, zoom, collapsed, expanded) {
  return Math.max(collapsed, Math.min(expanded, startHeight - deltaY / zoom));
}

export function shouldCollapseSheet(height, velocityY, collapsed, expanded) {
  if (Math.abs(velocityY) > 0.45) return velocityY > 0;
  return height < (collapsed + expanded) / 2;
}
