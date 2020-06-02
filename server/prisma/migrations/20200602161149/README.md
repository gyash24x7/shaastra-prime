# Migration `20200602161149`

This migration has been generated at 6/2/2020, 4:11:49 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Milestone" ALTER COLUMN "status" SET DEFAULT E'IN_PROGRESS';

ALTER TABLE "public"."Task" ADD COLUMN "deleted" boolean  NOT NULL DEFAULT false,
ALTER COLUMN "status" SET DEFAULT E'NOT_ASSIGNED';

ALTER TABLE "public"."TeamInvitation" ALTER COLUMN "status" SET DEFAULT E'NO_RESPONSE';

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT E'COORD';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200527183921..20200602161149
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -120,8 +120,9 @@
   forDeptId   String
   createdById String
   activity    TaskActivity[] @relation("TaskActivity")
   channels    Channel[]      @relation("TaskUpdateChannels", references: [id])
+  deleted     Boolean        @default(false)
 }
 model TaskActivity {
   id          String           @default(cuid()) @id
```


