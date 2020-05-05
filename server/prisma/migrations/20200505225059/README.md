# Migration `20200505225059`

This migration has been generated at 5/5/2020, 10:50:59 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Message" ADD COLUMN "channelId" text  NOT NULL ;

ALTER TABLE "public"."Task" ALTER COLUMN "status" SET DEFAULT 'NOT_ASSIGNED';

ALTER TABLE "public"."TeamInvitation" ALTER COLUMN "status" SET DEFAULT 'NO_RESPONSE';

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'COORD';

ALTER TABLE "public"."Goal" DROP CONSTRAINT IF EXiSTS "Goal_deptId_fkey";

ALTER TABLE "public"."Milestone" DROP CONSTRAINT IF EXiSTS "Milestone_goalId_fkey";

ALTER TABLE "public"."_ChannelMessages" DROP CONSTRAINT IF EXiSTS "_ChannelMessages_A_fkey";

ALTER TABLE "public"."_ChannelMessages" DROP CONSTRAINT IF EXiSTS "_ChannelMessages_B_fkey";

ALTER TABLE "public"."_TaskUpdateChannels" DROP CONSTRAINT IF EXiSTS "_TaskUpdateChannels_A_fkey";

ALTER TABLE "public"."_TaskUpdateChannels" DROP CONSTRAINT IF EXiSTS "_TaskUpdateChannels_B_fkey";

ALTER TABLE "public"."Message" ADD FOREIGN KEY ("channelId")REFERENCES "public"."Channel"("id") ON DELETE CASCADE  ON UPDATE CASCADE

DROP TABLE "public"."Goal";

DROP TABLE "public"."Milestone";

DROP TABLE "public"."_ChannelMessages";

DROP TABLE "public"."_TaskUpdateChannels";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200505212818..20200505225059
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
@@ -16,9 +16,8 @@
   tasksAssigned     Task[]    @relation("TasksForDept")
   tasksCreated      Task[]    @relation("TasksByDept")
   updates           Update[]  @relation("DeptUpdates")
   invoicesSubmitted Invoice[] @relation("InvoicesByDept")
-  goals             Goal[]    @relation("DeptGoals")
 }
 model User {
   id                String     @default(cuid()) @id
@@ -60,11 +59,10 @@
   archived    Boolean     @default(false)
   createdBy   User        @relation("ChannelsByUser", fields: [createdById], references: [id])
   members     User[]      @relation("ChannelMembers", references: [id])
   createdById String
-  tasks       Task[]      @relation("TaskUpdateChannels", references: [id])
   // Fields to be fetched separately if needed: Omit in API
-  messages    Message[]   @relation("ChannelMessages", references: [id])
+  messages    Message[]   @relation("ChannelMessages")
 }
 model Message {
   id          String      @default(cuid()) @id
@@ -75,10 +73,11 @@
   likedBy     User[]      @relation("LikesByUser", references: [id])
   createdById String
   type        MessageType
   media       Media[]     @relation("MessageMedia")
-  // Not useful for a particular message
-  channels    Channel[]   @relation("ChannelMessages", references: [id])
+  // Omit in API
+  channel     Channel     @relation("ChannelMessages", fields: [channelId], references: [id])
+  channelId   String
 }
 model Media {
   id           String    @default(cuid()) @id
@@ -106,9 +105,8 @@
   assignedTo   User[]         @relation("TasksForUser", references: [id])
   status       TaskStatus     @default(NOT_ASSIGNED)
   createdAt    DateTime       @default(now())
   deadline     DateTime
-  channels     Channel[]      @relation("TaskUpdateChannels", references: [id])
   media        Media[]        @relation("TaskMedia")
   byDeptId     String
   forDeptId    String
   createdById  String
@@ -135,26 +133,8 @@
   postedById String
   byDeptId   String
 }
-model Goal {
-  id         String      @default(cuid()) @id
-  title      String
-  dept       Department  @relation("DeptGoals", fields: [deptId], references: [id])
-  deptId     String
-  type       GoalType
-  createdAt  DateTime    @default(now())
-  milestones Milestone[] @relation("GoalMilestones")
-}
-
-model Milestone {
-  id     String          @default(cuid()) @id
-  title  String
-  status MilestoneStatus @default(IN_PROGRESS)
-  goal   Goal            @relation("GoalMilestones", fields: [goalId], references: [id])
-  goalId String
-}
-
 // Kaousheik & Vatsal Start from here
 model Invoice {
   id            String            @default(cuid()) @id
   title         String
```


