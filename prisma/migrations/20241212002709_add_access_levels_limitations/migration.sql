/*
  Warnings:

  - A unique constraint covering the columns `[user_id,account_id]` on the table `membership` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ACCOUNT_ACCESS" AS ENUM ('READ_ONLY', 'READ_WRITE', 'ADMIN', 'OWNER');

-- DropIndex
DROP INDEX "membership_user_id_key";

-- AlterTable
ALTER TABLE "account" ADD COLUMN     "max_notes" INTEGER NOT NULL DEFAULT 100;

-- AlterTable
ALTER TABLE "membership" ADD COLUMN     "access" "ACCOUNT_ACCESS" NOT NULL DEFAULT 'READ_ONLY';

-- AlterTable
ALTER TABLE "plan" ADD COLUMN     "max_notes" INTEGER NOT NULL DEFAULT 100;

-- CreateIndex
CREATE UNIQUE INDEX "membership_user_id_account_id_key" ON "membership"("user_id", "account_id");
