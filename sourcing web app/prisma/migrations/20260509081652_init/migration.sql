-- DropForeignKey
ALTER TABLE "inquiries" DROP CONSTRAINT "inquiries_productId_fkey";

-- AlterTable
ALTER TABLE "inquiries" ALTER COLUMN "productId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
