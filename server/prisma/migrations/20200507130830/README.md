# Migration `20200507130830`

This migration has been generated at 5/7/2020, 1:08:30 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Task" ALTER COLUMN "status" SET DEFAULT 'NOT_ASSIGNED';

ALTER TABLE "public"."TaskActivity" ADD COLUMN "description" text  NOT NULL ;

ALTER TABLE "public"."TeamInvitation" ALTER COLUMN "status" SET DEFAULT 'NO_RESPONSE';

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'COORD';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200507124116..20200507130830
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
@@ -114,15 +114,16 @@
   activity    TaskActivity[] @relation("TaskActivity")
 }
 model TaskActivity {
-  id     String           @default(cuid()) @id
-  task   Task             @relation("TaskActivity", fields: [taskId], references: [id])
-  taskId String
-  type   TaskActivityType
-  on     DateTime         @default(now())
-  by     User             @relation("TaskActivityByUser", fields: [byId], references: [id])
-  byId   String
+  id          String           @default(cuid()) @id
+  task        Task             @relation("TaskActivity", fields: [taskId], references: [id])
+  taskId      String
+  type        TaskActivityType
+  on          DateTime         @default(now())
+  by          User             @relation("TaskActivityByUser", fields: [byId], references: [id])
+  byId        String
+  description String
 }
 model Update {
   id         String     @default(cuid()) @id
```


