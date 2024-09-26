-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Like" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "postId" TEXT,
    "userClientUuid" TEXT NOT NULL,
    "nickname" TEXT,
    "targetId" TEXT,
    "targetType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Like" ("createdAt", "id", "nickname", "postId", "targetId", "targetType", "userClientUuid") SELECT "createdAt", "id", "nickname", "postId", "targetId", "targetType", "userClientUuid" FROM "Like";
DROP TABLE "Like";
ALTER TABLE "new_Like" RENAME TO "Like";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
