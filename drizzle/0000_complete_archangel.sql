CREATE TABLE `posts` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`content` text,
	`owner_id` integer NOT NULL,
	`create_at` integer DEFAULT (datetime('now','localtime')),
	`update_at` integer,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`full_name` text,
	`create_at` integer DEFAULT (datetime('now','localtime')),
	`update_at` integer
);
