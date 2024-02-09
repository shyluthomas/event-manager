-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "roleID" INTEGER NOT NULL DEFAULT 2,
    CONSTRAINT "User_roleID_fkey" FOREIGN KEY ("roleID") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("address", "avatar", "dob", "email", "id", "language", "name", "phone", "roleID", "sex") SELECT "address", "avatar", "dob", "email", "id", "language", "name", "phone", "roleID", "sex" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
