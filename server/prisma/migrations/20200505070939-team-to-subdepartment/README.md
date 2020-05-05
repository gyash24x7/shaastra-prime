# Migration `20200505070939-team-to-subdepartment`

This migration has been generated at 5/5/2020, 7:09:39 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."SubDepartment" (
    "deptId" text  NOT NULL ,
    "id" text  NOT NULL ,
    "name" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."_SubDeptMembers" (
    "A" text  NOT NULL ,
    "B" text  NOT NULL 
) 

ALTER TABLE "public"."Milestone" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS';

ALTER TABLE "public"."Participant" ALTER COLUMN "shaastrID" DROP DEFAULT;

ALTER TABLE "public"."Registration" DROP CONSTRAINT IF EXiSTS "Registration_pTeamId_fkey",
DROP COLUMN "pTeamId",
ADD COLUMN "teamId" text   ;

ALTER TABLE "public"."SubTask" ALTER COLUMN "status" SET DEFAULT 'NOT_STARTED';

ALTER TABLE "public"."Task" ALTER COLUMN "status" SET DEFAULT 'NOT_ASSIGNED';

ALTER TABLE "public"."Team" DROP CONSTRAINT IF EXiSTS "Team_deptId_fkey",
DROP COLUMN "deptId";

ALTER TABLE "public"."TeamInvitation" DROP CONSTRAINT IF EXiSTS "TeamInvitation_pTeamId_fkey",
DROP COLUMN "pTeamId",
ADD COLUMN "teamId" text  NOT NULL ,
ALTER COLUMN "status" SET DEFAULT 'NO_RESPONSE';

ALTER TABLE "public"."User" DROP CONSTRAINT IF EXiSTS "User_departmentId_fkey",
DROP COLUMN "departmentId",
ADD COLUMN "deptId" text  NOT NULL ,
ALTER COLUMN "role" SET DEFAULT 'COORD';

ALTER TABLE "public"."_TeamMembers" DROP CONSTRAINT IF EXiSTS "_TeamMembers_A_fkey";

ALTER TABLE "public"."_TeamMembers" DROP CONSTRAINT IF EXiSTS "_TeamMembers_B_fkey";

CREATE UNIQUE INDEX "_SubDeptMembers_AB_unique" ON "public"."_SubDeptMembers"("A","B")

CREATE  INDEX "_SubDeptMembers_B_index" ON "public"."_SubDeptMembers"("B")

ALTER TABLE "public"."SubDepartment" ADD FOREIGN KEY ("deptId")REFERENCES "public"."Department"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_SubDeptMembers" ADD FOREIGN KEY ("A")REFERENCES "public"."SubDepartment"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_SubDeptMembers" ADD FOREIGN KEY ("B")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Registration" ADD FOREIGN KEY ("teamId")REFERENCES "public"."Team"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."TeamInvitation" ADD FOREIGN KEY ("teamId")REFERENCES "public"."Team"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."User" ADD FOREIGN KEY ("deptId")REFERENCES "public"."Department"("id") ON DELETE CASCADE  ON UPDATE CASCADE

DROP TABLE "public"."PTeam";

DROP TABLE "public"."_TeamMembers";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200504132218-refined-fields..20200505070939-team-to-subdepartment
--- datamodel.dml
+++ datamodel.dml
@@ -1,64 +1,64 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
 }
 model Department {
-  id                String    @default(cuid()) @id
+  id                String          @default(cuid()) @id
   name              String
-  shortName         String    @default("")
-  subDepartments    Team[]    @relation("DeptTeams")
-  members           User[]    @relation("DepartmentMembers")
-  tasksAssigned     Task[]    @relation("TasksForDept")
-  tasksCreated      Task[]    @relation("TasksByDept")
-  updates           Update[]  @relation("DeptUpdates")
-  invoicesSubmitted Invoice[] @relation("InvoicesByDept")
-  goals             Goal[]    @relation("DeptGoals")
+  shortName         String          @default("")
+  subDepartments    SubDepartment[] @relation("SubDept")
+  members           User[]          @relation("DeptMembers")
+  tasksAssigned     Task[]          @relation("TasksForDept")
+  tasksCreated      Task[]          @relation("TasksByDept")
+  updates           Update[]        @relation("DeptUpdates")
+  invoicesSubmitted Invoice[]       @relation("InvoicesByDept")
+  goals             Goal[]          @relation("DeptGoals")
 }
