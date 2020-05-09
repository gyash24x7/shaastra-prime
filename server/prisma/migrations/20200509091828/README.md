# Migration `20200509091828`

This migration has been generated at 5/9/2020, 9:18:28 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TYPE "TaskActivityType" ADD VALUE 'CONNECT_CHANNEL';
ALTER TYPE "TaskActivityType" ADD VALUE 'UPLOAD_MEDIA'

ALTER TABLE "public"."Task" ALTER COLUMN "status" SET DEFAULT 'NOT_ASSIGNED';

ALTER TABLE "public"."TeamInvitation" ALTER COLUMN "status" SET DEFAULT 'NO_RESPONSE';

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'COORD';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200509075753..20200509091828
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
@@ -284,8 +284,10 @@
   ASSIGNED
   IN_PROGRESS
   SUBMITTED
   COMPLETED
+  CONNECT_CHANNEL
+  UPLOAD_MEDIA
 }
 enum InviteStatus {
   ACCEPTED
```


