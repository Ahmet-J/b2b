/*
  Warnings:

  - You are about to drop the column `productId` on the `inquiries` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `inquiries` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `suppliers` table. All the data in the column will be lost.
  - You are about to drop the column `businessLicense` on the `suppliers` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `suppliers` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `suppliers` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `suppliers` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `suppliers` table. All the data in the column will be lost.
  - You are about to drop the column `employeeCount` on the `suppliers` table. All the data in the column will be lost.
  - You are about to drop the column `yearEstablished` on the `suppliers` table. All the data in the column will be lost.
  - Added the required column `Descriptionproduct` to the `suppliers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categortId` to the `suppliers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `factorybackground` to the `suppliers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `suppliers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `suppliers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "inquiries" DROP CONSTRAINT "inquiries_productId_fkey";

-- AlterTable
ALTER TABLE "inquiries" DROP COLUMN "productId",
DROP COLUMN "subject";

-- AlterTable
ALTER TABLE "suppliers" DROP COLUMN "address",
DROP COLUMN "businessLicense",
DROP COLUMN "city",
DROP COLUMN "companyName",
DROP COLUMN "country",
DROP COLUMN "description",
DROP COLUMN "employeeCount",
DROP COLUMN "yearEstablished",
ADD COLUMN     "Descriptionproduct" TEXT NOT NULL,
ADD COLUMN     "categortId" INTEGER NOT NULL,
ADD COLUMN     "factorybackground" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "suppliers" ADD CONSTRAINT "suppliers_categortId_fkey" FOREIGN KEY ("categortId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
