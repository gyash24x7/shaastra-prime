# Migration `20200506220818`

This migration has been generated at 5/6/2020, 10:08:18 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "MessageType" AS ENUM ('SYSTEM', 'TEXT', 'MEDIA');

CREATE TYPE "RegistrationType" AS ENUM ('INDIVIDUAL', 'TEAM', 'BOTH');

CREATE TYPE "ChannelType" AS ENUM ('GROUP', 'DIRECT');

CREATE TYPE "TaskActivityType" AS ENUM ('CREATED', 'ASSIGNED', 'IN_PROGRESS', 'SUBMITTED', 'COMPLETED');

CREATE TYPE "InviteStatus" AS ENUM ('ACCEPTED', 'REJECTED', 'NO_RESPONSE');

CREATE TYPE "MilestoneStatus" AS ENUM ('IN_PROGRESS', 'ACHIEVED');

CREATE TYPE "GoalType" AS ENUM ('WEEKLY', 'BI_WEEKLY', 'MONTHLY', 'END_GOAL');

CREATE TYPE "SubTaskStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

CREATE TYPE "InvoiceActivityType" AS ENUM ('UPLOADED', 'EDITED', 'APPROVED', 'REJECTED');

CREATE TYPE "InvoiceType" AS ENUM ('REIMBURSEMENT', 'SETTLEMENT', 'DIRECT_PAYMENT');

CREATE TYPE "InvoiceStatus" AS ENUM ('COORD', 'HEAD', 'CORE', 'FIN_MANAGER', 'FIN_CORE', 'COCAD');

CREATE TYPE "TaskStatus" AS ENUM ('NOT_ASSIGNED', 'ASSIGNED', 'IN_PROGRESS', 'SUBMITTED', 'COMPLETED');

CREATE TYPE "ReactionType" AS ENUM ('LIKE', 'LOVE', 'HAHA', 'ANGER', 'SAD');

CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'AUDIO', 'VIDEO', 'DOC');

CREATE TYPE "UserRole" AS ENUM ('COORD', 'HEAD', 'CORE', 'COCAS', 'COCAD');

