# Will-Backend


## Ferramentas
- [NestJS](https://github.com/nestjs/nest)
- [Docker](https://github.com/docker)
- [Postgres](https://github.com/postgres)
  
## Bibliotecas
- [Class-validator](https://github.com/typestack/class-validator)
- [Class-transformer](https://github.com/typestack/class-transformer)
- [Express](https://github.com/expressjs/express)
- [Express-Session](https://github.com/expressjs/session)
- [TypeORM](https://github.com/typeorm/typeorm)
- [Axios](https://github.com/axios/axios/)
## Setup

### Utilizando docker
```
$ docker compose up
```
### Sem docker
Em `app.module.ts:25` substituir '`postgres`' por '`localhost`'

```ts
// host: 'postgres',
host: 'localhost',
```

No console, digitar uma das opções:
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Rotas
As rotas disponíveis podem ser consultadas via Postman: https://documenter.getpostman.com/view/17815727/VUjTihsy
## Por que essas tecnologias?

- O NestJS é um framework com uma usabilidade fácil e uma documentação muito didática. É perfeito para desenvolver APIs e consumir/disponibilizar endpoints utilizando o padrão REST.
- O Docker facilita o build do projeto em qualquer máquina, padronizando as configurações.
- Considerando que trabalhamos nesse projeto com dados simples e tabelas estruturadas, o uso de um SGBD SQL foi o mais indicado. Utilizamos SQLite no início do projeto, pois é muito fácil de implementar e, principalmente, de testar. Ao final do projeto migramos para o Postgres, que é mais robusto e, em casos de apps que vão para o ambiente de produção, mais seguro. TypeORM foi a biblioteca escolhida para realizar o mapeamento objeto-relaciona.

## Roteiro

Acesse o roteiro com a metodologia utilizada para o desenvolvimento [clicando aqui](https://github.com/majutre/will-backend/blob/master/ROTEIRO.md)