/*
  Warnings:

  - Added the required column `userId` to the `Galery` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Galery" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Galery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Galery" ("createdAt", "id", "name", "size", "src") SELECT "createdAt", "id", "name", "size", "src" FROM "Galery";
DROP TABLE "Galery";
ALTER TABLE "new_Galery" RENAME TO "Galery";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
