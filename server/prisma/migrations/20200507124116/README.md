# Migration `20200507124116`

This migration has been generated at 5/7/2020, 12:41:16 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Task" ALTER COLUMN "status" SET DEFAULT 'NOT_ASSIGNED';

ALTER TABLE "public"."TaskActivity" DROP COLUMN "description",
ADD COLUMN "byId" text  NOT NULL ;

ALTER TABLE "public"."TeamInvitation" ALTER COLUMN "status" SET DEFAULT 'NO_RESPONSE';

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'COORD';

ALTER TABLE "public"."TaskActivity" ADD FOREIGN KEY ("byId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200507123248..20200507124116
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
@@ -19,36 +19,37 @@
   invoicesSubmitted Invoice[] @relation("InvoicesByDept")
 }
 model User {
-  id                String     @default(cuid()) @id
+  id                String         @default(cuid()) @id
   name              String
-  email             String     @unique
+  email             String         @unique
   password          String
   rollNumber        String
   profilePic        String
   coverPic          String
   mobile            String
   upi               String
   about             String
-  role              UserRole   @default(COORD)
-  verified          Boolean    @default(false)
+  role              UserRole       @default(COORD)
+  verified          Boolean        @default(false)
   verificationOTP   String
   passwordOTP       String?
-  department        Department @relation("DeptMembers", fields: [deptId], references: [id])
+  department        Department     @relation("DeptMembers", fields: [deptId], references: [id])
   deptId            String
   // Fields to be fetched separately if needed: Omit in API
-  channels          Channel[]  @relation("ChannelMembers", references: [id])
-  media             Media[]    @relation("MediaByUser")
-  tasksAssigned     Task[]     @relation("TasksForUser", references: [id])
-  invoicesSubmitted Invoice[]  @relation("InvoicesByUser")
-  messages          Message[]  @relation("MessagesByUser")
-  channelsCreated   Channel[]  @relation("ChannelsByUser")
-  tasksCreated      Task[]     @relation("TasksByUser")
-  likedMessages     Message[]  @relation("LikesByUser", references: [id])
-  Update            Update[]   @relation("UserUpdate")
-  Vertical          Vertical[] @relation("VerticalUpdatedBy")
-  Event             Event[]    @relation("EventUpdatedBy")
+  channels          Channel[]      @relation("ChannelMembers", references: [id])
+  media             Media[]        @relation("MediaByUser")
+  tasksAssigned     Task[]         @relation("TasksForUser", references: [id])
+  invoicesSubmitted Invoice[]      @relation("InvoicesByUser")
+  messages          Message[]      @relation("MessagesByUser")
+  channelsCreated   Channel[]      @relation("ChannelsByUser")
+  tasksCreated      Task[]         @relation("TasksByUser")
+  likedMessages     Message[]      @relation("LikesByUser", references: [id])
+  Update            Update[]       @relation("UserUpdate")
+  Vertical          Vertical[]     @relation("VerticalUpdatedBy")
+  Event             Event[]        @relation("EventUpdatedBy")
+  TaskActivity      TaskActivity[] @relation("TaskActivityByUser")
 }
 model Channel {
   id          String      @default(cuid()) @id
@@ -113,14 +114,15 @@
   activity    TaskActivity[] @relation("TaskActivity")
 }
 model TaskActivity {
-  id          String           @default(cuid()) @id
-  task        Task             @relation("TaskActivity", fields: [taskId], references: [id])
-  taskId      String
-  type        TaskActivityType
-  on          DateTime         @default(now())
-  description String
+  id     String           @default(cuid()) @id
+  task   Task             @relation("TaskActivity", fields: [taskId], references: [id])
+  taskId String
+  type   TaskActivityType
+  on     DateTime         @default(now())
+  by     User             @relation("TaskActivityByUser", fields: [byId], references: [id])
+  byId   String
 }
 model Update {
   id         String     @default(cuid()) @id
```


