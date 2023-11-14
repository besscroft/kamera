/*
 Date: 14/11/2023 00:30:17
*/

-- ----------------------------
-- Sequence structure for kamera_image_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."kamera_image_id_seq";
CREATE SEQUENCE "public"."kamera_image_id_seq"
    INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Table structure for kamera_image
-- ----------------------------
DROP TABLE IF EXISTS "public"."kamera_image";
CREATE TABLE "public"."kamera_image" (
    "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
     INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1
),
    "type" varchar COLLATE "pg_catalog"."default" NOT NULL DEFAULT ''::character varying,
    "url" text COLLATE "pg_catalog"."default" DEFAULT ''::text,
    "exif" json,
    "rating" int2 DEFAULT '0'::smallint,
    "detail" varchar COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
    "create_time" timestamp(6) DEFAULT now(),
    "update_time" timestamp(6),
    "del" int2 NOT NULL DEFAULT '0'::smallint
);
COMMENT ON COLUMN "public"."kamera_image"."type" IS '图片类型';
COMMENT ON COLUMN "public"."kamera_image"."url" IS '图片地址';
COMMENT ON COLUMN "public"."kamera_image"."exif" IS '图片 exif 信息';
COMMENT ON COLUMN "public"."kamera_image"."rating" IS '图片评分';
COMMENT ON COLUMN "public"."kamera_image"."detail" IS '图片描述';
COMMENT ON COLUMN "public"."kamera_image"."create_time" IS '创建时间';
COMMENT ON COLUMN "public"."kamera_image"."update_time" IS '更新时间';
COMMENT ON COLUMN "public"."kamera_image"."del" IS '逻辑删除：0->可用；1->删除';
COMMENT ON TABLE "public"."kamera_image" IS '图片信息表';

-- ----------------------------
-- Primary Key structure for table kamera_image
-- ----------------------------
ALTER TABLE "public"."kamera_image" ADD CONSTRAINT "kamera_image_pkey" PRIMARY KEY ("id");