-model Team {
+model SubDepartment {
   id         String     @default(cuid()) @id
   name       String
-  members    User[]     @relation("TeamMembers", references: [id])
-  department Department @relation("DeptTeams", fields: [deptId], references: [id])
+  members    User[]     @relation("SubDeptMembers", references: [id])
+  department Department @relation("SubDept", fields: [deptId], references: [id])
   deptId     String
 }
 model User {
-  id                String     @default(cuid()) @id
+  id                String          @default(cuid()) @id
   name              String
-  email             String     @unique
+  email             String          @unique
   password          String
   rollNumber        String
   profilePic        String
   coverPic          String
   mobile            String
   upi               String
   about             String
-  role              UserRole   @default(COORD)
-  verified          Boolean    @default(false)
+  role              UserRole        @default(COORD)
+  verified          Boolean         @default(false)
   verificationOTP   String
   passwordOTP       String?
-  department        Department @relation("DepartmentMembers", fields: [departmentId], references: [id])
-  departmentId      String
+  department        Department      @relation("DeptMembers", fields: [deptId], references: [id])
+  deptId            String
   // Fields to be fetched separately if needed: Omit in API
-  channels          Channel[]  @relation("ChannelMembers", references: [id])
-  media             Media[]    @relation("MediaByUser")
-  tasksAssigned     Task[]     @relation("TasksForUser", references: [id])
-  invoicesSubmitted Invoice[]  @relation("InvoicesByUser")
-  teams             Team[]     @relation("TeamMembers", references: [id])
-  messages          Message[]  @relation("MessagesByUser")
-  channelsCreated   Channel[]  @relation("ChannelsByUser")
-  tasksCreated      Task[]     @relation("TasksByUser")
-  Reaction          Reaction[] @relation("UserReactions")
-  Update            Update[]   @relation("UserUpdate")
-  Vertical          Vertical[] @relation("VerticalUpdatedBy")
-  Event             Event[]    @relation("EventUpdatedBy")
+  channels          Channel[]       @relation("ChannelMembers", references: [id])
+  media             Media[]         @relation("MediaByUser")
+  tasksAssigned     Task[]          @relation("TasksForUser", references: [id])
+  invoicesSubmitted Invoice[]       @relation("InvoicesByUser")
+  subDepartments    SubDepartment[] @relation("SubDeptMembers", references: [id])
+  messages          Message[]       @relation("MessagesByUser")
+  channelsCreated   Channel[]       @relation("ChannelsByUser")
+  tasksCreated      Task[]          @relation("TasksByUser")
+  Reaction          Reaction[]      @relation("UserReactions")
+  Update            Update[]        @relation("UserUpdate")
+  Vertical          Vertical[]      @relation("VerticalUpdatedBy")
+  Event             Event[]         @relation("EventUpdatedBy")
 }
 model Channel {
   id          String      @default(cuid()) @id
@@ -278,15 +278,15 @@
 model TeamInvitation {
   id          String       @default(cuid()) @id
   status      InviteStatus @default(NO_RESPONSE)
-  team        PTeam        @relation("InvitationForTeam", fields: [pTeamId], references: [id])
-  pTeamId     String
+  team        Team         @relation("InvitationForTeam", fields: [teamId], references: [id])
+  teamId      String
   participant Participant  @relation("InvitationForParticipant", fields: [pId], references: [id])
   pId         String
 }
-model PTeam {
+model Team {
   id            String           @default(cuid()) @id
   name          String
   invitations   TeamInvitation[] @relation("InvitationForTeam")
   registrations Registration[]   @relation("TeamRegistration")
@@ -294,10 +294,10 @@
 model Registration {
   id          String           @default(cuid()) @id
   type        RegistrationType
-  team        PTeam?           @relation("TeamRegistration", fields: [pTeamId], references: [id])
-  pTeamId     String?
+  team        Team?            @relation("TeamRegistration", fields: [teamId], references: [id])
+  teamId      String?
   participant Participant?     @relation("IndividualRegistration", fields: [pId], references: [id])
   pId         String?
   event       Event            @relation("EventRegistration", fields: [eventId], references: [id])
   eventId     String
```


