-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tours" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
    "review_count" INTEGER NOT NULL DEFAULT 0,
    "highlights" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "max_group_size" INTEGER NOT NULL DEFAULT 12,
    "difficulty" TEXT NOT NULL DEFAULT 'Moderate',
    "best_season" TEXT NOT NULL DEFAULT 'Spring',
    "includes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "excludes" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "tours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" SERIAL NOT NULL,
    "tour_id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "travel_date" TEXT NOT NULL,
    "group_size" INTEGER NOT NULL,
    "special_requests" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inquiries" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "tour_interest" TEXT,
    "preferred_dates" TEXT,
    "group_size" TEXT,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonials" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "trip_name" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_posts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "author_image" TEXT NOT NULL,
    "read_time" TEXT NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_published" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guides" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "license_image_url" TEXT NOT NULL,
    "registration_type" TEXT NOT NULL,
    "specializations" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" TEXT NOT NULL DEFAULT 'not_assigned',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itineraries" (
    "id" SERIAL NOT NULL,
    "tour_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "guide_id" INTEGER,
    "driver_id" INTEGER,
    "max_participants" INTEGER NOT NULL DEFAULT 12,
    "current_participants" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "itineraries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itinerary_days" (
    "id" SERIAL NOT NULL,
    "itinerary_id" INTEGER NOT NULL,
    "day_number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "activities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "accommodation" TEXT,
    "meals" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "transportation" TEXT,
    "notes" TEXT,

    CONSTRAINT "itinerary_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "custom_tour_requests" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "duration" INTEGER NOT NULL,
    "group_size" INTEGER NOT NULL,
    "budget" INTEGER,
    "interests" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "preferred_dates" TEXT,
    "special_requirements" TEXT,
    "destinations" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "accommodation_type" TEXT,
    "transport_preference" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "admin_notes" TEXT,
    "estimated_price" INTEGER,
    "assigned_itinerary_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "custom_tour_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "guides_email_key" ON "guides"("email");

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "tours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itineraries" ADD CONSTRAINT "itineraries_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "tours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itineraries" ADD CONSTRAINT "itineraries_guide_id_fkey" FOREIGN KEY ("guide_id") REFERENCES "guides"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itineraries" ADD CONSTRAINT "itineraries_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "guides"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itinerary_days" ADD CONSTRAINT "itinerary_days_itinerary_id_fkey" FOREIGN KEY ("itinerary_id") REFERENCES "itineraries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "custom_tour_requests" ADD CONSTRAINT "custom_tour_requests_assigned_itinerary_id_fkey" FOREIGN KEY ("assigned_itinerary_id") REFERENCES "itineraries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
