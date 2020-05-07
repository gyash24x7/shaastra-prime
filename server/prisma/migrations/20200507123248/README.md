# Migration `20200507123248`

This migration has been generated at 5/7/2020, 12:32:48 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Media" ALTER COLUMN "type" DROP DEFAULT;

ALTER TABLE "public"."Task" DROP COLUMN "channelId",
ALTER COLUMN "status" SET DEFAULT 'NOT_ASSIGNED';

ALTER TABLE "public"."TaskActivity" ADD COLUMN "description" text  NOT NULL ;

ALTER TABLE "public"."TeamInvitation" ALTER COLUMN "status" SET DEFAULT 'NO_RESPONSE';

ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'COORD';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200506220818..20200507123248
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
@@ -109,18 +109,18 @@
   media       Media[]        @relation("TaskMedia")
   byDeptId    String
   forDeptId   String
   createdById String
-  channelId   String?
   activity    TaskActivity[] @relation("TaskActivity")
 }
 model TaskActivity {
-  id     String           @default(cuid()) @id
-  task   Task             @relation("TaskActivity", fields: [taskId], references: [id])
-  taskId String
-  type   TaskActivityType
-  on     DateTime         @default(now())
+  id          String           @default(cuid()) @id
+  task        Task             @relation("TaskActivity", fields: [taskId], references: [id])
+  taskId      String
+  type        TaskActivityType
+  on          DateTime         @default(now())
+  description String
 }
 model Update {
   id         String     @default(cuid()) @id
```


