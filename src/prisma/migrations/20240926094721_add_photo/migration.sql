-- CreateTable
CREATE TABLE "photos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "user_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "camera" TEXT NOT NULL,
    "cameraLen" TEXT NOT NULL,
    "latitude" TEXT,
    "longitude" TEXT,
    "takeAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exposureTime" TEXT NOT NULL,
    "iso" TEXT NOT NULL,
    "fNumber" TEXT NOT NULL,
    "focalLengthIn35mmFormat" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    CONSTRAINT "photos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
