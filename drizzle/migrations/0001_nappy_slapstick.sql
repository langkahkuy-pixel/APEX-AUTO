ALTER TABLE "cars" ADD COLUMN "depreciation_sgd" numeric(12, 2);--> statement-breakpoint
ALTER TABLE "cars" ADD COLUMN "coe_expiry" varchar(100);--> statement-breakpoint
ALTER TABLE "cars" ADD COLUMN "engine_capacity_cc" integer;--> statement-breakpoint
ALTER TABLE "cars" ADD COLUMN "monthly_est_sgd" numeric(12, 2);