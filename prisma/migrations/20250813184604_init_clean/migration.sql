/*
  Warnings:

  - You are about to drop the column `fecha` on the `Logro` table. All the data in the column will be lost.
  - You are about to drop the column `valorUmbral` on the `Logro` table. All the data in the column will be lost.
  - You are about to drop the column `dueñoId` on the `Negocio` table. All the data in the column will be lost.
  - You are about to drop the column `rol` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `objetivoTipo` to the `Logro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recompensaPuntos` to the `Logro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `umbral` to the `Logro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duenoId` to the `Negocio` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Logro" DROP CONSTRAINT "Logro_negocioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Negocio" DROP CONSTRAINT "Negocio_dueñoId_fkey";

-- AlterTable
ALTER TABLE "public"."Logro" DROP COLUMN "fecha",
DROP COLUMN "valorUmbral",
ADD COLUMN     "objetivoId" INTEGER,
ADD COLUMN     "objetivoTipo" TEXT NOT NULL,
ADD COLUMN     "recompensaPuntos" INTEGER NOT NULL,
ADD COLUMN     "umbral" INTEGER NOT NULL,
ALTER COLUMN "negocioId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Negocio" DROP COLUMN "dueñoId",
ADD COLUMN     "duenoId" INTEGER NOT NULL,
ADD COLUMN     "subcategoriaId" INTEGER;

-- AlterTable
ALTER TABLE "public"."Usuario" DROP COLUMN "rol",
ADD COLUMN     "petalosSaldo" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."Subcategoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoriaId" INTEGER NOT NULL,

    CONSTRAINT "Subcategoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Post" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "titulo" TEXT,
    "contenido" TEXT,
    "usuarioId" INTEGER NOT NULL,
    "negocioId" INTEGER,
    "productoId" INTEGER,
    "puntuacion" INTEGER,
    "descuento" DOUBLE PRECISION,
    "fechaCaducidad" TIMESTAMP(3),
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Comentario" (
    "id" SERIAL NOT NULL,
    "contenido" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Like" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pedido" (
    "id" SERIAL NOT NULL,
    "negocioId" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PedidoProducto" (
    "id" SERIAL NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioUnitario" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PedidoProducto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Compra" (
    "id" SERIAL NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "estado" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "negocioId" INTEGER,

    CONSTRAINT "Compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pago" (
    "id" SERIAL NOT NULL,
    "compraId" INTEGER NOT NULL,
    "metodoPago" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cantidad" DOUBLE PRECISION NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" INTEGER,

    CONSTRAINT "Pago_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LogroUsuario" (
    "id" SERIAL NOT NULL,
    "logroId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "veces" INTEGER NOT NULL DEFAULT 0,
    "conseguido" BOOLEAN NOT NULL DEFAULT false,
    "conseguidoEn" TIMESTAMP(3),

    CONSTRAINT "LogroUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PetaloTx" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "delta" INTEGER NOT NULL,
    "motivo" TEXT NOT NULL,
    "refTipo" TEXT,
    "refId" INTEGER,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PetaloTx_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subcategoria_nombre_key" ON "public"."Subcategoria"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Like_usuarioId_postId_key" ON "public"."Like"("usuarioId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "PedidoProducto_pedidoId_productoId_key" ON "public"."PedidoProducto"("pedidoId", "productoId");

-- CreateIndex
CREATE UNIQUE INDEX "LogroUsuario_logroId_usuarioId_key" ON "public"."LogroUsuario"("logroId", "usuarioId");

-- CreateIndex
CREATE INDEX "PetaloTx_usuarioId_creadoEn_idx" ON "public"."PetaloTx"("usuarioId", "creadoEn");

-- CreateIndex
CREATE INDEX "PetaloTx_refTipo_refId_idx" ON "public"."PetaloTx"("refTipo", "refId");

-- AddForeignKey
ALTER TABLE "public"."Subcategoria" ADD CONSTRAINT "Subcategoria_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "public"."Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Negocio" ADD CONSTRAINT "Negocio_subcategoriaId_fkey" FOREIGN KEY ("subcategoriaId") REFERENCES "public"."Subcategoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Negocio" ADD CONSTRAINT "Negocio_duenoId_fkey" FOREIGN KEY ("duenoId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_negocioId_fkey" FOREIGN KEY ("negocioId") REFERENCES "public"."Negocio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "public"."Producto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comentario" ADD CONSTRAINT "Comentario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comentario" ADD CONSTRAINT "Comentario_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Like" ADD CONSTRAINT "Like_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Like" ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pedido" ADD CONSTRAINT "Pedido_negocioId_fkey" FOREIGN KEY ("negocioId") REFERENCES "public"."Negocio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PedidoProducto" ADD CONSTRAINT "PedidoProducto_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "public"."Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PedidoProducto" ADD CONSTRAINT "PedidoProducto_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "public"."Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Compra" ADD CONSTRAINT "Compra_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "public"."Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Compra" ADD CONSTRAINT "Compra_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Compra" ADD CONSTRAINT "Compra_negocioId_fkey" FOREIGN KEY ("negocioId") REFERENCES "public"."Negocio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pago" ADD CONSTRAINT "Pago_compraId_fkey" FOREIGN KEY ("compraId") REFERENCES "public"."Compra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pago" ADD CONSTRAINT "Pago_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Logro" ADD CONSTRAINT "Logro_negocioId_fkey" FOREIGN KEY ("negocioId") REFERENCES "public"."Negocio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LogroUsuario" ADD CONSTRAINT "LogroUsuario_logroId_fkey" FOREIGN KEY ("logroId") REFERENCES "public"."Logro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LogroUsuario" ADD CONSTRAINT "LogroUsuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PetaloTx" ADD CONSTRAINT "PetaloTx_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
