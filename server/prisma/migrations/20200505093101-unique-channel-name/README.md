# Migration `20200505093101-unique-channel-name`

This migration has been generated at 5/5/2020, 9:31:01 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Milestone" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS';

ALTER TABLE "public"."SubTask" ALTER COLUMN "status" SET DEFAULT 'NOT_STARTED';

ALTER TABLE "public"."Task" ALTER COLUMN "status" SET DEFAULT 'NOT_ASSIGNED';

ALTER TABLE "public"."TeamInvitation" ALTER COLUMN "status" SET DEFAULT 'NO_RESPONSE';

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'COORD';

CREATE UNIQUE INDEX "Channel.name" ON "public"."Channel"("name")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200505070939-team-to-subdepartment..20200505093101-unique-channel-name
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
@@ -61,9 +61,9 @@
 }
 model Channel {
   id          String      @default(cuid()) @id
-  name        String
+  name        String      @unique
   description String
   type        ChannelType
   createdAt   DateTime    @default(now())
   archived    Boolean     @default(false)
```


