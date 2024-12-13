FROM denoland/deno:2.1.4

EXPOSE 8000

WORKDIR /app

USER deno

COPY . .

RUN deno cache src/main.ts

CMD ["task","start"]
