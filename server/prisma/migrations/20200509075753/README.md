# Migration `20200509075753`

This migration has been generated at 5/9/2020, 7:57:53 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TYPE "MessageType" ADD VALUE 'TASK_UPDATE'

ALTER TABLE "public"."Task" ALTER COLUMN "status" SET DEFAULT 'NOT_ASSIGNED';

ALTER TABLE "public"."TeamInvitation" ALTER COLUMN "status" SET DEFAULT 'NO_RESPONSE';

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'COORD';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200508224453-..20200509075753
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
@@ -264,8 +264,9 @@
 enum MessageType {
   SYSTEM
   TEXT
   MEDIA
+  TASK_UPDATE
 }
 enum RegistrationType {
   INDIVIDUAL
```