CREATE TABLE "public"."Department" (
    "id" text  NOT NULL ,
    "name" text  NOT NULL ,
    "shortName" text  NOT NULL DEFAULT '',
    "subDepartments" text []  ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."User" (
    "about" text  NOT NULL ,
    "coverPic" text  NOT NULL ,
    "deptId" text  NOT NULL ,
    "email" text  NOT NULL ,
    "id" text  NOT NULL ,
    "mobile" text  NOT NULL ,
    "name" text  NOT NULL ,
    "password" text  NOT NULL ,
    "passwordOTP" text   ,
    "profilePic" text  NOT NULL ,
    "role" "UserRole" NOT NULL DEFAULT 'COORD',
    "rollNumber" text  NOT NULL ,
    "upi" text  NOT NULL ,
    "verificationOTP" text  NOT NULL ,
    "verified" boolean  NOT NULL DEFAULT false,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Channel" (
    "archived" boolean  NOT NULL DEFAULT false,
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" text  NOT NULL ,
    "description" text  NOT NULL ,
    "id" text  NOT NULL ,
    "name" text  NOT NULL ,
    "type" "ChannelType" NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Message" (
    "channelId" text  NOT NULL ,
    "content" text  NOT NULL ,
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" text  NOT NULL ,
    "id" text  NOT NULL ,
    "starred" boolean  NOT NULL DEFAULT false,
    "type" "MessageType" NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Media" (
    "id" text  NOT NULL ,
    "messageId" text   ,
    "taskId" text   ,
    "type" "MediaType" NOT NULL ,
    "uploadedById" text  NOT NULL ,
    "url" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Task" (
    "brief" text  NOT NULL ,
    "byDeptId" text  NOT NULL ,
    "channelId" text   ,
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" text  NOT NULL ,
    "deadline" timestamp(3)  NOT NULL ,
    "details" text  NOT NULL ,
    "forDeptId" text  NOT NULL ,
    "id" text  NOT NULL ,
    "status" "TaskStatus" NOT NULL DEFAULT 'NOT_ASSIGNED',
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."TaskActivity" (
    "id" text  NOT NULL ,
    "on" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taskId" text  NOT NULL ,
    "type" "TaskActivityType" NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Update" (
    "brief" text  NOT NULL ,
    "byDeptId" text  NOT NULL ,
    "content" text  NOT NULL ,
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" text  NOT NULL ,
    "postedById" text  NOT NULL ,
    "subject" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Invoice" (
    "amount" text  NOT NULL ,
    "byDeptId" text  NOT NULL ,
    "date" timestamp(3)  NOT NULL ,
    "id" text  NOT NULL ,
    "invoiceNumber" text  NOT NULL ,
    "mediaId" text  NOT NULL ,
    "purpose" text  NOT NULL ,
    "status" "InvoiceStatus" NOT NULL ,
    "title" text  NOT NULL ,
    "type" "InvoiceType" NOT NULL ,
    "uploadedById" text  NOT NULL ,
    "vendorId" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."InvoiceActivity" (
    "id" text  NOT NULL ,
    "invoiceId" text  NOT NULL ,
    "on" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "InvoiceActivityType" NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Vendor" (
    "accountName" text  NOT NULL ,
    "accountNumber" text  NOT NULL ,
    "bankDetails" text  NOT NULL ,
    "gstNumber" text  NOT NULL ,
    "id" text  NOT NULL ,
    "ifsc" text  NOT NULL ,
    "name" text  NOT NULL ,
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
    "status" "InviteStatus" NOT NULL DEFAULT 'NO_RESPONSE',
    "teamId" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Team" (
    "id" text  NOT NULL ,
    "name" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Registration" (
    "eventId" text  NOT NULL ,
    "id" text  NOT NULL ,
    "pId" text   ,
    "teamId" text   ,
    "type" "RegistrationType" NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."_ChannelMembers" (
    "A" text  NOT NULL ,
    "B" text  NOT NULL 
) 

CREATE TABLE "public"."_TasksForUser" (
    "A" text  NOT NULL ,
    "B" text  NOT NULL 
) 

CREATE TABLE "public"."_LikesByUser" (
    "A" text  NOT NULL ,
    "B" text  NOT NULL 
) 

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

CREATE UNIQUE INDEX "Channel.name" ON "public"."Channel"("name")

CREATE UNIQUE INDEX "Invoice_mediaId" ON "public"."Invoice"("mediaId")

CREATE UNIQUE INDEX "Vertical_imageId" ON "public"."Vertical"("imageId")

CREATE UNIQUE INDEX "Event_imageId" ON "public"."Event"("imageId")

CREATE UNIQUE INDEX "Participant.shaastrID" ON "public"."Participant"("shaastrID")

CREATE UNIQUE INDEX "Participant.email" ON "public"."Participant"("email")

CREATE UNIQUE INDEX "_ChannelMembers_AB_unique" ON "public"."_ChannelMembers"("A","B")

CREATE  INDEX "_ChannelMembers_B_index" ON "public"."_ChannelMembers"("B")

CREATE UNIQUE INDEX "_TasksForUser_AB_unique" ON "public"."_TasksForUser"("A","B")

CREATE  INDEX "_TasksForUser_B_index" ON "public"."_TasksForUser"("B")

CREATE UNIQUE INDEX "_LikesByUser_AB_unique" ON "public"."_LikesByUser"("A","B")

CREATE  INDEX "_LikesByUser_B_index" ON "public"."_LikesByUser"("B")

ALTER TABLE "public"."User" ADD FOREIGN KEY ("deptId")REFERENCES "public"."Department"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Channel" ADD FOREIGN KEY ("createdById")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Message" ADD FOREIGN KEY ("createdById")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Message" ADD FOREIGN KEY ("channelId")REFERENCES "public"."Channel"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Media" ADD FOREIGN KEY ("uploadedById")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Media" ADD FOREIGN KEY ("taskId")REFERENCES "public"."Task"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Media" ADD FOREIGN KEY ("messageId")REFERENCES "public"."Message"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Task" ADD FOREIGN KEY ("byDeptId")REFERENCES "public"."Department"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Task" ADD FOREIGN KEY ("forDeptId")REFERENCES "public"."Department"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Task" ADD FOREIGN KEY ("createdById")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."TaskActivity" ADD FOREIGN KEY ("taskId")REFERENCES "public"."Task"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Update" ADD FOREIGN KEY ("byDeptId")REFERENCES "public"."Department"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Update" ADD FOREIGN KEY ("postedById")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Invoice" ADD FOREIGN KEY ("vendorId")REFERENCES "public"."Vendor"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Invoice" ADD FOREIGN KEY ("mediaId")REFERENCES "public"."Media"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Invoice" ADD FOREIGN KEY ("uploadedById")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Invoice" ADD FOREIGN KEY ("byDeptId")REFERENCES "public"."Department"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."InvoiceActivity" ADD FOREIGN KEY ("invoiceId")REFERENCES "public"."Invoice"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Vertical" ADD FOREIGN KEY ("imageId")REFERENCES "public"."Media"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Vertical" ADD FOREIGN KEY ("updatedById")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Event" ADD FOREIGN KEY ("verticalId")REFERENCES "public"."Vertical"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Event" ADD FOREIGN KEY ("updatedById")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Event" ADD FOREIGN KEY ("imageId")REFERENCES "public"."Media"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."EventTab" ADD FOREIGN KEY ("eventId")REFERENCES "public"."Event"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."TeamInvitation" ADD FOREIGN KEY ("teamId")REFERENCES "public"."Team"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."TeamInvitation" ADD FOREIGN KEY ("pId")REFERENCES "public"."Participant"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Registration" ADD FOREIGN KEY ("teamId")REFERENCES "public"."Team"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Registration" ADD FOREIGN KEY ("pId")REFERENCES "public"."Participant"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Registration" ADD FOREIGN KEY ("eventId")REFERENCES "public"."Event"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_ChannelMembers" ADD FOREIGN KEY ("A")REFERENCES "public"."Channel"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_ChannelMembers" ADD FOREIGN KEY ("B")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_TasksForUser" ADD FOREIGN KEY ("A")REFERENCES "public"."Task"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_TasksForUser" ADD FOREIGN KEY ("B")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_LikesByUser" ADD FOREIGN KEY ("A")REFERENCES "public"."Message"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_LikesByUser" ADD FOREIGN KEY ("B")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200506220818
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,359 @@
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Department {
+  id                String    @default(cuid()) @id
+  name              String
+  shortName         String    @default("")
+  subDepartments    String[]
+  members           User[]    @relation("DeptMembers")
+  tasksAssigned     Task[]    @relation("TasksForDept")
+  tasksCreated      Task[]    @relation("TasksByDept")
+  updates           Update[]  @relation("DeptUpdates")
+  invoicesSubmitted Invoice[] @relation("InvoicesByDept")
+}
+
+model User {
+  id                String     @default(cuid()) @id
+  name              String
+  email             String     @unique
+  password          String
+  rollNumber        String
+  profilePic        String
+  coverPic          String
+  mobile            String
+  upi               String
+  about             String
+  role              UserRole   @default(COORD)
+  verified          Boolean    @default(false)
+  verificationOTP   String
+  passwordOTP       String?
+  department        Department @relation("DeptMembers", fields: [deptId], references: [id])
+  deptId            String
+  // Fields to be fetched separately if needed: Omit in API
+  channels          Channel[]  @relation("ChannelMembers", references: [id])
+  media             Media[]    @relation("MediaByUser")
+  tasksAssigned     Task[]     @relation("TasksForUser", references: [id])
+  invoicesSubmitted Invoice[]  @relation("InvoicesByUser")
+  messages          Message[]  @relation("MessagesByUser")
+  channelsCreated   Channel[]  @relation("ChannelsByUser")
+  tasksCreated      Task[]     @relation("TasksByUser")
+  likedMessages     Message[]  @relation("LikesByUser", references: [id])
+  Update            Update[]   @relation("UserUpdate")
+  Vertical          Vertical[] @relation("VerticalUpdatedBy")
+  Event             Event[]    @relation("EventUpdatedBy")
+}
+
+model Channel {
+  id          String      @default(cuid()) @id
+  name        String      @unique
+  description String
+  type        ChannelType
+  createdAt   DateTime    @default(now())
+  archived    Boolean     @default(false)
+  createdBy   User        @relation("ChannelsByUser", fields: [createdById], references: [id])
+  members     User[]      @relation("ChannelMembers", references: [id])
+  createdById String
+  // Fields to be fetched separately if needed: Omit in API
+  messages    Message[]   @relation("ChannelMessages")
+}
+
+model Message {
+  id          String      @default(cuid()) @id
+  content     String
+  createdAt   DateTime    @default(now())
+  createdBy   User        @relation("MessagesByUser", fields: [createdById], references: [id])
+  starred     Boolean     @default(false)
+  likedBy     User[]      @relation("LikesByUser", references: [id])
+  createdById String
+  type        MessageType
+  media       Media[]     @relation("MessageMedia")
+  // Omit in API
+  channel     Channel     @relation("ChannelMessages", fields: [channelId], references: [id])
+  channelId   String
+}
+
+model Media {
+  id           String    @default(cuid()) @id
+  url          String
+  type         MediaType
+  uploadedBy   User      @relation("MediaByUser", fields: [uploadedById], references: [id])
+  uploadedById String
+  // Fields to be fetched separately if needed: Omit in API
+  invoice      Invoice?  @relation("InvoiceMedia")
+  vertical     Vertical? @relation("VerticalImage")
+  task         Task?     @relation("TaskMedia", fields: [taskId], references: [id])
+  taskId       String?
+  event        Event?    @relation("EventImage")
+  message      Message?  @relation("MessageMedia", fields: [messageId], references: [id])
+  messageId    String?
+}
+
+model Task {
+  id          String         @default(cuid()) @id
+  brief       String
+  details     String
+  byDept      Department     @relation("TasksByDept", fields: [byDeptId], references: [id])
+  forDept     Department     @relation("TasksForDept", fields: [forDeptId], references: [id])
+  createdBy   User           @relation("TasksByUser", fields: [createdById], references: [id])
+  assignedTo  User[]         @relation("TasksForUser", references: [id])
+  status      TaskStatus     @default(NOT_ASSIGNED)
+  createdAt   DateTime       @default(now())
+  deadline    DateTime
+  media       Media[]        @relation("TaskMedia")
+  byDeptId    String
+  forDeptId   String
+  createdById String
+  channelId   String?
+  activity    TaskActivity[] @relation("TaskActivity")
+}
+
+model TaskActivity {
+  id     String           @default(cuid()) @id
+  task   Task             @relation("TaskActivity", fields: [taskId], references: [id])
+  taskId String
+  type   TaskActivityType
+  on     DateTime         @default(now())
+}
+
+model Update {
+  id         String     @default(cuid()) @id
+  brief      String
+  subject    String
+  content    String
+  byDept     Department @relation("DeptUpdates", fields: [byDeptId], references: [id])
+  postedBy   User       @relation("UserUpdate", fields: [postedById], references: [id])
+  createdAt  DateTime   @default(now())
+  postedById String
+  byDeptId   String
+}
+
+// Kaousheik & Vatsal Start from here
+model Invoice {
+  id            String            @default(cuid()) @id
+  title         String
+  date          DateTime
+  invoiceNumber String
+  amount        String
+  purpose       String
+  status        InvoiceStatus
+  type          InvoiceType
+  vendor        Vendor            @relation("VendorInvoices", fields: [vendorId], references: [id])
+  vendorId      String
+  media         Media             @relation("InvoiceMedia", fields: [mediaId], references: [id])
+  mediaId       String
+  activity      InvoiceActivity[] @relation("InvoiceActivity")
+  uploadedBy    User              @relation("InvoicesByUser", fields: [uploadedById], references: [id])
+  uploadedById  String
+  byDept        Department        @relation("InvoicesByDept", fields: [byDeptId], references: [id])
+  byDeptId      String
+}
+
+model InvoiceActivity {
+  id        String              @default(cuid()) @id
+  type      InvoiceActivityType
+  on        DateTime            @default(now())
+  invoice   Invoice             @relation("InvoiceActivity", fields: [invoiceId], references: [id])
+  invoiceId String
+}
+
+model Vendor {
+  id            String    @default(cuid()) @id
+  name          String
+  gstNumber     String
+  accountName   String
+  accountNumber String
+  ifsc          String
+  bankDetails   String
+  invoices      Invoice[] @relation("VendorInvoices")
+}
+
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
+}
+
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
+}
+
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
+  team        Team         @relation("InvitationForTeam", fields: [teamId], references: [id])
+  teamId      String
+  participant Participant  @relation("InvitationForParticipant", fields: [pId], references: [id])
+  pId         String
+}
+
+model Team {
+  id            String           @default(cuid()) @id
+  name          String
+  invitations   TeamInvitation[] @relation("InvitationForTeam")
+  registrations Registration[]   @relation("TeamRegistration")
+}
+
+model Registration {
+  id          String           @default(cuid()) @id
+  type        RegistrationType
+  team        Team?            @relation("TeamRegistration", fields: [teamId], references: [id])
+  teamId      String?
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
+enum MilestoneStatus {
+  IN_PROGRESS
+  ACHIEVED
+}
+
+enum GoalType {
+  WEEKLY
+  BI_WEEKLY
+  MONTHLY
+  END_GOAL
+}
+
+enum SubTaskStatus {
+  NOT_STARTED
+  IN_PROGRESS
+  COMPLETED
+}
+
+enum InvoiceActivityType {
+  UPLOADED
+  EDITED
+  APPROVED
+  REJECTED
+}
+
+enum InvoiceType {
+  REIMBURSEMENT
+  SETTLEMENT
+  DIRECT_PAYMENT
+}
+
+enum InvoiceStatus {
+  COORD
+  HEAD
+  CORE
+  FIN_MANAGER
+  FIN_CORE
+  COCAD
+}
+
+enum TaskStatus {
+  NOT_ASSIGNED
+  ASSIGNED
+  IN_PROGRESS
+  SUBMITTED
+  COMPLETED
+}
+
+enum ReactionType {
+  LIKE
+  LOVE
+  HAHA
+  ANGER
+  SAD
+}
+
+enum MediaType {
+  IMAGE
+  AUDIO
+  VIDEO
+  DOC
+}
+
+enum UserRole {
+  COORD
+  HEAD
+  CORE
+  COCAS
+  COCAD
+}
```


