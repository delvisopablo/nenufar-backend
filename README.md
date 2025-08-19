# Nenúfar Backend

API backend del proyecto **Nenúfar**, construido con **NestJS**, **Prisma** y **PostgreSQL**. Preparado para despliegue en **Render**.

---

## 🧱 Stack

* **Node.js** (18+)
* **NestJS** (REST)
* **Prisma** (ORM)
* **PostgreSQL**
* **JWT** para autenticación

---

## ✅ Requisitos previos

* Node 18+ y npm o yarn
* PostgreSQL local (opcional para desarrollo)
* Cuenta en Render.com

---

## ⚙️ Variables de entorno

Crea un archivo `.env` en la raíz con:

```env
# Base de datos (local o Render)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public"

# JWT
JWT_SECRET="cambia-esto-por-un-secreto-largo"
JWT_EXPIRES_IN="1d" # opcional

# Entorno/app
NODE_ENV="development"
PORT=3000 # En Render, Render inyecta PORT automáticamente; el código debe usar process.env.PORT
```

> Asegúrate de **NO** commitear `.env`. Manténlo fuera del control de versiones.

---

## 🔧 Puesta en marcha local

```bash
# 1) Dependencias
npm ci # o npm install

# 2) Generar Prisma client
npx prisma generate

# 3) Crear migraciones (si aún no existen)
# crea una migración inicial a partir del schema.prisma
npx prisma migrate dev --name init

# 4) Levantar en desarrollo
npm run start:dev
```

Scripts típicos en `package.json` (ajusta si es necesario):

```json
{
  "scripts": {
    "start": "node dist/main.js",
    "start:dev": "nest start --watch",
    "build": "nest build",
    "prisma:generate": "prisma generate",
    "prisma:migrate:dev": "prisma migrate dev",
    "prisma:migrate:deploy": "prisma migrate deploy"
  }
}
```

---

## 🧪 Salud del servicio

* Asegura que **Nest** escucha en `process.env.PORT` si existe:

  ```ts
  // main.ts
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  await app.listen(port);
  ```
* (Opcional) expón un endpoint de **healthcheck**, por ejemplo `GET /health`:

  ```ts
  // app.controller.ts
  @Get('health')
  health() { return { ok: true }; }
  ```

---

## 🚀 Despliegue en Render (GUI)

1. **Crear Base de Datos** en Render: *New → PostgreSQL*.

   * Guarda el **Internal Database URL** (mejor para redes internas) o el **External** si lo necesitas.
2. **Crear Web Service**: *New → Web Service → Connect a repository* y elige este repo.
3. **Runtime**: Node 18+.
4. **Build Command**:

   ```bash
   npm ci && npm run build && npx prisma generate && npx prisma migrate deploy
   ```
5. **Start Command**:

   ```bash
   node dist/main.js
   ```
6. **Environment variables** en Render → *Environment*:

   * `DATABASE_URL` = (copiar de la DB de Render)
   * `JWT_SECRET` = un secreto largo
   * `NODE_ENV` = `production`
   * (Render establece `PORT` automáticamente; no lo definas)
7. **Health Check**: Path `/health` (o `/` si no tienes uno dedicado).
8. **Auto-Deploy**: activa *Auto-Deploy* desde `main`.

> **Migraciones**: `prisma migrate deploy` aplicará **las migraciones ya commiteadas**. Si no tienes migraciones en el repo, créalas localmente (`prisma migrate dev --name init`) y súbelas.

---

## 📦 Despliegue con `render.yaml` (IaC opcional)

Incluye un archivo `render.yaml` en la raíz y haz push. Render te permitirá crear todo desde ese manifiesto.

```yaml
services:
  - type: web
    name: nenufar-backend
    runtime: node
    repo: https://github.com/USUARIO/nenufar-backend
    branch: main
    buildCommand: |
      npm ci
      npm run build
      npx prisma generate
      npx prisma migrate deploy
    startCommand: node dist/main.js
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase: nenufar-db
        property: connectionString
      - key: JWT_SECRET
        generateValue: true
    healthCheckPath: /health

databases:
  - name: nenufar-db
    databaseName: nenufar
    plan: free
```

> Cambia `USUARIO` por tu usuario de GitHub. Puedes usar `fromDatabase` para inyectar la cadena de conexión automáticamente.

---

## 🧹 .gitignore recomendado

Crea un `.gitignore` (o añade estas líneas):

```gitignore
node_modules/
dist/
.env
coverage/
.tmp/
.prisma/
```

---

## 🐳 (Opcional) Docker local

```dockerfile
# Dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && npx prisma generate

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY prisma ./prisma
ENV NODE_ENV=production
CMD ["node", "dist/main.js"]
```

---

## 🐞 Troubleshooting rápido

* **`Repository not found` al hacer push**: revisa la URL de `origin` y permisos.
* **`non-fast-forward`**: `git pull --rebase origin main` o `git push --force-with-lease` si quieres forzar.
* **Render no levanta**:

  * Revisa *Logs* (Build & Runtime) en Render.
  * Verifica que `DATABASE_URL` está bien y accesible.
  * Asegura que el servicio escucha en `process.env.PORT`.
  * Asegura migraciones commiteadas; usa `npx prisma migrate deploy` en el build.

---

## 📜 Licencia

MIT (o la que decidas).
