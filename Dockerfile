FROM oven/bun:1.3.4-alpine AS base

WORKDIR /usr/src/app

# Build stage
FROM base AS build

ARG API_FOLDER

ENV HUSKY=0

WORKDIR /usr/src/app

RUN apk add upx

COPY . .

RUN bun install --frozen-lockfile --production --verbose --ignore-scripts

RUN bun build --compile --minify --sourcemap ${API_FOLDER} --outfile api.talentcrafter.io

RUN upx --all-methods --no-lzma api.talentcrafter.io

FROM gcr.io/distroless/base-debian12:nonroot AS release

ARG BUILD_APP_PORT=3000

ENV NODE_ENV=production
ENV APP_PORT=${BUILD_APP_PORT}

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/api.talentcrafter.io .

EXPOSE ${APP_PORT}

ENTRYPOINT ["./api.talentcrafter.io"]