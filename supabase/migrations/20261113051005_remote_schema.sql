SET local check_function_bodies = off;

CREATE TABLE "public"."building_works" (
  "id"          uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "building_id" text                     NOT NULL,
  "start_date"  date                     NOT NULL,
  "end_date"    date                     NOT NULL,
  "note"        text,
  "created_at"  timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "building_works_check" CHECK ((start_date <= end_date)),
  CONSTRAINT "building_works_note_check" CHECK (((note IS NULL) OR (length(note) <= 100))),
  CONSTRAINT "building_works_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."building_works"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."road_reports" (
  "id"                 uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "edge_id"            text                     NOT NULL,
  "point_x"            double precision         NOT NULL,
  "point_z"            double precision         NOT NULL,
  "reason"             text                     NOT NULL,
  "photo_path"         text,
  "reporter_device_id" text,
  "created_at"         timestamp with time zone NOT NULL DEFAULT now(),
  "status"             text                     NOT NULL DEFAULT 'reported'::text,
  "confirmed_at"       timestamp with time zone,
  "confirmed_by"       text,
  "reason_note"        text,
  "is_cover"           boolean                  NOT NULL DEFAULT false,
  CONSTRAINT "road_reports_pkey" PRIMARY KEY (id),
  CONSTRAINT "road_reports_status_check" CHECK ((status = ANY (ARRAY['reported'::text, 'confirmed'::text, 'dismissed'::text])))
);

ALTER TABLE "public"."road_reports"
  ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.rls_auto_enable()
  RETURNS event_trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'pg_catalog'
  AS $function$
DECLARE
  cmd record;
  tbl name;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        SELECT c.relname INTO tbl FROM pg_catalog.pg_class c WHERE c.oid = cmd.objid;
        EXECUTE format('alter table if exists %I.%I enable row level security', cmd.schema_name, tbl);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$function$;

ALTER TABLE "public"."road_reports"
  ADD CONSTRAINT "road_reports_other_note_check"
    CHECK (((reason <> 'other'::text) OR ((length(TRIM(BOTH FROM COALESCE(reason_note, ''::text))) >= 1) AND (length(TRIM(BOTH FROM COALESCE(reason_note, ''::text))) <= 100))))
    NOT VALID;

ALTER TABLE "public"."road_reports"
  ADD CONSTRAINT "road_reports_photo_required" CHECK ((photo_path IS NOT NULL)) NOT VALID;

ALTER TABLE "public"."road_reports"
  ADD CONSTRAINT "road_reports_reason_check" CHECK ((reason = ANY (ARRAY['construction'::text, 'blocked'::text, 'other'::text]))) NOT VALID;

CREATE POLICY "building_works demo delete" ON "public"."building_works"
  FOR DELETE
  TO "anon", "authenticated"
  USING (true);

CREATE POLICY "building_works demo insert" ON "public"."building_works"
  FOR INSERT
  TO "anon", "authenticated"
  WITH CHECK (true);

CREATE POLICY "building_works read" ON "public"."building_works"
  FOR SELECT
  TO "anon", "authenticated"
  USING (true);

CREATE POLICY "road_reports demo delete any" ON "public"."road_reports"
  FOR DELETE
  TO "anon", "authenticated"
  USING (true);

CREATE POLICY "누구나 신고 등록 가능" ON "public"."road_reports"
  FOR INSERT
  TO PUBLIC
  WITH CHECK (true);

CREATE POLICY "누구나 신고 조회 가능" ON "public"."road_reports"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "상태 변경 허용 (임시, 관리자 로그인 전)" ON "public"."road_reports"
  FOR UPDATE
  TO PUBLIC
  USING (true);

CREATE POLICY "report photos upload" ON "storage"."objects"
  FOR INSERT
  TO "anon", "authenticated"
  WITH CHECK ((bucket_id = 'report-photos'::text));

CREATE EVENT TRIGGER "ensure_rls"
  ON ddl_command_end
  WHEN TAG IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
  EXECUTE FUNCTION "public"."rls_auto_enable"();

GRANT EXECUTE ON FUNCTION "public"."rls_auto_enable"() TO PUBLIC, "anon", "authenticated";

REVOKE ALL ON FUNCTION "public"."rls_auto_enable"() FROM "postgres";

GRANT EXECUTE ON FUNCTION "public"."rls_auto_enable"() TO "postgres";

GRANT EXECUTE ON FUNCTION "public"."rls_auto_enable"() TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."building_works" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."building_works" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."building_works" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."building_works" TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."road_reports" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."road_reports" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."road_reports" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."road_reports" TO "service_role";
