/*
  Warnings:

  - Added the required column `staffId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Business` required. This step will fail if there are existing NULL values in that column.
  - Made the column `primaryColor` on table `Business` required. This step will fail if there are existing NULL values in that column.
  - Made the column `secondaryColor` on table `Business` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Business` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "BusinessStatus" AS ENUM ('DRAFT');

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "staffId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "status" "BusinessStatus" NOT NULL DEFAULT 'DRAFT',
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "primaryColor" SET NOT NULL,
ALTER COLUMN "secondaryColor" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" UUID,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffService" (
    "staffId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "StaffService_pkey" PRIMARY KEY ("staffId","serviceId")
);

-- CreateTable
CREATE TABLE "StaffWorkingHours" (
    "id" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "openMinute" INTEGER NOT NULL,
    "closeMinute" INTEGER NOT NULL,

    CONSTRAINT "StaffWorkingHours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Staff_businessId_idx" ON "Staff"("businessId");

-- CreateIndex
CREATE INDEX "Staff_userId_idx" ON "Staff"("userId");

-- CreateIndex
CREATE INDEX "StaffService_serviceId_idx" ON "StaffService"("serviceId");

-- CreateIndex
CREATE INDEX "StaffWorkingHours_staffId_dayOfWeek_idx" ON "StaffWorkingHours"("staffId", "dayOfWeek");

-- CreateIndex
CREATE INDEX "Appointment_staffId_startsAt_idx" ON "Appointment"("staffId", "startsAt");

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffService" ADD CONSTRAINT "StaffService_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffService" ADD CONSTRAINT "StaffService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffWorkingHours" ADD CONSTRAINT "StaffWorkingHours_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
