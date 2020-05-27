# Migration `20200527183921`

This migration has been generated at 5/27/2020, 6:39:21 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Milestone" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS';

ALTER TABLE "public"."Task" ALTER COLUMN "status" SET DEFAULT 'NOT_ASSIGNED';

ALTER TABLE "public"."TeamInvitation" ALTER COLUMN "status" SET DEFAULT 'NO_RESPONSE';

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'COORD';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200527181311..20200527183921
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
@@ -52,9 +52,9 @@
   Vertical          Vertical[]        @relation("VerticalUpdatedBy")
   Event             Event[]           @relation("EventUpdatedBy")
   TaskActivity      TaskActivity[]    @relation("TaskActivityByUser")
   InvoiceActivity   InvoiceActivity[] @relation("InvoiceActivityByUser")
-  Department        Department        @relation("FinManagerForDept")
+  Department        Department?       @relation("FinManagerForDept")
 }
 model Channel {
   id                String      @default(cuid()) @id
```


