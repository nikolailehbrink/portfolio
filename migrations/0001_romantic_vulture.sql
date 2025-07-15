CREATE TABLE `postCounter` (
	`slug` text PRIMARY KEY NOT NULL,
	`views` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `postCounter_slug_unique` ON `postCounter` (`slug`);--> statement-breakpoint
DROP TABLE `foo`;