ALTER TABLE "users" ADD COLUMN "token" text;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_token_unique" UNIQUE("token");