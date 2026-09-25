-- CreateEnum
CREATE TYPE "TextAlign" AS ENUM ('LEFT', 'CENTER');

-- AlterTable: existing draft rows get the MINIMAL style defaults; the defaults are dropped so new rows must set them.
ALTER TABLE "Business"
ADD COLUMN "boldHeadings" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "textAlign" "TextAlign" NOT NULL DEFAULT 'LEFT';

ALTER TABLE "Business"
ALTER COLUMN "boldHeadings" DROP DEFAULT,
ALTER COLUMN "textAlign" DROP DEFAULT;
