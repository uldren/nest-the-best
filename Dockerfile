# Сборка проекта в режиме development
FROM node:16.15.0 as development
ENV NODE_ENV=development
WORKDIR /backend
COPY package*.json ./
RUN npm i
COPY . .

# Сборка проекта
FROM node:16.15.0 as build
WORKDIR /backend
COPY package*.json ./
COPY .env.* ./
COPY --from=development /backend/node_modules ./node_modules
COPY . .
RUN npm run build
ENV NODE_ENV=production
RUN npm i --omit=dev && npm cache clean --force

# Для тестов
FROM development as test
COPY package*.json ./
COPY --from=development /backend/node_modules ./node_modules
COPY . .
CMD [ "npm", "run", "test" ]

# Для проверки синтаксиса
FROM development as lint
COPY package*.json ./
COPY --from=development /backend/node_modules ./node_modules
COPY . .
CMD [ "npm", "run", "format" ]

# Сборка проекта в режиме production
FROM node:16.15.0 as production
WORKDIR /backend
ENV NODE_ENV=production
COPY --from=build /backend/node_modules ./node_modules
COPY --from=build /backend/dist ./dist
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
