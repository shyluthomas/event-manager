/*
  Warnings:

  - Added the required column `ticketCode` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tickets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "inviteId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "ticketCode" TEXT NOT NULL,
    CONSTRAINT "Tickets_inviteId_fkey" FOREIGN KEY ("inviteId") REFERENCES "Invite" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Tickets" ("id", "inviteId", "status") SELECT "id", "inviteId", "status" FROM "Tickets";
DROP TABLE "Tickets";
ALTER TABLE "new_Tickets" RENAME TO "Tickets";
CREATE UNIQUE INDEX "Tickets_inviteId_key" ON "Tickets"("inviteId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
