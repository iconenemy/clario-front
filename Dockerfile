
# DEVELOPMENT STAGE
FROM node:22-alpine as development

WORKDIR /usr/app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm fetch

COPY . .

RUN pnpm install

# BUILD STAGE
FROM node:22-alpine as build

WORKDIR /usr/app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

COPY --from=development /usr/app/node_modules ./node_modules

COPY . .

RUN pnpm build
RUN pnpm install --prod

# PRODUCTION STAGE
FROM node:22-alpine as production

COPY --from=build /usr/app/.next/standalone ./
COPY --from=build /usr/app/.next/static ./.next/static
COPY --from=build /usr/app/node_modules ./node_modules

CMD ["node", "server.js"]
