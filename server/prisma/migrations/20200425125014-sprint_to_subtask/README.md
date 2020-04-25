# Migration `20200425125014-sprint_to_subtask`

This migration has been generated at 4/25/2020, 12:50:14 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "SubTaskStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

CREATE TABLE "public"."SubTask" (
    "id" text  NOT NULL ,
    "isTemplate" boolean  NOT NULL DEFAULT false,
    "status" "SubTaskStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "taskId" text  NOT NULL ,
    "title" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

ALTER TABLE "public"."Milestone" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS';

ALTER TABLE "public"."Task" ALTER COLUMN "status" SET DEFAULT 'NOT_ASSIGNED';

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'COORD';

ALTER TABLE "public"."Sprint" DROP CONSTRAINT IF EXiSTS "Sprint_taskId_fkey";

ALTER TABLE "public"."SubTask" ADD FOREIGN KEY ("taskId")REFERENCES "public"."Task"("id") ON DELETE CASCADE  ON UPDATE CASCADE

DROP TABLE "public"."Sprint";

DROP TYPE "SprintStatus"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200423135225-dept-short-name..20200425125014-sprint_to_subtask
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
@@ -114,22 +114,22 @@
   createdAt   DateTime   @default(now())
   deadline    DateTime
   channel     Channel    @relation("ChannelTask", fields: [channelId], references: [id])
   media       Media[]    @relation("TaskMedia")
-  sprints     Sprint[]   @relation("SprintsForTask")
+  subTasks    SubTask[]  @relation("SubTasksForTask")
   byDeptId    String
   forDeptId   String
   createdById String
   channelId   String
 }
-model Sprint {
-  id         String       @default(cuid()) @id
+model SubTask {
+  id         String        @default(cuid()) @id
   title      String
-  status     SprintStatus @default(NOT_STARTED)
-  task       Task         @relation("SprintsForTask", fields: [taskId], references: [id])
+  status     SubTaskStatus @default(NOT_STARTED)
+  task       Task          @relation("SubTasksForTask", fields: [taskId], references: [id])
   taskId     String
-  isTemplate Boolean      @default(false)
+  isTemplate Boolean       @default(false)
 }
 model Update {
   id         String     @default(cuid()) @id
@@ -210,9 +210,9 @@
   MONTHLY
   END_GOAL
 }
-enum SprintStatus {
+enum SubTaskStatus {
   NOT_STARTED
   IN_PROGRESS
   COMPLETED
 }
```


