/*
  Warnings:

  - Added the required column `productId` to the `inquiries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "inquiries" ADD COLUMN     "productId" INTEGER NOT NULL;
