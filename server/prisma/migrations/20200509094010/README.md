# Migration `20200509094010`

This migration has been generated at 5/9/2020, 9:40:10 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "TaskActivityType_new" AS ENUM ('CREATED', 'ASSIGNED', 'IN_PROGRESS', 'SUBMITTED', 'COMPLETED', 'CONNECT_CHANNEL', 'ATTACH_MEDIA');
ALTER TABLE "public"."TaskActivity" ALTER COLUMN "type" DROP DEFAULT,
                        ALTER COLUMN "type" TYPE "TaskActivityType_new" USING ("type"::text::"TaskActivityType_new"),
                        ALTER COLUMN "type" SET DEFAULT 'CREATED';
ALTER TYPE "TaskActivityType" RENAME TO "TaskActivityType_old";
ALTER TYPE "TaskActivityType_new" RENAME TO "TaskActivityType";
DROP TYPE "TaskActivityType_old"

ALTER TABLE "public"."Task" ALTER COLUMN "status" SET DEFAULT 'NOT_ASSIGNED';

ALTER TABLE "public"."TeamInvitation" ALTER COLUMN "status" SET DEFAULT 'NO_RESPONSE';

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'COORD';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200509092400..20200509094010
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
@@ -285,9 +285,9 @@
   IN_PROGRESS
   SUBMITTED
   COMPLETED
   CONNECT_CHANNEL
-  UPLOAD_MEDIA
+  ATTACH_MEDIA
 }
 enum InviteStatus {
   ACCEPTED
```


