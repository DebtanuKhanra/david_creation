/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "session" (
    "sid" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "expire" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("expire")
);
