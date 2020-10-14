-- Adminer 4.7.7 PostgreSQL dump

DROP TABLE IF EXISTS "item";
DROP SEQUENCE IF EXISTS item_id_seq;
CREATE SEQUENCE item_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."item" (
    "id" integer DEFAULT nextval('item_id_seq') NOT NULL,
    "name" text NOT NULL,
    "created_at" timestamp NOT NULL,
    "modified_at" timestamp NOT NULL,
    "done" boolean DEFAULT false NOT NULL,
    "list_id" integer NOT NULL,
    CONSTRAINT "item_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "fk_item" FOREIGN KEY (list_id) REFERENCES list(id) NOT DEFERRABLE
) WITH (oids = false);

INSERT INTO "item" ("id", "name", "created_at", "modified_at", "done", "list_id") VALUES
(12,	'tomates',	'2020-10-13 12:36:05.438322',	'2020-10-13 12:36:05.438322',	'0',	1),
(13,	'cerise',	'2020-10-13 12:37:33.832957',	'2020-10-13 12:37:33.832957',	'0',	1),
(15,	'banane',	'2020-10-13 13:29:48.602701',	'2020-10-13 13:29:48.602701',	'0',	2),
(14,	'faire a manger',	'2020-10-13 12:41:58.622726',	'2020-10-13 13:54:02.310294',	'0',	2),
(16,	'sortir le chien',	'2020-10-13 13:56:21.390953',	'2020-10-13 13:56:21.390953',	'0',	2),
(17,	'netoyer le garage',	'2020-10-13 14:29:28.853141',	'2020-10-13 14:29:28.853141',	'0',	2),
(18,	'passer la serpillére',	'2020-10-13 14:40:15.775765',	'2020-10-13 14:40:15.775765',	'0',	2),
(19,	'sortir le chien',	'2020-10-13 14:41:57.261663',	'2020-10-13 14:41:57.261663',	'0',	2),
(24,	'donner a manger au chat',	'2020-10-13 14:53:56.666276',	'2020-10-13 14:53:56.666276',	'0',	2);

DROP TABLE IF EXISTS "list";
DROP SEQUENCE IF EXISTS "List_id_seq";
CREATE SEQUENCE "List_id_seq" INCREMENT  MINVALUE  MAXVALUE  START 1 CACHE ;

CREATE TABLE "public"."list" (
    "id" integer DEFAULT nextval('"List_id_seq"') NOT NULL,
    "title" text NOT NULL,
    "created_at" timestamp NOT NULL,
    "modified_at" timestamp NOT NULL,
    CONSTRAINT "list_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "list" ("id", "title", "created_at", "modified_at") VALUES
(1,	'courses',	'2020-10-13 12:32:47.100141',	'2020-10-13 12:32:47.100141'),
(2,	'tasks',	'2020-10-13 12:40:59.767959',	'2020-10-13 14:53:56.686269');

DROP VIEW IF EXISTS "view_list";
CREATE TABLE "view_list" ("id" integer, "title" text, "created_at" timestamp, "modified_at" timestamp, "nb_item" bigint);


DROP TABLE IF EXISTS "view_list";
CREATE VIEW "view_list" AS SELECT list.id,
    list.title,
    list.created_at,
    list.modified_at,
    ( SELECT count(*) AS nb_item
           FROM item
          WHERE (list.id = item.list_id)) AS nb_item
   FROM list;

-- 2020-10-14 07:44:58.966277+00
