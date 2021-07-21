-- DB Name: solo_project

-- Table Setup Below: 

CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(50) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL,
	"email" varchar(100) UNIQUE,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "events" (
	"id" serial NOT NULL,
	"event_name" varchar(50) NOT NULL,
	"event_description" varchar(255),
	"event_category" serial NOT NULL,
	"event_image" varchar(400),
	"date_start" DATE NOT NULL,
	"date_end" DATE NOT NULL,
	"user_id" serial NOT NULL,
	CONSTRAINT "events_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "kits" (
	"id" serial NOT NULL,
	"kit_name" varchar(50) NOT NULL UNIQUE,
	"kit_description" varchar(255),
	"kit_category" serial NOT NULL,
	"event_category" serial NOT NULL,
	"image" varchar(400),
	"user_id" serial NOT NULL,
	CONSTRAINT "kits_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "events_kits" (
	"id" serial NOT NULL,
	"event_id" serial NOT NULL,
	"kit_id" serial NOT NULL,
	"kit_is_packed" BOOLEAN NOT NULL DEFAULT 'false',
	"user_id" serial NOT NULL,
	CONSTRAINT "events_kits_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "items" (
	"id" serial NOT NULL,
	"item_name" varchar(50) NOT NULL,
	"item_is_packed" BOOLEAN NOT NULL DEFAULT 'false',
	"kit_id" serial NOT NULL,
	"user_id" serial NOT NULL,
	CONSTRAINT "items_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "event_categories" (
	"id" serial NOT NULL,
	"event_cat_name" varchar(30) NOT NULL UNIQUE,
	CONSTRAINT "event_categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "kit_categories" (
	"id" serial NOT NULL,
	"kit_cat_name" varchar(30) NOT NULL UNIQUE,
	CONSTRAINT "kit_categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "events" ADD CONSTRAINT "events_fk0" FOREIGN KEY ("event_category") REFERENCES "event_categories"("id");
ALTER TABLE "events" ADD CONSTRAINT "events_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "events_kits" ADD CONSTRAINT "events_kits_fk0" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE;
ALTER TABLE "events_kits" ADD CONSTRAINT "events_kits_fk1" FOREIGN KEY ("kit_id") REFERENCES "kits"("id") ON DELETE CASCADE;
ALTER TABLE "events_kits" ADD CONSTRAINT "events_kits_fk2" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "kits" ADD CONSTRAINT "kits_fk0" FOREIGN KEY ("kit_category") REFERENCES "kit_categories"("id");
ALTER TABLE "kits" ADD CONSTRAINT "kits_fk1" FOREIGN KEY ("event_category") REFERENCES "event_categories"("id");
ALTER TABLE "kits" ADD CONSTRAINT "kits_fk2" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "items" ADD CONSTRAINT "items_fk0" FOREIGN KEY ("kit_id") REFERENCES "kits"("id") ON DELETE CASCADE;
ALTER TABLE "items" ADD CONSTRAINT "items_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");
