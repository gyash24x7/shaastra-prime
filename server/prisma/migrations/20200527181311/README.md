# Migration `20200527181311`

This migration has been generated at 5/27/2020, 6:13:11 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TYPE "InvoiceActivityType" ADD VALUE 'CONNECT_CHANNEL';
ALTER TYPE "InvoiceActivityType" ADD VALUE 'ATTACH_MEDIA'

ALTER TYPE "InvoiceStatus" ADD VALUE 'REJECTED'

ALTER TYPE "MessageType" ADD VALUE 'INVOICE_UPDATE'

DROP INDEX "public"."Invoice_mediaId"

CREATE TABLE "public"."Goal" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"deptId" text  NOT NULL ,"description" text  NOT NULL ,"id" text  NOT NULL ,"title" text  NOT NULL ,"type" "GoalType" NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."Milestone" (
"goalId" text  NOT NULL ,"id" text  NOT NULL ,"status" "MilestoneStatus" NOT NULL DEFAULT 'IN_PROGRESS',"title" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."_InvoiceUpdateChannels" (
"A" text  NOT NULL ,"B" text  NOT NULL )

ALTER TABLE "public"."Department" ADD COLUMN "finManagerId" text   ;

ALTER TABLE "public"."Event" ADD COLUMN "updatedOn" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "public"."Invoice" DROP CONSTRAINT IF EXiSTS "Invoice_mediaId_fkey",
DROP COLUMN "mediaId",
ADD COLUMN "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "public"."InvoiceActivity" ADD COLUMN "byId" text  NOT NULL ,
ADD COLUMN "description" text  NOT NULL ;

ALTER TABLE "public"."Media" ADD COLUMN "invoiceId" text   ;

ALTER TABLE "public"."Task" ALTER COLUMN "status" SET DEFAULT 'NOT_ASSIGNED';

ALTER TABLE "public"."TaskActivity" ALTER COLUMN "type" DROP DEFAULT;

ALTER TABLE "public"."TeamInvitation" ALTER COLUMN "status" SET DEFAULT 'NO_RESPONSE';

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'COORD';

ALTER TABLE "public"."Vendor" ALTER COLUMN "accountName" DROP NOT NULL,
ALTER COLUMN "accountNumber" DROP NOT NULL,
ALTER COLUMN "bankDetails" DROP NOT NULL,
ALTER COLUMN "ifsc" DROP NOT NULL;

CREATE UNIQUE INDEX "_InvoiceUpdateChannels_AB_unique" ON "public"."_InvoiceUpdateChannels"("A","B")

CREATE  INDEX "_InvoiceUpdateChannels_B_index" ON "public"."_InvoiceUpdateChannels"("B")

CREATE UNIQUE INDEX "Department_finManagerId" ON "public"."Department"("finManagerId")

ALTER TABLE "public"."Goal" ADD FOREIGN KEY ("deptId")REFERENCES "public"."Department"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Milestone" ADD FOREIGN KEY ("goalId")REFERENCES "public"."Goal"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_InvoiceUpdateChannels" ADD FOREIGN KEY ("A")REFERENCES "public"."Channel"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_InvoiceUpdateChannels" ADD FOREIGN KEY ("B")REFERENCES "public"."Invoice"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Department" ADD FOREIGN KEY ("finManagerId")REFERENCES "public"."User"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."InvoiceActivity" ADD FOREIGN KEY ("byId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Media" ADD FOREIGN KEY ("invoiceId")REFERENCES "public"."Invoice"("id") ON DELETE SET NULL  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200509094010..20200527181311
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
@@ -11,60 +11,66 @@
   id                String    @default(cuid()) @id
   name              String
   shortName         String    @default("")
   subDepartments    String[]
+  finManager        User?     @relation("FinManagerForDept", fields: [finManagerId], references: [id])
+  finManagerId      String?
   members           User[]    @relation("DeptMembers")
   tasksAssigned     Task[]    @relation("TasksForDept")
   tasksCreated      Task[]    @relation("TasksByDept")
   updates           Update[]  @relation("DeptUpdates")
   invoicesSubmitted Invoice[] @relation("InvoicesByDept")
+  goals             Goal[]    @relation("DeptGoals")
 }
 model User {
-  id                String         @default(cuid()) @id
+  id                String            @default(cuid()) @id
   name              String
-  email             String         @unique
+  email             String            @unique
   password          String
   rollNumber        String
   profilePic        String
   coverPic          String
   mobile            String
   upi               String
   about             String
-  role              UserRole       @default(COORD)
-  verified          Boolean        @default(false)
+  role              UserRole          @default(COORD)
+  verified          Boolean           @default(false)
   verificationOTP   String
   passwordOTP       String?
-  department        Department     @relation("DeptMembers", fields: [deptId], references: [id])
+  department        Department        @relation("DeptMembers", fields: [deptId], references: [id])
   deptId            String
   // Fields to be fetched separately if needed: Omit in API
-  channels          Channel[]      @relation("ChannelMembers", references: [id])
-  media             Media[]        @relation("MediaByUser")
-  tasksAssigned     Task[]         @relation("TasksForUser", references: [id])
-  invoicesSubmitted Invoice[]      @relation("InvoicesByUser")
-  messages          Message[]      @relation("MessagesByUser")
-  channelsCreated   Channel[]      @relation("ChannelsByUser")
-  tasksCreated      Task[]         @relation("TasksByUser")
-  likedMessages     Message[]      @relation("LikesByUser", references: [id])
-  Update            Update[]       @relation("UserUpdate")
-  Vertical          Vertical[]     @relation("VerticalUpdatedBy")
-  Event             Event[]        @relation("EventUpdatedBy")
-  TaskActivity      TaskActivity[] @relation("TaskActivityByUser")
+  channels          Channel[]         @relation("ChannelMembers", references: [id])
+  media             Media[]           @relation("MediaByUser")
+  tasksAssigned     Task[]            @relation("TasksForUser", references: [id])
+  invoicesSubmitted Invoice[]         @relation("InvoicesByUser")
+  messages          Message[]         @relation("MessagesByUser")
+  channelsCreated   Channel[]         @relation("ChannelsByUser")
+  tasksCreated      Task[]            @relation("TasksByUser")
+  likedMessages     Message[]         @relation("LikesByUser", references: [id])
+  Update            Update[]          @relation("UserUpdate")
+  Vertical          Vertical[]        @relation("VerticalUpdatedBy")
+  Event             Event[]           @relation("EventUpdatedBy")
+  TaskActivity      TaskActivity[]    @relation("TaskActivityByUser")
+  InvoiceActivity   InvoiceActivity[] @relation("InvoiceActivityByUser")
+  Department        Department        @relation("FinManagerForDept")
 }
 model Channel {
-  id             String      @default(cuid()) @id
-  name           String      @unique
-  description    String
-  type           ChannelType
-  createdAt      DateTime    @default(now())
-  archived       Boolean     @default(false)
-  createdBy      User        @relation("ChannelsByUser", fields: [createdById], references: [id])
-  members        User[]      @relation("ChannelMembers", references: [id])
-  createdById    String
+  id                String      @default(cuid()) @id
+  name              String      @unique
+  description       String
+  type              ChannelType
+  createdAt         DateTime    @default(now())
+  archived          Boolean     @default(false)
+  createdBy         User        @relation("ChannelsByUser", fields: [createdById], references: [id])
+  members           User[]      @relation("ChannelMembers", references: [id])
+  createdById       String
   // Fields to be fetched separately if needed: Omit in API
-  messages       Message[]   @relation("ChannelMessages")
-  connectedTasks Task[]      @relation("TaskUpdateChannels", references: [id])
+  messages          Message[]   @relation("ChannelMessages")
+  connectedTasks    Task[]      @relation("TaskUpdateChannels", references: [id])
+  connectedInvoices Invoice[]   @relation("InvoiceUpdateChannels", references: [id])
 }
 model Message {
   id          String      @default(cuid()) @id
@@ -87,9 +93,10 @@
   type         MediaType
   uploadedBy   User      @relation("MediaByUser", fields: [uploadedById], references: [id])
   uploadedById String
   // Fields to be fetched separately if needed: Omit in API
-  invoice      Invoice?  @relation("InvoiceMedia")
+  invoice      Invoice?  @relation("InvoiceMedia", fields: [invoiceId], references: [id])
+  invoiceId    String?
   vertical     Vertical? @relation("VerticalImage")
   task         Task?     @relation("TaskMedia", fields: [taskId], references: [id])
   taskId       String?
   event        Event?    @relation("EventImage")
@@ -138,8 +145,27 @@
   postedById String
   byDeptId   String
 }
+model Goal {
+  id          String      @default(cuid()) @id
+  title       String
+  dept        Department  @relation("DeptGoals", fields: [deptId], references: [id])
+  deptId      String
+  description String
+  type        GoalType
+  createdAt   DateTime    @default(now())
+  milestones  Milestone[] @relation("GoalMilestones")
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
 // Kaousheik & Vatsal Start from here
 model Invoice {
   id            String            @default(cuid()) @id
   title         String
@@ -147,36 +173,40 @@
   invoiceNumber String
   amount        String
   purpose       String
   status        InvoiceStatus
+  createdAt     DateTime          @default(now())
   type          InvoiceType
   vendor        Vendor            @relation("VendorInvoices", fields: [vendorId], references: [id])
   vendorId      String
-  media         Media             @relation("InvoiceMedia", fields: [mediaId], references: [id])
-  mediaId       String
+  media         Media[]           @relation("InvoiceMedia")
   activity      InvoiceActivity[] @relation("InvoiceActivity")
   uploadedBy    User              @relation("InvoicesByUser", fields: [uploadedById], references: [id])
   uploadedById  String
   byDept        Department        @relation("InvoicesByDept", fields: [byDeptId], references: [id])
   byDeptId      String
+  channels      Channel[]         @relation("InvoiceUpdateChannels", references: [id])
 }
 model InvoiceActivity {
-  id        String              @default(cuid()) @id
-  type      InvoiceActivityType
-  on        DateTime            @default(now())
-  invoice   Invoice             @relation("InvoiceActivity", fields: [invoiceId], references: [id])
-  invoiceId String
+  id          String              @default(cuid()) @id
+  type        InvoiceActivityType
+  on          DateTime            @default(now())
+  invoice     Invoice             @relation("InvoiceActivity", fields: [invoiceId], references: [id])
+  invoiceId   String
+  by          User                @relation("InvoiceActivityByUser", fields: [byId], references: [id])
+  byId        String
+  description String
 }
 model Vendor {
   id            String    @default(cuid()) @id
   name          String
   gstNumber     String
-  accountName   String
-  accountNumber String
-  ifsc          String
-  bankDetails   String
+  accountName   String?
+  accountNumber String?
+  ifsc          String?
+  bankDetails   String?
   invoices      Invoice[] @relation("VendorInvoices")
 }
 model Vertical {
@@ -198,8 +228,9 @@
   rank             Int              @default(autoincrement())
   vertical         Vertical         @relation("EventsUnderVertical", fields: [verticalId], references: [id])
   verticalId       String
   info             String
+  updatedOn        DateTime         @default(now())
   eventTabs        EventTab[]       @relation("TabsForEvent")
   updatedBy        User             @relation("EventUpdatedBy", fields: [updatedById], references: [id])
   updatedById      String
   image            Media            @relation("EventImage", fields: [imageId], references: [id])
@@ -265,8 +296,9 @@
   SYSTEM
   TEXT
   MEDIA
   TASK_UPDATE
+  INVOICE_UPDATE
 }
 enum RegistrationType {
   INDIVIDUAL
@@ -317,8 +349,10 @@
   UPLOADED
   EDITED
   APPROVED
   REJECTED
+  CONNECT_CHANNEL
+  ATTACH_MEDIA
 }
 enum InvoiceType {
   REIMBURSEMENT
@@ -332,8 +366,9 @@
   CORE
   FIN_MANAGER
   FIN_CORE
   COCAD
+  REJECTED
 }
 enum TaskStatus {
   NOT_ASSIGNED
```


