/*
  Warnings:

  - You are about to drop the column `negocioId` on the `Compra` table. All the data in the column will be lost.
  - The `estado` column on the `Compra` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `objetivoId` on the `Logro` table. All the data in the column will be lost.
  - You are about to drop the column `objetivoTipo` on the `Logro` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Pago` table. All the data in the column will be lost.
  - The `estado` column on the `Pago` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `estado` column on the `Pedido` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `contenido` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `descuento` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `fechaCaducidad` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `productoId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `puntuacion` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `Usuario` table. All the data in the column will be lost.
  - Changed the type of `tipo` on the `Logro` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `metodoPago` on the `Pago` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."PedidoEstado" AS ENUM ('PENDIENTE', 'COMPLETADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "public"."CompraEstado" AS ENUM ('PENDIENTE', 'COMPLETADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "public"."PagoEstado" AS ENUM ('PENDIENTE', 'PAGADO', 'FALLIDO');

-- CreateEnum
CREATE TYPE "public"."MetodoPago" AS ENUM ('TARJETA', 'BIZUM', 'EFECTIVO', 'STRIPE', 'OTRO');

-- CreateEnum
CREATE TYPE "public"."LogroTipo" AS ENUM ('COMPRA', 'RESENA', 'PROMOCION', 'RESERVA', 'OTRO');

-- CreateEnum
CREATE TYPE "public"."Dificultad" AS ENUM ('FACIL', 'MEDIA', 'DURA', 'LEGENDARIA');

-- DropForeignKey
ALTER TABLE "public"."Compra" DROP CONSTRAINT "Compra_negocioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Pago" DROP CONSTRAINT "Pago_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_productoId_fkey";

-- AlterTable
ALTER TABLE "public"."Compra" DROP COLUMN "negocioId",
DROP COLUMN "estado",
ADD COLUMN     "estado" "public"."CompraEstado" NOT NULL DEFAULT 'PENDIENTE';

-- AlterTable
ALTER TABLE "public"."Logro" DROP COLUMN "objetivoId",
DROP COLUMN "objetivoTipo",
ADD COLUMN     "categoriaId" INTEGER,
ADD COLUMN     "dificultad" "public"."Dificultad" NOT NULL DEFAULT 'FACIL',
ADD COLUMN     "productoId" INTEGER,
ADD COLUMN     "subcategoriaId" INTEGER,
DROP COLUMN "tipo",
ADD COLUMN     "tipo" "public"."LogroTipo" NOT NULL;

-- AlterTable
ALTER TABLE "public"."Pago" DROP COLUMN "usuarioId",
DROP COLUMN "metodoPago",
ADD COLUMN     "metodoPago" "public"."MetodoPago" NOT NULL,
DROP COLUMN "estado",
ADD COLUMN     "estado" "public"."PagoEstado" NOT NULL DEFAULT 'PENDIENTE';

-- AlterTable
ALTER TABLE "public"."Pedido" DROP COLUMN "estado",
ADD COLUMN     "estado" "public"."PedidoEstado" NOT NULL DEFAULT 'PENDIENTE';

-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "contenido",
DROP COLUMN "descuento",
DROP COLUMN "fechaCaducidad",
DROP COLUMN "productoId",
DROP COLUMN "puntuacion",
DROP COLUMN "tipo",
DROP COLUMN "titulo",
ADD COLUMN     "logroId" INTEGER,
ADD COLUMN     "promocionId" INTEGER,
ADD COLUMN     "resenaId" INTEGER;

-- AlterTable
ALTER TABLE "public"."Usuario" DROP COLUMN "bio";

-- CreateIndex
CREATE INDEX "Comentario_postId_idx" ON "public"."Comentario"("postId");

-- CreateIndex
CREATE INDEX "Comentario_usuarioId_idx" ON "public"."Comentario"("usuarioId");

-- CreateIndex
CREATE INDEX "Compra_pedidoId_idx" ON "public"."Compra"("pedidoId");

-- CreateIndex
CREATE INDEX "Compra_usuarioId_idx" ON "public"."Compra"("usuarioId");

-- CreateIndex
CREATE INDEX "Like_postId_idx" ON "public"."Like"("postId");

-- CreateIndex
CREATE INDEX "Logro_categoriaId_idx" ON "public"."Logro"("categoriaId");

-- CreateIndex
CREATE INDEX "Logro_subcategoriaId_idx" ON "public"."Logro"("subcategoriaId");

-- CreateIndex
CREATE INDEX "Logro_negocioId_idx" ON "public"."Logro"("negocioId");

-- CreateIndex
CREATE INDEX "Logro_productoId_idx" ON "public"."Logro"("productoId");

-- CreateIndex
CREATE INDEX "LogroUsuario_usuarioId_idx" ON "public"."LogroUsuario"("usuarioId");

-- CreateIndex
CREATE INDEX "Negocio_categoriaId_idx" ON "public"."Negocio"("categoriaId");

-- CreateIndex
CREATE INDEX "Negocio_subcategoriaId_idx" ON "public"."Negocio"("subcategoriaId");

-- CreateIndex
CREATE INDEX "Negocio_duenoId_idx" ON "public"."Negocio"("duenoId");

-- CreateIndex
CREATE INDEX "Pago_compraId_idx" ON "public"."Pago"("compraId");

-- CreateIndex
CREATE INDEX "Pedido_negocioId_idx" ON "public"."Pedido"("negocioId");

-- CreateIndex
CREATE INDEX "PedidoProducto_pedidoId_idx" ON "public"."PedidoProducto"("pedidoId");

-- CreateIndex
CREATE INDEX "PedidoProducto_productoId_idx" ON "public"."PedidoProducto"("productoId");

-- CreateIndex
CREATE INDEX "Post_creadoEn_idx" ON "public"."Post"("creadoEn");

-- CreateIndex
CREATE INDEX "Post_usuarioId_idx" ON "public"."Post"("usuarioId");

-- CreateIndex
CREATE INDEX "Post_negocioId_idx" ON "public"."Post"("negocioId");

-- CreateIndex
CREATE INDEX "Post_resenaId_idx" ON "public"."Post"("resenaId");

-- CreateIndex
CREATE INDEX "Post_promocionId_idx" ON "public"."Post"("promocionId");

-- CreateIndex
CREATE INDEX "Post_logroId_idx" ON "public"."Post"("logroId");

-- CreateIndex
CREATE INDEX "Producto_negocioId_idx" ON "public"."Producto"("negocioId");

-- CreateIndex
CREATE INDEX "Promocion_negocioId_idx" ON "public"."Promocion"("negocioId");

-- CreateIndex
CREATE INDEX "Promocion_productoId_idx" ON "public"."Promocion"("productoId");

-- CreateIndex
CREATE INDEX "Promocion_fechaCaducidad_idx" ON "public"."Promocion"("fechaCaducidad");

-- CreateIndex
CREATE INDEX "Resena_negocioId_idx" ON "public"."Resena"("negocioId");

-- CreateIndex
CREATE INDEX "Resena_usuarioId_idx" ON "public"."Resena"("usuarioId");

-- CreateIndex
CREATE INDEX "Resena_creadoEn_idx" ON "public"."Resena"("creadoEn");

-- CreateIndex
CREATE INDEX "Reserva_negocioId_idx" ON "public"."Reserva"("negocioId");

-- CreateIndex
CREATE INDEX "Reserva_usuarioId_idx" ON "public"."Reserva"("usuarioId");

-- CreateIndex
CREATE INDEX "Reserva_fecha_idx" ON "public"."Reserva"("fecha");

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_resenaId_fkey" FOREIGN KEY ("resenaId") REFERENCES "public"."Resena"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_promocionId_fkey" FOREIGN KEY ("promocionId") REFERENCES "public"."Promocion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_logroId_fkey" FOREIGN KEY ("logroId") REFERENCES "public"."Logro"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Logro" ADD CONSTRAINT "Logro_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "public"."Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Logro" ADD CONSTRAINT "Logro_subcategoriaId_fkey" FOREIGN KEY ("subcategoriaId") REFERENCES "public"."Subcategoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Logro" ADD CONSTRAINT "Logro_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "public"."Producto"("id") ON DELETE SET NULL ON UPDATE CASCADE;
