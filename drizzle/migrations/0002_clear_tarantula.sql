CREATE TABLE "inquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"car_id" uuid,
	"name" varchar(255) NOT NULL,
	"contact" varchar(255) NOT NULL,
	"interest" varchar(255),
	"message" text NOT NULL,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"assigned_to" uuid,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_car_id_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."cars"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_assigned_to_users_id_fk" FOREIGN KEY ("assigned_to") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;