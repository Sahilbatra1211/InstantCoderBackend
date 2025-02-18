-- CreateTable
CREATE TABLE "company_role" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "salary_start_range" INTEGER NOT NULL,
    "salary_end_range" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(255) NOT NULL,
    "updated_by" VARCHAR(255),

    CONSTRAINT "company_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "company_id" INTEGER,
    "college_id" INTEGER,
    "password" TEXT NOT NULL,
    "is_mentor" BOOLEAN NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("email")
);

-- AddForeignKey
ALTER TABLE "company_role" ADD CONSTRAINT "fk_company" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "company_role" ADD CONSTRAINT "fk_role" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "college"("id") ON DELETE SET NULL ON UPDATE CASCADE;
