ALTER TABLE "cars" ALTER COLUMN "price" SET DATA TYPE numeric(15, 2);--> statement-breakpoint
ALTER TABLE "cars" ADD COLUMN "annual_tax_idr" numeric(15, 0);--> statement-breakpoint
ALTER TABLE "cars" ADD COLUMN "tax_expiry" varchar(100);--> statement-breakpoint
ALTER TABLE "cars" ADD COLUMN "plate_number" varchar(50);--> statement-breakpoint
ALTER TABLE "cars" ADD COLUMN "document_status" varchar(255);--> statement-breakpoint
ALTER TABLE "cars" ADD COLUMN "owners" integer;--> statement-breakpoint
-- Preserve the meaning of existing prices; new demo seed rows use IDR.
ALTER TABLE "cars" ADD COLUMN "currency" varchar(3) DEFAULT 'SGD';--> statement-breakpoint
ALTER TABLE "cars" ALTER COLUMN "currency" SET DEFAULT 'IDR';--> statement-breakpoint
ALTER TABLE "cars" ADD COLUMN "monthly_est_idr" numeric(15, 0);--> statement-breakpoint
ALTER TABLE "promos" ADD COLUMN "discount_idr" numeric(15, 0);
