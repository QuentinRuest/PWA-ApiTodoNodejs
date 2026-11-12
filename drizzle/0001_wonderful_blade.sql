CREATE TABLE `users` (
	`id` varchar(36) NOT NULL,
	`email` varchar(100) NOT NULL,
	`password` varchar(200) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
