/*
  Warnings:

  - You are about to drop the column `order_id_from_gateway` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderIdFromGateway]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderIdFromGateway` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'FAILED', 'SUCCESS');

-- DropIndex
DROP INDEX "Payment_order_id_from_gateway_key";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "order_id_from_gateway",
ADD COLUMN     "orderIdFromGateway" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "PaymentStatus" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_orderIdFromGateway_key" ON "Payment"("orderIdFromGateway");
