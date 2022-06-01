/*
  Warnings:

  - You are about to drop the column `status` on the `Parcel` table. All the data in the column will be lost.
  - Added the required column `statusName` to the `Parcel` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Parcel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "parcelNumber" TEXT NOT NULL,
    "voivodeship" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "commune" TEXT NOT NULL,
    "KW" TEXT,
    "class" TEXT,
    "projectId" TEXT,
    "userId" TEXT,
    "statusName" INTEGER NOT NULL,
    CONSTRAINT "Parcel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Parcel_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Parcel" ("KW", "class", "commune", "county", "id", "parcelNumber", "projectId", "userId", "voivodeship") SELECT "KW", "class", "commune", "county", "id", "parcelNumber", "projectId", "userId", "voivodeship" FROM "Parcel";
DROP TABLE "Parcel";
ALTER TABLE "new_Parcel" RENAME TO "Parcel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
