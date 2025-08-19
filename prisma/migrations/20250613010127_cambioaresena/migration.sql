/*
  Warnings:

  - You are about to drop the `Reseña` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reseña" DROP CONSTRAINT "Reseña_negocioId_fkey";

-- DropForeignKey
ALTER TABLE "Reseña" DROP CONSTRAINT "Reseña_usuarioId_fkey";

-- DropTable
DROP TABLE "Reseña";

-- CreateTable
CREATE TABLE "Resena" (
    "id" SERIAL NOT NULL,
    "contenido" TEXT NOT NULL,
    "puntuacion" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "negocioId" INTEGER NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resena_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Resena" ADD CONSTRAINT "Resena_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resena" ADD CONSTRAINT "Resena_negocioId_fkey" FOREIGN KEY ("negocioId") REFERENCES "Negocio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
