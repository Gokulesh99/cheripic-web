-- CheriPic Partner — database schema
-- Import this once on your server (phpMyAdmin → Import, or `mysql -u USER -p DBNAME < db.sql`)

CREATE TABLE IF NOT EXISTS `partner_applications` (
  `id`            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `business_name` VARCHAR(255)  NOT NULL,
  `contact_name`  VARCHAR(255)  NOT NULL,
  `email`         VARCHAR(255)  NOT NULL,
  `website`       VARCHAR(255)  DEFAULT NULL,
  `category`      VARCHAR(150)  NOT NULL,
  `city`          VARCHAR(150)  NOT NULL,
  `about`         TEXT          NOT NULL,
  `status`        VARCHAR(20)   NOT NULL DEFAULT 'new',
  `ip_address`    VARCHAR(45)   DEFAULT NULL,
  `created_at`    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_email` (`email`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
