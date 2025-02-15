-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('SDE1', 'SDE2', 'SDE3');

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "roleType" "RoleType" NOT NULL,
    "experienceInYears" VARCHAR(10) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_roleType_key" ON "Role"("roleType");
