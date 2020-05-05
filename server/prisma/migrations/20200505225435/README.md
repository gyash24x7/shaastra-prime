# Migration `20200505225435`

This migration has been generated at 5/5/2020, 10:54:35 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Task" ALTER COLUMN "status" SET DEFAULT 'NOT_ASSIGNED';

ALTER TABLE "public"."TeamInvitation" ALTER COLUMN "status" SET DEFAULT 'NO_RESPONSE';

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'COORD';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200505225059..20200505225435
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
@@ -95,24 +95,24 @@
   messageId    String?
 }
 model Task {
-  id           String         @default(cuid()) @id
-  brief        String
-  details      String
-  byDept       Department     @relation("TasksByDept", fields: [byDeptId], references: [id])
-  forDept      Department     @relation("TasksForDept", fields: [forDeptId], references: [id])
-  createdBy    User           @relation("TasksByUser", fields: [createdById], references: [id])
-  assignedTo   User[]         @relation("TasksForUser", references: [id])
-  status       TaskStatus     @default(NOT_ASSIGNED)
-  createdAt    DateTime       @default(now())
-  deadline     DateTime
-  media        Media[]        @relation("TaskMedia")
-  byDeptId     String
-  forDeptId    String
-  createdById  String
-  channelId    String?
-  taskActivity TaskActivity[] @relation("TaskActivity")
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
 }
 model TaskActivity {
   id     String           @default(cuid()) @id
```


