# Migration `20200509092400`

This migration has been generated at 5/9/2020, 9:24:00 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Task" ALTER COLUMN "status" SET DEFAULT 'NOT_ASSIGNED';

ALTER TABLE "public"."TeamInvitation" ALTER COLUMN "status" SET DEFAULT 'NO_RESPONSE';

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'COORD';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200509091828..20200509092400
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
@@ -51,20 +51,20 @@
   TaskActivity      TaskActivity[] @relation("TaskActivityByUser")
 }
 model Channel {
-  id          String      @default(cuid()) @id
-  name        String      @unique
-  description String
-  type        ChannelType
-  createdAt   DateTime    @default(now())
-  archived    Boolean     @default(false)
-  createdBy   User        @relation("ChannelsByUser", fields: [createdById], references: [id])
-  members     User[]      @relation("ChannelMembers", references: [id])
-  createdById String
+  id             String      @default(cuid()) @id
+  name           String      @unique
+  description    String
+  type           ChannelType
+  createdAt      DateTime    @default(now())
+  archived       Boolean     @default(false)
+  createdBy      User        @relation("ChannelsByUser", fields: [createdById], references: [id])
+  members        User[]      @relation("ChannelMembers", references: [id])
+  createdById    String
   // Fields to be fetched separately if needed: Omit in API
-  messages    Message[]   @relation("ChannelMessages")
-  tasks       Task[]      @relation("TaskUpdateChannels", references: [id])
+  messages       Message[]   @relation("ChannelMessages")
+  connectedTasks Task[]      @relation("TaskUpdateChannels", references: [id])
 }
 model Message {
   id          String      @default(cuid()) @id
```


