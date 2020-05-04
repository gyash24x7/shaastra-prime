# Migration `20200504132218-refined-fields`

This migration has been generated at 5/4/2020, 1:22:18 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TYPE "MessageType" ADD VALUE 'TASK_ACTIVITY';
ALTER TYPE "MessageType" ADD VALUE 'INVOICE_ACTIVITY'

CREATE TABLE "public"."_TaskUpdateChannels" (
    "A" text  NOT NULL ,
    "B" text  NOT NULL 
) 

ALTER TABLE "public"."Milestone" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS';

ALTER TABLE "public"."Participant" ALTER COLUMN "shaastrID" SET DATA TYPE text ;

ALTER TABLE "public"."SubTask" ALTER COLUMN "status" SET DEFAULT 'NOT_STARTED';

ALTER TABLE "public"."Task" DROP CONSTRAINT IF EXiSTS "Task_channelId_fkey",
ALTER COLUMN "status" SET DEFAULT 'NOT_ASSIGNED';

ALTER TABLE "public"."TaskActivity" DROP CONSTRAINT IF EXiSTS "TaskActivity_channelId_fkey",
DROP COLUMN "channelId",
DROP COLUMN "createdAt",
ADD COLUMN "on" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP;

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
migration 20200504112616-task-activity..20200504132218-refined-fields
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
@@ -44,13 +44,13 @@
   verificationOTP   String
   passwordOTP       String?
   department        Department @relation("DepartmentMembers", fields: [departmentId], references: [id])
   departmentId      String
+  // Fields to be fetched separately if needed: Omit in API
   channels          Channel[]  @relation("ChannelMembers", references: [id])
   media             Media[]    @relation("MediaByUser")
   tasksAssigned     Task[]     @relation("TasksForUser", references: [id])
   invoicesSubmitted Invoice[]  @relation("InvoicesByUser")
-  // Not very useful fields omit in API
   teams             Team[]     @relation("TeamMembers", references: [id])
   messages          Message[]  @relation("MessagesByUser")
   channelsCreated   Channel[]  @relation("ChannelsByUser")
   tasksCreated      Task[]     @relation("TasksByUser")
@@ -60,20 +60,20 @@
   Event             Event[]    @relation("EventUpdatedBy")
 }
 model Channel {
-  id           String         @default(cuid()) @id
-  name         String
-  description  String
-  type         ChannelType
-  createdAt    DateTime       @default(now())
-  archived     Boolean        @default(false)
-  messages     Message[]      @relation("ChannelMessages")
-  createdBy    User           @relation("ChannelsByUser", fields: [createdById], references: [id])
-  members      User[]         @relation("ChannelMembers", references: [id])
-  createdById  String
-  tasks        Task[]         @relation("ChannelTask")
-  taskActivity TaskActivity[] @relation("TaskActivityChannel")
+  id          String      @default(cuid()) @id
+  name        String
+  description String
+  type        ChannelType
+  createdAt   DateTime    @default(now())
+  archived    Boolean     @default(false)
+  createdBy   User        @relation("ChannelsByUser", fields: [createdById], references: [id])
+  members     User[]      @relation("ChannelMembers", references: [id])
+  createdById String
+  tasks       Task[]      @relation("TaskUpdateChannels", references: [id])
+  // Fields to be fetched separately if needed: Omit in API
+  messages    Message[]   @relation("ChannelMessages")
 }
 model Message {
   id          String      @default(cuid()) @id
@@ -94,9 +94,9 @@
   url          String
   type         MediaType
   uploadedBy   User      @relation("MediaByUser", fields: [uploadedById], references: [id])
   uploadedById String
-  // fields not very useful
+  // Fields to be fetched separately if needed: Omit in API
   invoice      Invoice?  @relation("InvoiceMedia")
   vertical     Vertical? @relation("VerticalImage")
   task         Task?     @relation("TaskMedia", fields: [taskId], references: [id])
   taskId       String?
@@ -124,9 +124,9 @@
   assignedTo   User[]         @relation("TasksForUser", references: [id])
   status       TaskStatus     @default(NOT_ASSIGNED)
   createdAt    DateTime       @default(now())
   deadline     DateTime
-  channel      Channel?       @relation("ChannelTask", fields: [channelId], references: [id])
+  channels     Channel[]      @relation("TaskUpdateChannels", references: [id])
   media        Media[]        @relation("TaskMedia")
   subTasks     SubTask[]      @relation("SubTasksForTask")
   byDeptId     String
   forDeptId    String
@@ -135,15 +135,13 @@
   taskActivity TaskActivity[] @relation("TaskActivity")
 }
 model TaskActivity {
-  id        String           @default(cuid()) @id
-  task      Task             @relation("TaskActivity", fields: [taskId], references: [id])
-  taskId    String
-  channel   Channel?         @relation("TaskActivityChannel", fields: [channelId], references: [id])
-  channelId String?
-  type      TaskActivityType
-  createdAt DateTime         @default(now())
+  id     String           @default(cuid()) @id
+  task   Task             @relation("TaskActivity", fields: [taskId], references: [id])
+  taskId String
+  type   TaskActivityType
+  on     DateTime         @default(now())
 }
 model SubTask {
   id     String        @default(cuid()) @id
@@ -308,8 +306,10 @@
 enum MessageType {
   SYSTEM
   TEXT
   MEDIA
+  TASK_ACTIVITY
+  INVOICE_ACTIVITY
 }
 enum RegistrationType {
   INDIVIDUAL
```


