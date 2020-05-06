# Migration `20200506115943`

This migration has been generated at 5/6/2020, 11:59:43 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "MediaType_new" AS ENUM ('IMAGE', 'AUDIO', 'VIDEO', 'DOC');
ALTER TABLE "public"."Media" ALTER COLUMN "type" DROP DEFAULT,
                        ALTER COLUMN "type" TYPE "MediaType_new" USING ("type"::text::"MediaType_new"),
                        ALTER COLUMN "type" SET DEFAULT 'IMAGE';
ALTER TYPE "MediaType" RENAME TO "MediaType_old";
ALTER TYPE "MediaType_new" RENAME TO "MediaType";
DROP TYPE "MediaType_old"

ALTER TABLE "public"."Task" ALTER COLUMN "status" SET DEFAULT 'NOT_ASSIGNED';

ALTER TABLE "public"."TeamInvitation" ALTER COLUMN "status" SET DEFAULT 'NO_RESPONSE';

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'COORD';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200505225435..20200506115943
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
@@ -347,9 +347,8 @@
   IMAGE
   AUDIO
   VIDEO
   DOC
-  CODE
 }
 enum UserRole {
   COORD
```


