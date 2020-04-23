# Migration `20200423135225-dept-short-name`

This migration has been generated at 4/23/2020, 1:52:25 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Department" ADD COLUMN "shortName" text  NOT NULL DEFAULT '';

ALTER TABLE "public"."Milestone" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS';

ALTER TABLE "public"."Sprint" ALTER COLUMN "status" SET DEFAULT 'NOT_STARTED';

ALTER TABLE "public"."Task" ALTER COLUMN "status" SET DEFAULT 'NOT_ASSIGNED';

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'COORD';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200423134816-init..20200423135225-dept-short-name
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
@@ -9,8 +9,9 @@
 model Department {
   id                String    @default(cuid()) @id
   name              String
+  shortName         String    @default("")
   subDepartments    Team[]    @relation("DeptTeams")
   members           User[]    @relation("DepartmentMembers")
   tasksAssigned     Task[]    @relation("TasksForDept")
   tasksCreated      Task[]    @relation("TasksByDept")
```


