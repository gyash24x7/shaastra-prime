# Migration `20200505212818`

This migration has been generated at 5/5/2020, 9:28:18 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Department" ADD COLUMN "subDepartments" text []  ;

ALTER TABLE "public"."Message" ALTER COLUMN "type" DROP DEFAULT;

ALTER TABLE "public"."Milestone" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS';

ALTER TABLE "public"."Task" ALTER COLUMN "status" SET DEFAULT 'NOT_ASSIGNED';

ALTER TABLE "public"."TeamInvitation" ALTER COLUMN "status" SET DEFAULT 'NO_RESPONSE';

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'COORD';

ALTER TABLE "public"."SubDepartment" DROP CONSTRAINT IF EXiSTS "SubDepartment_deptId_fkey";

ALTER TABLE "public"."_SubDeptMembers" DROP CONSTRAINT IF EXiSTS "_SubDeptMembers_A_fkey";

ALTER TABLE "public"."_SubDeptMembers" DROP CONSTRAINT IF EXiSTS "_SubDeptMembers_B_fkey";

DROP TABLE "public"."SubDepartment";

DROP TABLE "public"."_SubDeptMembers";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200505134249-simplified-datamodel..20200505212818
--- datamodel.dml
+++ datamodel.dml
@@ -1,64 +1,55 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
 }
 model Department {
-  id                String          @default(cuid()) @id
+  id                String    @default(cuid()) @id
   name              String
-  shortName         String          @default("")
-  subDepartments    SubDepartment[] @relation("SubDept")
-  members           User[]          @relation("DeptMembers")
-  tasksAssigned     Task[]          @relation("TasksForDept")
-  tasksCreated      Task[]          @relation("TasksByDept")
-  updates           Update[]        @relation("DeptUpdates")
-  invoicesSubmitted Invoice[]       @relation("InvoicesByDept")
-  goals             Goal[]          @relation("DeptGoals")
+  shortName         String    @default("")
+  subDepartments    String[]
+  members           User[]    @relation("DeptMembers")
+  tasksAssigned     Task[]    @relation("TasksForDept")
+  tasksCreated      Task[]    @relation("TasksByDept")
+  updates           Update[]  @relation("DeptUpdates")
+  invoicesSubmitted Invoice[] @relation("InvoicesByDept")
+  goals             Goal[]    @relation("DeptGoals")
 }
-model SubDepartment {
-  id         String     @default(cuid()) @id
-  name       String
-  members    User[]     @relation("SubDeptMembers", references: [id])
-  department Department @relation("SubDept", fields: [deptId], references: [id])
-  deptId     String
-}
-
 model User {
-  id                String          @default(cuid()) @id
+  id                String     @default(cuid()) @id
   name              String
-  email             String          @unique
+  email             String     @unique
   password          String
   rollNumber        String
   profilePic        String
   coverPic          String
   mobile            String
   upi               String
   about             String
-  role              UserRole        @default(COORD)
-  verified          Boolean         @default(false)
+  role              UserRole   @default(COORD)
+  verified          Boolean    @default(false)
   verificationOTP   String
   passwordOTP       String?
-  department        Department      @relation("DeptMembers", fields: [deptId], references: [id])
+  department        Department @relation("DeptMembers", fields: [deptId], references: [id])
   deptId            String
   // Fields to be fetched separately if needed: Omit in API
-  channels          Channel[]       @relation("ChannelMembers", references: [id])
-  media             Media[]         @relation("MediaByUser")
-  tasksAssigned     Task[]          @relation("TasksForUser", references: [id])
-  invoicesSubmitted Invoice[]       @relation("InvoicesByUser")
-  subDepartments    SubDepartment[] @relation("SubDeptMembers", references: [id])
-  messages          Message[]       @relation("MessagesByUser")
-  channelsCreated   Channel[]       @relation("ChannelsByUser")
-  tasksCreated      Task[]          @relation("TasksByUser")
-  likedMessages     Message[]       @relation("LikesByUser", references: [id])
-  Update            Update[]        @relation("UserUpdate")
-  Vertical          Vertical[]      @relation("VerticalUpdatedBy")
-  Event             Event[]         @relation("EventUpdatedBy")
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
 }
 model Channel {
   id          String      @default(cuid()) @id
```


