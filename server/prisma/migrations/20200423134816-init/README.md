# Migration `20200423134816-init`

This migration has been generated at 4/23/2020, 1:48:16 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Department" (
    "id" text  NOT NULL ,
    "name" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Team" (
    "deptId" text  NOT NULL ,
    "id" text  NOT NULL ,
    "name" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."User" (
    "about" text  NOT NULL ,
    "coverPic" text  NOT NULL ,
    "departmentId" text  NOT NULL ,
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
    "taskId" text   ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Message" (
    "channelId" text  NOT NULL ,
    "content" text  NOT NULL ,
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" text  NOT NULL ,
    "id" text  NOT NULL ,
    "starred" boolean  NOT NULL DEFAULT false,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Media" (
    "channelId" text   ,
    "id" text  NOT NULL ,
    "taskId" text   ,
    "type" "MediaType" NOT NULL ,
    "uploadedById" text  NOT NULL ,
    "url" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Reaction" (
    "byId" text  NOT NULL ,
    "id" text  NOT NULL ,
    "messageId" text  NOT NULL ,
    "type" "ReactionType" NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Task" (
    "brief" text  NOT NULL ,
    "byDeptId" text  NOT NULL ,
    "channelId" text  NOT NULL ,
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" text  NOT NULL ,
    "deadline" timestamp(3)  NOT NULL ,
    "details" text  NOT NULL ,
    "forDeptId" text  NOT NULL ,
    "id" text  NOT NULL ,
    "status" "TaskStatus" NOT NULL DEFAULT 'NOT_ASSIGNED',
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Sprint" (
    "id" text  NOT NULL ,
    "isTemplate" boolean  NOT NULL DEFAULT false,
    "status" "SprintStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "taskId" text  NOT NULL ,
    "title" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Update" (
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

CREATE TABLE "public"."Goal" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deptId" text  NOT NULL ,
    "id" text  NOT NULL ,
    "title" text  NOT NULL ,
    "type" "GoalType" NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Milestone" (
    "goalId" text  NOT NULL ,
    "id" text  NOT NULL ,
    "status" "MilestoneStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "title" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."_TeamMembers" (
    "A" text  NOT NULL ,
    "B" text  NOT NULL 
) 

CREATE TABLE "public"."_ChannelMembers" (
    "A" text  NOT NULL ,
    "B" text  NOT NULL 
) 

CREATE TABLE "public"."_TasksForUser" (
    "A" text  NOT NULL ,
    "B" text  NOT NULL 
) 

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

CREATE UNIQUE INDEX "Task_channelId" ON "public"."Task"("channelId")

CREATE UNIQUE INDEX "_TeamMembers_AB_unique" ON "public"."_TeamMembers"("A","B")

CREATE  INDEX "_TeamMembers_B_index" ON "public"."_TeamMembers"("B")

CREATE UNIQUE INDEX "_ChannelMembers_AB_unique" ON "public"."_ChannelMembers"("A","B")

CREATE  INDEX "_ChannelMembers_B_index" ON "public"."_ChannelMembers"("B")

CREATE UNIQUE INDEX "_TasksForUser_AB_unique" ON "public"."_TasksForUser"("A","B")

CREATE  INDEX "_TasksForUser_B_index" ON "public"."_TasksForUser"("B")

