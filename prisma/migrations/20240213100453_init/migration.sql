/*
  Warnings:

  - You are about to drop the column `tokens` on the `Login` table. All the data in the column will be lost.
  - Added the required column `refreshToken` to the `Login` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `Login` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Login" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Login_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Login" ("id", "password", "userId", "username") SELECT "id", "password", "userId", "username" FROM "Login";
DROP TABLE "Login";
ALTER TABLE "new_Login" RENAME TO "Login";
CREATE UNIQUE INDEX "Login_userId_key" ON "Login"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
