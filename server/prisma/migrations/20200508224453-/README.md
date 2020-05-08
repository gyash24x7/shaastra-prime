# Migration `20200508224453-`

This migration has been generated at 5/8/2020, 10:44:53 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."_TaskUpdateChannels" (
"A" text  NOT NULL ,"B" text  NOT NULL )

ALTER TABLE "public"."Task" ALTER COLUMN "status" SET DEFAULT 'NOT_ASSIGNED';

ALTER TABLE "public"."TeamInvitation" ALTER COLUMN "status" SET DEFAULT 'NO_RESPONSE';

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'COORD';

CREATE UNIQUE INDEX "_TaskUpdateChannels_AB_unique" ON "public"."_TaskUpdateChannels"("A","B")

CREATE  INDEX "_TaskUpdateChannels_B_index" ON "public"."_TaskUpdateChannels"("B")

ALTER TABLE "public"."_TaskUpdateChannels" ADD FOREIGN KEY ("A")REFERENCES "public"."Channel"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_TaskUpdateChannels" ADD FOREIGN KEY ("B")REFERENCES "public"."Task"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200507130830..20200508224453-
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
@@ -62,8 +62,9 @@
   members     User[]      @relation("ChannelMembers", references: [id])
   createdById String
   // Fields to be fetched separately if needed: Omit in API
   messages    Message[]   @relation("ChannelMessages")
+  tasks       Task[]      @relation("TaskUpdateChannels", references: [id])
 }
 model Message {
   id          String      @default(cuid()) @id
@@ -111,8 +112,9 @@
   byDeptId    String
   forDeptId   String
   createdById String
   activity    TaskActivity[] @relation("TaskActivity")
+  channels    Channel[]      @relation("TaskUpdateChannels", references: [id])
 }
 model TaskActivity {
   id          String           @default(cuid()) @id
```