ALTER TABLE "public"."Team" ADD FOREIGN KEY ("deptId")REFERENCES "public"."Department"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("departmentId")REFERENCES "public"."Department"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Channel" ADD FOREIGN KEY ("createdById")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Message" ADD FOREIGN KEY ("createdById")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Message" ADD FOREIGN KEY ("channelId")REFERENCES "public"."Channel"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Media" ADD FOREIGN KEY ("uploadedById")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Media" ADD FOREIGN KEY ("taskId")REFERENCES "public"."Task"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Media" ADD FOREIGN KEY ("channelId")REFERENCES "public"."Channel"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Reaction" ADD FOREIGN KEY ("byId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Reaction" ADD FOREIGN KEY ("messageId")REFERENCES "public"."Message"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Task" ADD FOREIGN KEY ("byDeptId")REFERENCES "public"."Department"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Task" ADD FOREIGN KEY ("forDeptId")REFERENCES "public"."Department"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Task" ADD FOREIGN KEY ("createdById")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Task" ADD FOREIGN KEY ("channelId")REFERENCES "public"."Channel"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Sprint" ADD FOREIGN KEY ("taskId")REFERENCES "public"."Task"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Update" ADD FOREIGN KEY ("byDeptId")REFERENCES "public"."Department"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Update" ADD FOREIGN KEY ("postedById")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Invoice" ADD FOREIGN KEY ("vendorId")REFERENCES "public"."Vendor"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Invoice" ADD FOREIGN KEY ("mediaId")REFERENCES "public"."Media"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Invoice" ADD FOREIGN KEY ("uploadedById")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Invoice" ADD FOREIGN KEY ("byDeptId")REFERENCES "public"."Department"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."InvoiceActivity" ADD FOREIGN KEY ("invoiceId")REFERENCES "public"."Invoice"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Goal" ADD FOREIGN KEY ("deptId")REFERENCES "public"."Department"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Milestone" ADD FOREIGN KEY ("goalId")REFERENCES "public"."Goal"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_TeamMembers" ADD FOREIGN KEY ("A")REFERENCES "public"."Team"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_TeamMembers" ADD FOREIGN KEY ("B")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_ChannelMembers" ADD FOREIGN KEY ("A")REFERENCES "public"."Channel"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_ChannelMembers" ADD FOREIGN KEY ("B")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_TasksForUser" ADD FOREIGN KEY ("A")REFERENCES "public"."Task"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_TasksForUser" ADD FOREIGN KEY ("B")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200423134816-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,271 @@
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
+  subDepartments    Team[]    @relation("DeptTeams")
+  members           User[]    @relation("DepartmentMembers")
+  tasksAssigned     Task[]    @relation("TasksForDept")
+  tasksCreated      Task[]    @relation("TasksByDept")
+  updates           Update[]  @relation("DeptUpdates")
+  invoicesSubmitted Invoice[] @relation("InvoicesByDept")
+}
+
+model Team {
+  id         String     @default(cuid()) @id
+  name       String
+  members    User[]     @relation("TeamMembers", references: [id])
+  department Department @relation("DeptTeams", fields: [deptId], references: [id])
+  deptId     String
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
+  department        Department @relation("DepartmentMembers", fields: [departmentId], references: [id])
+  departmentId      String
+  channels          Channel[]  @relation("ChannelMembers", references: [id])
+  channelsCreated   Channel[]  @relation("ChannelsByUser")
+  messages          Message[]  @relation("MessagesByUser")
+  media             Media[]    @relation("MediaByUser")
+  tasksCreated      Task[]     @relation("TasksByUser")
+  tasksAssigned     Task[]     @relation("TasksForUser", references: [id])
+  teams             Team[]     @relation("TeamMembers", references: [id])
+  invoicesSubmitted Invoice[]  @relation("InvoicesByUser")
+}
+
+model Channel {
+  id          String    @default(cuid()) @id
+  name        String
+  description String
+  createdAt   DateTime  @default(now())
+  archived    Boolean   @default(false)
+  messages    Message[] @relation("ChannelMessages")
+  createdBy   User      @relation("ChannelsByUser", fields: [createdById], references: [id])
+  members     User[]    @relation("ChannelMembers", references: [id])
+  media       Media[]   @relation("ChannelMedia")
+  task        Task?     @relation("ChannelTask")
+  createdById String
+  taskId      String?
+}
+
+model Message {
+  id          String     @default(cuid()) @id
+  content     String
+  createdAt   DateTime   @default(now())
+  createdBy   User       @relation("MessagesByUser", fields: [createdById], references: [id])
+  channel     Channel    @relation("ChannelMessages", fields: [channelId], references: [id])
+  starred     Boolean    @default(false)
+  reactions   Reaction[] @relation("MessageReactions")
+  createdById String
+  channelId   String
+}
+
+model Media {
+  id           String    @default(cuid()) @id
+  url          String
+  type         MediaType
+  uploadedBy   User      @relation("MediaByUser", fields: [uploadedById], references: [id])
+  task         Task?     @relation("TaskMedia", fields: [taskId], references: [id])
+  taskId       String?
+  channel      Channel?  @relation("ChannelMedia", fields: [channelId], references: [id])
+  uploadedById String
+  channelId    String?
+}
+
+model Reaction {
+  id        String       @default(cuid()) @id
+  type      ReactionType
+  by        User         @relation("UserReactions", fields: [byId], references: [id])
+  message   Message      @relation("MessageReactions", fields: [messageId], references: [id])
+  byId      String
+  messageId String
+}
+
+model Task {
+  id          String     @default(cuid()) @id
+  brief       String
+  details     String
+  byDept      Department @relation("TasksByDept", fields: [byDeptId], references: [id])
+  forDept     Department @relation("TasksForDept", fields: [forDeptId], references: [id])
+  createdBy   User       @relation("TasksByUser", fields: [createdById], references: [id])
+  assignedTo  User[]     @relation("TasksForUser", references: [id])
+  status      TaskStatus @default(NOT_ASSIGNED)
+  createdAt   DateTime   @default(now())
+  deadline    DateTime
+  channel     Channel    @relation("ChannelTask", fields: [channelId], references: [id])
+  media       Media[]    @relation("TaskMedia")
+  sprints     Sprint[]   @relation("SprintsForTask")
+  byDeptId    String
+  forDeptId   String
+  createdById String
+  channelId   String
+}
+
+model Sprint {
+  id         String       @default(cuid()) @id
+  title      String
+  status     SprintStatus @default(NOT_STARTED)
+  task       Task         @relation("SprintsForTask", fields: [taskId], references: [id])
+  taskId     String
+  isTemplate Boolean      @default(false)
+}
+
+model Update {
+  id         String     @default(cuid()) @id
+  subject    String
+  content    String
+  byDept     Department @relation("DeptUpdates", fields: [byDeptId], references: [id])
+  postedBy   User       @relation("UserUpdate", fields: [postedById], references: [id])
+  createdAt  DateTime   @default(now())
+  postedById String
+  byDeptId   String
+}
+
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
+enum SprintStatus {
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
+  CODE
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


