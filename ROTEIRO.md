# Roteiro
Esse roteiro foi criado com o intuito de facilitar o entendimento do desenvolvimento do projeto. Ele contém os principais comandos utilizados e alguns snippets.

### 1. Criando a estrutura básica
  - Utilizando a CLI do nest, criamos a estrutura básica do projeto:
    ```bash
    nest g module users
    nest g controller users
    nest g service users
    nest generate module transactions
    nest generate controller transactions/transactions --flat
    ```

  - criar rotas básicas no controller
    ```ts
    @Get()
    listBillets() {}

    @Post()
    createBillet(@Body() body: any) {
      console.log(body);
    }

    @Get('/:id')
    getBillet(@Param('id') id: string) {
      console.log(id);
    }
    ```
  
### 2. Adicionando validações
  - Pipe de validação (`main.ts`)
    ```ts
    app.useGlobalPipes(new ValidationPipe());
    ```

  - Criar DTO para a validação (src/transactions/dtos/create-transaction.dto.ts)
    ```ts
    import { IsString } from 'class-validator'

    export class CreateBilletDto {
      billet: string;
      amount: string;
    }
    ```

  - Instalar as bibliotecas `class-validator` e `class-transformer`
    ```bash
    npm install class-validator class-transformer
    ```

  - Importar o DTO no `UsersController` para usar no método Post.
  
### 3. Implementação do BD

  - Como vamos trabalhar com estruturas de dados simples e bem definidas, vamos usar TypeORM e SQLite, migrando posteriormente para o Postgres. O SQLite é muito leve e simples de usar/implementar e, principalmente, de testar. Considerando que eu não sabia exatamente quanto tempo eu teria para entregar o projeto, optei por começar com ele e migrar para o Postgres, que é mais robusto, se houvesse tempo;
    ```bash
    npm install @nestjs/typeorm typeorm sqlite3
    ```
    
  - Importar o módulo typeorm no AppModule, inserindo algumas configurações
    ```ts
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'willbank-db.sqlite',
      entities: [],
      synchronize: true => essa opção permite que alterações nas tabelas do bd sejam atualizadas automaticamente
    })
    ```
    
  - Criar entidades e repositórios
    - Utilizar os decorators do TypeORM para criar as entidades;
    - Em cada módulo, acrescentar 
      ```ts
      [TypeOrmModule.forFeature([<nome-da-entidade>])]
      ```
    - No AppModule, importar as entidades na configuração que criamos
      ```ts
      TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'db.sqlite',
          entities: [User, Billet],
          synchronize: true, 
        })
      ```

### 4.  Implementando cadastro e login de usuários

- Criar um CreateUserDto para validar os dados recebidos e também para fazer a comunicação com o BD;
- Injetar o Repository TypeORM no service do User:
  ```ts
  constructor(@InjectRepository(User) private repository: Repository<User>) {}
  ``` 
- Injetar o service no controller
    ```
  constructor(private usersService: UsersService) {}
    ```

- Criar métodos para listar e criar usuários no service
	
### 5. Adicionar autenticação
- Criar AuthService.
- No momento do cadastro é necessário verificar se o e-mail está em uso:
  ```ts
    const users = await this.usersService.findByEmail(email);
    if (users.length) {
      throw new BadRequestException('Este e-mail já está em uso')
    }
    ```

- Também precisamos encriptar a senha do usuário, que ainda está exposta no BD. Vamos criptografar a senha seguindo a documentação do framework: https://docs.nestjs.com/security/encryption-and-hashing
  ```ts
  const salt = randomBytes(8).toString('hex');
  const key = (await promisify(scrypt)(password, salt, 32)) as Buffer;

  const result = salt + '.' + key.toString('hex');
  ```
  
- No login: Desencriptar o password separando o salt da senha em si:
  ```ts
  const [salt, hash] = user.password.split('.');
    ```

### 4. Utilizando cookies para identificar o usuário logado
- Implementar sessions utilizando cookies https://docs.nestjs.com/techniques/session

- Criar decorator @CurrentUser

### 5. Testes unitários e de integração
- Testes para o AuthService: `npm run test:watch`

- Testes para o UsersController

- Testes de integração (e2e): npm run test:e2e
		
### 6. CRUD boletos
- Criar um service e, usando axios, receber como resposta um transactionId
- Update no boleto quando receber a transaction Id
- Lógica cashback

### 7. Últimas configurações
- Ajustes para utilizar Postgres
- Dockerização
- Alterar módulo 'billets' para 'transactions'
- Separar DBs teste x development
	- Configurar dotenv
    ```bash
    npm install @nestjs/config
    npm install cross-env
    ```