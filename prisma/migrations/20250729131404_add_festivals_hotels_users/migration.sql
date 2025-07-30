-- CreateTable
CREATE TABLE "festivals" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "image_url" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "highlights" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "ticket_price" INTEGER,
    "max_capacity" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "festivals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "festival_bookings" (
    "id" SERIAL NOT NULL,
    "festival_id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "number_of_tickets" INTEGER NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "special_requests" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "festival_bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "category" TEXT NOT NULL,
    "star_rating" INTEGER NOT NULL,
    "amenities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "price_per_night" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "contact_email" TEXT,
    "contact_phone" TEXT,
    "website" TEXT,
    "check_in_time" TEXT NOT NULL DEFAULT '14:00',
    "check_out_time" TEXT NOT NULL DEFAULT '11:00',
    "cancellation_policy" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hotels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotel_rooms" (
    "id" SERIAL NOT NULL,
    "hotel_id" INTEGER NOT NULL,
    "room_type" TEXT NOT NULL,
    "room_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "max_occupancy" INTEGER NOT NULL,
    "bed_type" TEXT NOT NULL,
    "room_size" TEXT,
    "amenities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "price_per_night" INTEGER NOT NULL,
    "total_rooms" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "hotel_rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotel_bookings" (
    "id" SERIAL NOT NULL,
    "hotel_id" INTEGER NOT NULL,
    "room_id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "check_in_date" DATE NOT NULL,
    "check_out_date" DATE NOT NULL,
    "number_of_rooms" INTEGER NOT NULL,
    "number_of_guests" INTEGER NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "special_requests" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "payment_status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hotel_bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_accounts" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT,
    "role" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "profile_image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login_at" TIMESTAMP(3),

    CONSTRAINT "user_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_feedbacks" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "itinerary_id" INTEGER,
    "tour_id" INTEGER,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "category" TEXT NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_accounts_email_key" ON "user_accounts"("email");

-- AddForeignKey
ALTER TABLE "festival_bookings" ADD CONSTRAINT "festival_bookings_festival_id_fkey" FOREIGN KEY ("festival_id") REFERENCES "festivals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel_rooms" ADD CONSTRAINT "hotel_rooms_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel_bookings" ADD CONSTRAINT "hotel_bookings_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel_bookings" ADD CONSTRAINT "hotel_bookings_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "hotel_rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_feedbacks" ADD CONSTRAINT "user_feedbacks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_feedbacks" ADD CONSTRAINT "user_feedbacks_itinerary_id_fkey" FOREIGN KEY ("itinerary_id") REFERENCES "itineraries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_feedbacks" ADD CONSTRAINT "user_feedbacks_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "tours"("id") ON DELETE SET NULL ON UPDATE CASCADE;
