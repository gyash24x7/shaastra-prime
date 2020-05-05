# Migration `20200505134249-simplified-datamodel`

This migration has been generated at 5/5/2020, 1:42:49 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "MessageType_new" AS ENUM ('SYSTEM', 'TEXT', 'MEDIA');
ALTER TABLE "public"."Message" ALTER COLUMN "type" DROP DEFAULT,
                        ALTER COLUMN "type" TYPE "MessageType_new" USING ("type"::text::"MessageType_new"),
                        ALTER COLUMN "type" SET DEFAULT 'SYSTEM';
ALTER TYPE "MessageType" RENAME TO "MessageType_old";
ALTER TYPE "MessageType_new" RENAME TO "MessageType";
DROP TYPE "MessageType_old"

CREATE TABLE "public"."_LikesByUser" (
    "A" text  NOT NULL ,
    "B" text  NOT NULL 
) 

CREATE TABLE "public"."_ChannelMessages" (
    "A" text  NOT NULL ,
    "B" text  NOT NULL 
) 

ALTER TABLE "public"."Message" DROP CONSTRAINT IF EXiSTS "Message_channelId_fkey",
DROP COLUMN "channelId";

ALTER TABLE "public"."Milestone" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS';

ALTER TABLE "public"."Task" ALTER COLUMN "status" SET DEFAULT 'NOT_ASSIGNED';

ALTER TABLE "public"."TeamInvitation" ALTER COLUMN "status" SET DEFAULT 'NO_RESPONSE';

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'COORD';

ALTER TABLE "public"."Reaction" DROP CONSTRAINT IF EXiSTS "Reaction_byId_fkey";

ALTER TABLE "public"."Reaction" DROP CONSTRAINT IF EXiSTS "Reaction_messageId_fkey";

ALTER TABLE "public"."SubTask" DROP CONSTRAINT IF EXiSTS "SubTask_taskId_fkey";

CREATE UNIQUE INDEX "_LikesByUser_AB_unique" ON "public"."_LikesByUser"("A","B")

CREATE  INDEX "_LikesByUser_B_index" ON "public"."_LikesByUser"("B")

CREATE UNIQUE INDEX "_ChannelMessages_AB_unique" ON "public"."_ChannelMessages"("A","B")

CREATE  INDEX "_ChannelMessages_B_index" ON "public"."_ChannelMessages"("B")

ALTER TABLE "public"."_LikesByUser" ADD FOREIGN KEY ("A")REFERENCES "public"."Message"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_LikesByUser" ADD FOREIGN KEY ("B")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_ChannelMessages" ADD FOREIGN KEY ("A")REFERENCES "public"."Channel"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_ChannelMessages" ADD FOREIGN KEY ("B")REFERENCES "public"."Message"("id") ON DELETE CASCADE  ON UPDATE CASCADE

DROP TABLE "public"."Reaction";

DROP TABLE "public"."SubTask";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200505093101-unique-channel-name..20200505134249-simplified-datamodel
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
@@ -53,9 +53,9 @@
   subDepartments    SubDepartment[] @relation("SubDeptMembers", references: [id])
   messages          Message[]       @relation("MessagesByUser")
   channelsCreated   Channel[]       @relation("ChannelsByUser")
   tasksCreated      Task[]          @relation("TasksByUser")
-  Reaction          Reaction[]      @relation("UserReactions")
+  likedMessages     Message[]       @relation("LikesByUser", references: [id])
   Update            Update[]        @relation("UserUpdate")
   Vertical          Vertical[]      @relation("VerticalUpdatedBy")
   Event             Event[]         @relation("EventUpdatedBy")
 }
@@ -71,23 +71,23 @@
   members     User[]      @relation("ChannelMembers", references: [id])
   createdById String
   tasks       Task[]      @relation("TaskUpdateChannels", references: [id])
   // Fields to be fetched separately if needed: Omit in API
-  messages    Message[]   @relation("ChannelMessages")
+  messages    Message[]   @relation("ChannelMessages", references: [id])
 }
 model Message {
   id          String      @default(cuid()) @id
   content     String
   createdAt   DateTime    @default(now())
   createdBy   User        @relation("MessagesByUser", fields: [createdById], references: [id])
-  channel     Channel     @relation("ChannelMessages", fields: [channelId], references: [id])
   starred     Boolean     @default(false)
-  reactions   Reaction[]  @relation("MessageReactions")
+  likedBy     User[]      @relation("LikesByUser", references: [id])
   createdById String
-  channelId   String
   type        MessageType
   media       Media[]     @relation("MessageMedia")
+  // Not useful for a particular message
+  channels    Channel[]   @relation("ChannelMessages", references: [id])
 }
 model Media {
   id           String    @default(cuid()) @id
@@ -104,17 +104,8 @@
   message      Message?  @relation("MessageMedia", fields: [messageId], references: [id])
   messageId    String?
 }
-model Reaction {
-  id        String       @default(cuid()) @id
-  type      ReactionType
-  by        User         @relation("UserReactions", fields: [byId], references: [id])
-  message   Message      @relation("MessageReactions", fields: [messageId], references: [id])
-  byId      String
-  messageId String
-}
-
 model Task {
   id           String         @default(cuid()) @id
   brief        String
   details      String
@@ -126,9 +117,8 @@
   createdAt    DateTime       @default(now())
   deadline     DateTime
   channels     Channel[]      @relation("TaskUpdateChannels", references: [id])
   media        Media[]        @relation("TaskMedia")
-  subTasks     SubTask[]      @relation("SubTasksForTask")
   byDeptId     String
   forDeptId    String
   createdById  String
   channelId    String?
@@ -142,16 +132,8 @@
   type   TaskActivityType
   on     DateTime         @default(now())
 }
-model SubTask {
-  id     String        @default(cuid()) @id
-  title  String
-  status SubTaskStatus @default(NOT_STARTED)
-  task   Task          @relation("SubTasksForTask", fields: [taskId], references: [id])
-  taskId String
-}
-
 model Update {
   id         String     @default(cuid()) @id
   brief      String
   subject    String
@@ -306,10 +288,8 @@
 enum MessageType {
   SYSTEM
   TEXT
   MEDIA
-  TASK_ACTIVITY
-  INVOICE_ACTIVITY
 }
 enum RegistrationType {
   INDIVIDUAL
```


