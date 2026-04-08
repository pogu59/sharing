/*
  Warnings:

  - You are about to drop the column `birthDate` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_email_key";

-- DropIndex
DROP INDEX "users_nickname_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "birthDate",
DROP COLUMN "deletedAt",
DROP COLUMN "email",
DROP COLUMN "isAdmin",
DROP COLUMN "isVerified",
DROP COLUMN "nickname",
DROP COLUMN "phone",
DROP COLUMN "profileImage";
