/*
  Warnings:

  - You are about to drop the column `enabled` on the `AIModel` table. All the data in the column will be lost.
  - You are about to drop the column `apiKey` on the `AIProvider` table. All the data in the column will be lost.
  - You are about to drop the column `enabled` on the `AIProvider` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `AIProvider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `AIModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `AIProvider` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AIModel" DROP CONSTRAINT "AIModel_providerId_fkey";

-- AlterTable
ALTER TABLE "AIModel" DROP COLUMN "enabled",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isFree" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "AIProvider" DROP COLUMN "apiKey",
DROP COLUMN "enabled",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "baseUrl" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AIProvider_name_key" ON "AIProvider"("name");

-- AddForeignKey
ALTER TABLE "AIModel" ADD CONSTRAINT "AIModel_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "AIProvider"("id") ON DELETE CASCADE ON UPDATE CASCADE;
