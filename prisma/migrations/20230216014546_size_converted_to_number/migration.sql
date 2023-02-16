/*
  Warnings:

  - You are about to alter the column `size` on the `Galery` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Galery" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Galery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Galery" ("createdAt", "id", "name", "size", "src", "userId") SELECT "createdAt", "id", "name", "size", "src", "userId" FROM "Galery";
DROP TABLE "Galery";
ALTER TABLE "new_Galery" RENAME TO "Galery";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
