-- DB Name: solo_project

-- Table Setup Below: 

CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(50) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL,
	"email" varchar(100) NOT NULL UNIQUE,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "events" (
	"id" serial NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" varchar(255),
	"event_category" serial NOT NULL,
	"image" varchar(400),
	"date_start" DATE NOT NULL,
	"date_end" DATE NOT NULL,
	"user_id" serial NOT NULL,
	CONSTRAINT "events_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "events_kits" (
	"id" serial NOT NULL,
	"event_id" serial NOT NULL,
	"kit_id" serial NOT NULL,
	"is_packed" BOOLEAN NOT NULL DEFAULT 'false',
	"user_id" serial NOT NULL,
	CONSTRAINT "events_kits_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "kits" (
	"id" serial NOT NULL,
	"name" varchar(50) NOT NULL UNIQUE,
	"description" varchar(255),
	"kit_category" serial NOT NULL,
	"event_category" serial NOT NULL,
	"image" varchar(400),
	"user_id" serial NOT NULL,
	CONSTRAINT "kits_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "items" (
	"id" serial NOT NULL,
	"name" varchar(50) NOT NULL,
	"is_packed" BOOLEAN NOT NULL DEFAULT 'false',
	"kit_id" serial NOT NULL,
	"user_id" serial NOT NULL,
	CONSTRAINT "items_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "event_categories" (
	"id" serial NOT NULL,
	"name" varchar(30) NOT NULL UNIQUE,
	CONSTRAINT "event_categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "kit_categories" (
	"id" serial NOT NULL,
	"name" varchar(30) NOT NULL UNIQUE,
	CONSTRAINT "kit_categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "events" ADD CONSTRAINT "events_fk0" FOREIGN KEY ("event_category") REFERENCES "event_categories"("id");
ALTER TABLE "events" ADD CONSTRAINT "events_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "events_kits" ADD CONSTRAINT "events_kits_fk0" FOREIGN KEY ("event_id") REFERENCES "events"("id");
ALTER TABLE "events_kits" ADD CONSTRAINT "events_kits_fk1" FOREIGN KEY ("kit_id") REFERENCES "kits"("id");
ALTER TABLE "events_kits" ADD CONSTRAINT "events_kits_fk2" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "kits" ADD CONSTRAINT "kits_fk0" FOREIGN KEY ("kit_category") REFERENCES "kit_categories"("id");
ALTER TABLE "kits" ADD CONSTRAINT "kits_fk1" FOREIGN KEY ("event_category") REFERENCES "event_categories"("id");
ALTER TABLE "kits" ADD CONSTRAINT "kits_fk2" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "items" ADD CONSTRAINT "items_fk0" FOREIGN KEY ("kit_id") REFERENCES "kits"("id");
ALTER TABLE "items" ADD CONSTRAINT "items_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");


-- Dummy Data Below: 

INSERT INTO "user" ("username", "password", "email")
VALUES ('ryan', '1234', 'rdmjobs@live.com');

INSERT INTO "event_categories" ("name")
VALUES ('All'), ('BBQ'), ('Camping'), ('Concert'), ('Convention'), ('Festival'), ('Holiday'), ('Weekend Away');

INSERT INTO "kit_categories" ("name")
VALUES ('Cosplay'), ('Outfit'), ('Cooking Gear'), ('Tent'), ('Bag'), ('Suitcase');

INSERT INTO "events" ("name", "description", "event_category", "date_start", "date_end", "user_id")
VALUES 
	('Washington Trip', 'Flying out to see friends', '8', '8/18/2021', '8/21/2021', '1'),
	('Dragon Con', 'Huge convention in downtown Atlanta', '5', '9/2/2021', '9/6/2021', '1'),
	('Electric Forest', 'The best festival in the world', '6', '6/22/2022', '6/27/2022', '1');
	
INSERT INTO "kits" ("name", "description", "kit_category", "event_category", "user_id")
VALUES
	('Power Ranger Wrestler', 'Cross-over group cosplay', '1', '4', '1'),
	('Street Fighter', 'Group cosplay', '1', '4', '1'),
	('Overnight Bag', 'Shower/Braces/etc.', '5', '1', '1');
	
INSERT INTO "items" ("name", "kit_id", "user_id")
VALUES
	('WR Hat', '1', '1'), ('WR Belt', '1', '1'), ('WR Socks', '1', '1'), ('WR Shirts', '1', '1'), ('White Shorts', '1', '1'), ('Yellow Shoes', '1', '1'), ('White Wristbands', '1', '1'), ('Aviators', '1', '1'),
	('Gi Top - Red', '2', '1'), ('Gi Pants - Red', '2', '1'), ('Black Belt', '2', '1'), ('MMA Gloves', '2', '1'), ('Hair Tie', '2', '1'), ('Black Shoes', '2', '1'), ('Black A-shape Tank Top', '2', '1');
	
INSERT INTO "events_kits" ("event_id", "kit_id", "user_id")
VALUES ('2', '1', '1'), ('2', '2', '1'), ('2', '3', '1');