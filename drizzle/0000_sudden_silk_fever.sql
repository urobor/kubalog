CREATE TABLE `blog_settings` (
	`id` integer PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `entries` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`summary` text NOT NULL,
	`content` text NOT NULL,
	`topic` text NOT NULL,
	`date` text NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`created_at` text NOT NULL
);
