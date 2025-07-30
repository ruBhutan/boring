-- AlterTable
ALTER TABLE "tours" ADD COLUMN     "tourOperatorId" INTEGER;

-- CreateTable
CREATE TABLE "tour_operators" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "best_feature" TEXT NOT NULL,
    "specialties" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
    "review_count" INTEGER NOT NULL DEFAULT 0,
    "logo_url" TEXT,
    "contact_email" TEXT,
    "contact_phone" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "established_year" INTEGER,
    "certifications" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "awards" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tour_operators_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tour_operators_name_key" ON "tour_operators"("name");

-- AddForeignKey
ALTER TABLE "tours" ADD CONSTRAINT "tours_tourOperatorId_fkey" FOREIGN KEY ("tourOperatorId") REFERENCES "tour_operators"("id") ON DELETE SET NULL ON UPDATE CASCADE;
