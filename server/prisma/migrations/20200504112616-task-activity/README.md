# Migration `20200504112616-task-activity`

This migration has been generated at 5/4/2020, 11:26:16 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "MessageType" AS ENUM ('SYSTEM', 'TEXT', 'MEDIA');

CREATE TYPE "RegistrationType" AS ENUM ('INDIVIDUAL', 'TEAM', 'BOTH');

CREATE TYPE "ChannelType" AS ENUM ('GROUP', 'DIRECT');

CREATE TYPE "TaskActivityType" AS ENUM ('CREATED', 'ASSIGNED', 'IN_PROGRESS', 'SUBMITTED', 'COMPLETED');

CREATE TYPE "InviteStatus" AS ENUM ('ACCEPTED', 'REJECTED', 'NO_RESPONSE');

DROP INDEX "public"."Task_channelId"

CREATE TABLE "public"."TaskActivity" (
    "channelId" text   ,
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" text  NOT NULL ,
    "taskId" text  NOT NULL ,
    "type" "TaskActivityType" NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Vertical" (
    "id" text  NOT NULL ,
    "imageId" text  NOT NULL ,
    "info" text  NOT NULL ,
    "name" text  NOT NULL ,
    "rank" SERIAL,
    "updatedById" text  NOT NULL ,
    "updatedOn" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Event" (
    "approved" boolean  NOT NULL DEFAULT false,
    "id" text  NOT NULL ,
    "imageId" text  NOT NULL ,
    "info" text  NOT NULL ,
    "name" text  NOT NULL ,
    "paid" boolean  NOT NULL DEFAULT false,
    "rank" SERIAL,
    "registrationType" "RegistrationType" NOT NULL ,
    "updatedById" text  NOT NULL ,
    "verticalId" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."EventTab" (
    "content" text  NOT NULL ,
    "eventId" text  NOT NULL ,
    "id" text  NOT NULL ,
    "title" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Participant" (
    "city" text  NOT NULL ,
    "college" text  NOT NULL ,
    "email" text  NOT NULL ,
    "gender" text  NOT NULL ,
    "id" text  NOT NULL ,
    "mobile" text  NOT NULL ,
    "name" text  NOT NULL ,
    "password" text  NOT NULL ,
    "shaastrID" SERIAL,
    "shaastraQR" text  NOT NULL ,
    "state" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."TeamInvitation" (
    "id" text  NOT NULL ,
    "pId" text  NOT NULL ,
    "pTeamId" text  NOT NULL ,
    "status" "InviteStatus" NOT NULL DEFAULT 'NO_RESPONSE',
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."PTeam" (
    "id" text  NOT NULL ,
    "name" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Registration" (
    "eventId" text  NOT NULL ,
    "id" text  NOT NULL ,
    "pId" text   ,
    "pTeamId" text   ,
    "type" "RegistrationType" NOT NULL ,
    PRIMARY KEY ("id")
) 

ALTER TABLE "public"."Channel" DROP COLUMN "taskId",
ADD COLUMN "type" "ChannelType" NOT NULL ;

ALTER TABLE "public"."Media" DROP CONSTRAINT IF EXiSTS "Media_channelId_fkey",
DROP COLUMN "channelId",
ADD COLUMN "messageId" text   ;

ALTER TABLE "public"."Message" ADD COLUMN "type" "MessageType" NOT NULL ;

ALTER TABLE "public"."Milestone" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS';

ALTER TABLE "public"."SubTask" DROP COLUMN "isTemplate",
ALTER COLUMN "status" SET DEFAULT 'NOT_STARTED';

ALTER TABLE "public"."Task" DROP CONSTRAINT IF EXiSTS "Task_channelId_fkey",
ALTER COLUMN "channelId" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'NOT_ASSIGNED';

ALTER TABLE "public"."Update" ADD COLUMN "brief" text  NOT NULL ;

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'COORD';

CREATE UNIQUE INDEX "Vertical_imageId" ON "public"."Vertical"("imageId")

CREATE UNIQUE INDEX "Event_imageId" ON "public"."Event"("imageId")

CREATE UNIQUE INDEX "Participant.shaastrID" ON "public"."Participant"("shaastrID")

CREATE UNIQUE INDEX "Participant.email" ON "public"."Participant"("email")

CREATE UNIQUE INDEX "Invoice_mediaId" ON "public"."Invoice"("mediaId")

ALTER TABLE "public"."TaskActivity" ADD FOREIGN KEY ("taskId")REFERENCES "public"."Task"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."TaskActivity" ADD FOREIGN KEY ("channelId")REFERENCES "public"."Channel"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Vertical" ADD FOREIGN KEY ("imageId")REFERENCES "public"."Media"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Vertical" ADD FOREIGN KEY ("updatedById")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Event" ADD FOREIGN KEY ("verticalId")REFERENCES "public"."Vertical"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Event" ADD FOREIGN KEY ("updatedById")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Event" ADD FOREIGN KEY ("imageId")REFERENCES "public"."Media"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."EventTab" ADD FOREIGN KEY ("eventId")REFERENCES "public"."Event"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."TeamInvitation" ADD FOREIGN KEY ("pTeamId")REFERENCES "public"."PTeam"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."TeamInvitation" ADD FOREIGN KEY ("pId")REFERENCES "public"."Participant"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Registration" ADD FOREIGN KEY ("pTeamId")REFERENCES "public"."PTeam"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Registration" ADD FOREIGN KEY ("pId")REFERENCES "public"."Participant"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Registration" ADD FOREIGN KEY ("eventId")REFERENCES "public"."Event"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Media" ADD FOREIGN KEY ("messageId")REFERENCES "public"."Message"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Task" ADD FOREIGN KEY ("channelId")REFERENCES "public"."Channel"("id") ON DELETE SET NULL  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200425125014-sprint_to_subtask..20200504112616-task-activity
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
@@ -16,8 +16,9 @@
   tasksAssigned     Task[]    @relation("TasksForDept")
   tasksCreated      Task[]    @relation("TasksByDept")
   updates           Update[]  @relation("DeptUpdates")
   invoicesSubmitted Invoice[] @relation("InvoicesByDept")
+  goals             Goal[]    @relation("DeptGoals")
 }
 model Team {
   id         String     @default(cuid()) @id
@@ -44,54 +45,65 @@
   passwordOTP       String?
   department        Department @relation("DepartmentMembers", fields: [departmentId], references: [id])
   departmentId      String
   channels          Channel[]  @relation("ChannelMembers", references: [id])
-  channelsCreated   Channel[]  @relation("ChannelsByUser")
-  messages          Message[]  @relation("MessagesByUser")
   media             Media[]    @relation("MediaByUser")
-  tasksCreated      Task[]     @relation("TasksByUser")
   tasksAssigned     Task[]     @relation("TasksForUser", references: [id])
+  invoicesSubmitted Invoice[]  @relation("InvoicesByUser")
+  // Not very useful fields omit in API
   teams             Team[]     @relation("TeamMembers", references: [id])
-  invoicesSubmitted Invoice[]  @relation("InvoicesByUser")
+  messages          Message[]  @relation("MessagesByUser")
+  channelsCreated   Channel[]  @relation("ChannelsByUser")
+  tasksCreated      Task[]     @relation("TasksByUser")
+  Reaction          Reaction[] @relation("UserReactions")
+  Update            Update[]   @relation("UserUpdate")
+  Vertical          Vertical[] @relation("VerticalUpdatedBy")
+  Event             Event[]    @relation("EventUpdatedBy")
 }
 model Channel {
-  id          String    @default(cuid()) @id
-  name        String
-  description String
-  createdAt   DateTime  @default(now())
-  archived    Boolean   @default(false)
-  messages    Message[] @relation("ChannelMessages")
-  createdBy   User      @relation("ChannelsByUser", fields: [createdById], references: [id])
-  members     User[]    @relation("ChannelMembers", references: [id])
-  media       Media[]   @relation("ChannelMedia")
-  task        Task?     @relation("ChannelTask")
-  createdById String
-  taskId      String?
+  id           String         @default(cuid()) @id
+  name         String
+  description  String
+  type         ChannelType
+  createdAt    DateTime       @default(now())
+  archived     Boolean        @default(false)
+  messages     Message[]      @relation("ChannelMessages")
+  createdBy    User           @relation("ChannelsByUser", fields: [createdById], references: [id])
+  members      User[]         @relation("ChannelMembers", references: [id])
+  createdById  String
+  tasks        Task[]         @relation("ChannelTask")
+  taskActivity TaskActivity[] @relation("TaskActivityChannel")
 }
 model Message {
-  id          String     @default(cuid()) @id
+  id          String      @default(cuid()) @id
   content     String
-  createdAt   DateTime   @default(now())
-  createdBy   User       @relation("MessagesByUser", fields: [createdById], references: [id])
-  channel     Channel    @relation("ChannelMessages", fields: [channelId], references: [id])
-  starred     Boolean    @default(false)
-  reactions   Reaction[] @relation("MessageReactions")
+  createdAt   DateTime    @default(now())
+  createdBy   User        @relation("MessagesByUser", fields: [createdById], references: [id])
+  channel     Channel     @relation("ChannelMessages", fields: [channelId], references: [id])
+  starred     Boolean     @default(false)
+  reactions   Reaction[]  @relation("MessageReactions")
   createdById String
   channelId   String
+  type        MessageType
+  media       Media[]     @relation("MessageMedia")
 }
 model Media {
   id           String    @default(cuid()) @id
   url          String
   type         MediaType
   uploadedBy   User      @relation("MediaByUser", fields: [uploadedById], references: [id])
+  uploadedById String
+  // fields not very useful
+  invoice      Invoice?  @relation("InvoiceMedia")
+  vertical     Vertical? @relation("VerticalImage")
   task         Task?     @relation("TaskMedia", fields: [taskId], references: [id])
   taskId       String?
-  channel      Channel?  @relation("ChannelMedia", fields: [channelId], references: [id])
-  uploadedById String
-  channelId    String?
+  event        Event?    @relation("EventImage")
+  message      Message?  @relation("MessageMedia", fields: [messageId], references: [id])
+  messageId    String?
 }
 model Reaction {
   id        String       @default(cuid()) @id
@@ -102,38 +114,49 @@
   messageId String
 }
 model Task {
-  id          String     @default(cuid()) @id
-  brief       String
-  details     String
-  byDept      Department @relation("TasksByDept", fields: [byDeptId], references: [id])
-  forDept     Department @relation("TasksForDept", fields: [forDeptId], references: [id])
-  createdBy   User       @relation("TasksByUser", fields: [createdById], references: [id])
-  assignedTo  User[]     @relation("TasksForUser", references: [id])
-  status      TaskStatus @default(NOT_ASSIGNED)
-  createdAt   DateTime   @default(now())
-  deadline    DateTime
-  channel     Channel    @relation("ChannelTask", fields: [channelId], references: [id])
-  media       Media[]    @relation("TaskMedia")
-  subTasks    SubTask[]  @relation("SubTasksForTask")
-  byDeptId    String
-  forDeptId   String
-  createdById String
-  channelId   String
+  id           String         @default(cuid()) @id
+  brief        String
+  details      String
+  byDept       Department     @relation("TasksByDept", fields: [byDeptId], references: [id])
+  forDept      Department     @relation("TasksForDept", fields: [forDeptId], references: [id])
+  createdBy    User           @relation("TasksByUser", fields: [createdById], references: [id])
+  assignedTo   User[]         @relation("TasksForUser", references: [id])
+  status       TaskStatus     @default(NOT_ASSIGNED)
+  createdAt    DateTime       @default(now())
+  deadline     DateTime
+  channel      Channel?       @relation("ChannelTask", fields: [channelId], references: [id])
+  media        Media[]        @relation("TaskMedia")
+  subTasks     SubTask[]      @relation("SubTasksForTask")
+  byDeptId     String
+  forDeptId    String
+  createdById  String
+  channelId    String?
+  taskActivity TaskActivity[] @relation("TaskActivity")
 }
+model TaskActivity {
+  id        String           @default(cuid()) @id
+  task      Task             @relation("TaskActivity", fields: [taskId], references: [id])
+  taskId    String
+  channel   Channel?         @relation("TaskActivityChannel", fields: [channelId], references: [id])
+  channelId String?
+  type      TaskActivityType
+  createdAt DateTime         @default(now())
+}
+
 model SubTask {
-  id         String        @default(cuid()) @id
-  title      String
-  status     SubTaskStatus @default(NOT_STARTED)
-  task       Task          @relation("SubTasksForTask", fields: [taskId], references: [id])
-  taskId     String
-  isTemplate Boolean       @default(false)
+  id     String        @default(cuid()) @id
+  title  String
+  status SubTaskStatus @default(NOT_STARTED)
+  task   Task          @relation("SubTasksForTask", fields: [taskId], references: [id])
+  taskId String
 }
 model Update {
   id         String     @default(cuid()) @id
+  brief      String
   subject    String
   content    String
   byDept     Department @relation("DeptUpdates", fields: [byDeptId], references: [id])
   postedBy   User       @relation("UserUpdate", fields: [postedById], references: [id])
@@ -141,8 +164,27 @@
   postedById String
   byDeptId   String
 }
+model Goal {
+  id         String      @default(cuid()) @id
+  title      String
+  dept       Department  @relation("DeptGoals", fields: [deptId], references: [id])
+  deptId     String
+  type       GoalType
+  createdAt  DateTime    @default(now())
+  milestones Milestone[] @relation("GoalMilestones")
+}
+
+model Milestone {
+  id     String          @default(cuid()) @id
+  title  String
+  status MilestoneStatus @default(IN_PROGRESS)
+  goal   Goal            @relation("GoalMilestones", fields: [goalId], references: [id])
+  goalId String
+}
+
+// Kaousheik & Vatsal Start from here
 model Invoice {
   id            String            @default(cuid()) @id
   title         String
   date          DateTime
@@ -180,26 +222,121 @@
   bankDetails   String
   invoices      Invoice[] @relation("VendorInvoices")
 }
-model Goal {
-  id         String      @default(cuid()) @id
-  title      String
-  dept       Department  @relation("DeptGoals", fields: [deptId], references: [id])
-  deptId     String
-  type       GoalType
-  createdAt  DateTime    @default(now())
-  milestones Milestone[] @relation("GoalMilestones")
+model Vertical {
+  id          String   @default(cuid()) @id
+  name        String
+  info        String
+  image       Media    @relation("VerticalImage", fields: [imageId], references: [id])
+  imageId     String
+  rank        Int      @default(autoincrement())
+  updatedBy   User     @relation("VerticalUpdatedBy", fields: [updatedById], references: [id])
+  updatedById String
+  updatedOn   DateTime @default(now())
+  events      Event[]  @relation("EventsUnderVertical")
 }
-model Milestone {
-  id     String          @default(cuid()) @id
-  title  String
-  status MilestoneStatus @default(IN_PROGRESS)
-  goal   Goal            @relation("GoalMilestones", fields: [goalId], references: [id])
-  goalId String
+model Event {
+  id               String           @default(cuid()) @id
+  name             String
+  rank             Int              @default(autoincrement())
+  vertical         Vertical         @relation("EventsUnderVertical", fields: [verticalId], references: [id])
+  verticalId       String
+  info             String
+  eventTabs        EventTab[]       @relation("TabsForEvent")
+  updatedBy        User             @relation("EventUpdatedBy", fields: [updatedById], references: [id])
+  updatedById      String
+  image            Media            @relation("EventImage", fields: [imageId], references: [id])
+  imageId          String
+  approved         Boolean          @default(false)
+  paid             Boolean          @default(false)
+  registrationType RegistrationType
+  registrations    Registration[]   @relation("EventRegistration")
 }
+model EventTab {
+  id      String @default(cuid()) @id
+  title   String
+  content String
+  event   Event  @relation("TabsForEvent", fields: [eventId], references: [id])
+  eventId String
+}
+
+model Participant {
+  id            String           @default(cuid()) @id
+  name          String
+  shaastrID     String           @default(autoincrement()) @unique
+  shaastraQR    String
+  email         String           @unique
+  password      String
+  mobile        String
+  gender        String
+  college       String
+  city          String
+  state         String
+  invitations   TeamInvitation[] @relation("InvitationForParticipant")
+  registrations Registration[]   @relation("IndividualRegistration")
+}
+
+model TeamInvitation {
+  id          String       @default(cuid()) @id
+  status      InviteStatus @default(NO_RESPONSE)
+  team        PTeam        @relation("InvitationForTeam", fields: [pTeamId], references: [id])
+  pTeamId     String
+  participant Participant  @relation("InvitationForParticipant", fields: [pId], references: [id])
+  pId         String
+}
+
+model PTeam {
+  id            String           @default(cuid()) @id
+  name          String
+  invitations   TeamInvitation[] @relation("InvitationForTeam")
+  registrations Registration[]   @relation("TeamRegistration")
+}
+
+model Registration {
+  id          String           @default(cuid()) @id
+  type        RegistrationType
+  team        PTeam?           @relation("TeamRegistration", fields: [pTeamId], references: [id])
+  pTeamId     String?
+  participant Participant?     @relation("IndividualRegistration", fields: [pId], references: [id])
+  pId         String?
+  event       Event            @relation("EventRegistration", fields: [eventId], references: [id])
+  eventId     String
+}
+
+enum MessageType {
+  SYSTEM
+  TEXT
+  MEDIA
+}
+
+enum RegistrationType {
+  INDIVIDUAL
+  TEAM
+  BOTH
+}
+
+enum ChannelType {
+  GROUP
+  DIRECT
+}
+
+enum TaskActivityType {
+  CREATED
+  ASSIGNED
+  IN_PROGRESS
+  SUBMITTED
+  COMPLETED
+}
+
+enum InviteStatus {
+  ACCEPTED
+  REJECTED
+  NO_RESPONSE
+}
+
 enum MilestoneStatus {
   IN_PROGRESS
   ACHIEVED
 }
```


