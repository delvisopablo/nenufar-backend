/*
  Warnings:

  - You are about to drop the column `activo` on the `Promocion` table. All the data in the column will be lost.
  - Added the required column `descuento` to the `Promocion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaCaducidad` to the `Promocion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Promocion" DROP COLUMN "activo",
ADD COLUMN     "descuento" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fechaCaducidad" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "productoId" INTEGER;

-- CreateTable
CREATE TABLE "_PromocionPack" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PromocionPack_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PromocionPack_B_index" ON "_PromocionPack"("B");

-- AddForeignKey
ALTER TABLE "Promocion" ADD CONSTRAINT "Promocion_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PromocionPack" ADD CONSTRAINT "_PromocionPack_A_fkey" FOREIGN KEY ("A") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PromocionPack" ADD CONSTRAINT "_PromocionPack_B_fkey" FOREIGN KEY ("B") REFERENCES "Promocion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
