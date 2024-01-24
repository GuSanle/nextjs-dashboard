/*
  Warnings:

  - You are about to drop the column `expire` on the `Domain` table. All the data in the column will be lost.
  - Added the required column `expireAt` to the `Domain` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Domain` DROP COLUMN `expire`,
    ADD COLUMN `expireAt` DATETIME(3) NOT NULL;
