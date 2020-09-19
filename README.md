## Danilo Mourelle
<p align="justify">Atualmente um desenvolvedor Web Fullstack (NodeJS), tenho 3 anos de experiência em programação de robôs industriais, onde desenvolvi habilidade na área de programação de linguagens de alto nível e lógica de programação. Também fiz parte, por 4 anos, de um grupo de pesquisa científica em sistemas neurais com foco em memória, aprendizado e Doença de Alzheimer onde obtive familiaridade com documentações em lingua inglesa e a repetibilidade de protocolos pré-estabelecidos.</p>

**Canais de comunicação**:
- [LinkedIn](https://www.linkedin.com/in/danilomourelle/)
- [Github](https://github.com/danilomourelle)
- <danilomourelle@outlook.com>

# Challenge Back-end Provi

<br>
<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/danilomourelle/Provi-Backend">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/danilomourelle/Provi-Backend">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/danilomourelle/Provi-Backend">

  <a href="https://github.com/danilomourelle/Provi-Backend/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/danilomourelle/Provi-Backend">
  </a>
</p>
<br>

### Linguagens

* Typescript
* SQL

### Tecnologias/Ferramentas

* Git
* Typescript
* Node.js
* MVC
* Programação Orientada a Objeto
* MySQL
* Postman

### O que a plataforma é capaz de fazer :checkered_flag:

:trophy: Cadastro de cliente em banco de dados.

:trophy: Validar dados fornecidos como CPF e cruzamento entre CEP e Logradouro.

:trophy: Garantir uma sequencia de endpoints percorridos.

### Linguagens e libs utilizadas :books:

- [Typescript](https://www.typescriptlang.org/docs/home.html): versão 3.9.2
- [bcryptjs](https://github.com/kelektiv/node.bcrypt.js): versão 2.4.3 @types/2.4.2
- [dotenv](https://github.com/motdotla/dotenv): versão 8.2.0
- [express](https://expressjs.com/): versão 4.17.1 @types/4.17.6
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken): versão 8.5.1 @types/8.5.0
- [knex](http://knexjs.org/): versão 0.20.15 @types/0.16.1 
- [mysql](https://github.com/mysqljs/mysql): versão 2.18.1
- [uuid](https://github.com/uuidjs/uuid): versão 8.0.0 @types/7.0.3
- [jest](https://jestjs.io/): versão 26.1.0


### Como rodar a aplicação :arrow_forward:

No terminal, clone o projeto: 

```
git clone https://github.com/danilomourelle/Provi-Backend.git
```
Navegue para dentro da raiz do projeto
```
cd Provi-Backend
```
Instale as dependências
```
npm i
```
Crie um arquivo __.env__ com as configurações do seu banco de dados (preferencialmente MySQL, caso deseje utilizar outro, adaptações no código e dependências serão necessárias)
```
DB_HOST = seu_endereço_host
DB_USER = seu_usuário
DB_PASSWORD = sua_senha
DB_DATABASE_NAME = seu_banco_de_dados
JWT_KEY = chave_para_jwt
JWT_EXPIRE_TIME = tempo_expiração (exemplo: 120 minutes)
BCRYPT_COST = cost_encriptação (idealmente um valor minimo de 12)
```
Execute a aplicação
```
npm run start:dev
```
Você poderá utilizar os endpoints através de um cliente HTTP (ex. [Postman](https://www.postman.com/product/api-client/)) tendo o endereço [localhost:3003](http:localhost:3003) como URL base para as requisições. Para informações de cada endpoint disponível conferir a [documentação](https://documenter.getpostman.com/view/10578976/T1Dv7uKL?version=latest)



### ADICIONAL
#### Querys realizadas paras as criações de tabelas utilizando o MySQL Workbench

```SQL
-- Tabela do Usuário
CREATE TABLE User (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```
```SQL
-- Tabelas dos dados do Usuário
CREATE TABLE SKY_User (
  id VARCHAR(255) PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  data_criacao DATE NOT NULL,
  data_atualizacao DATE NOT NULL,
  ultimo_login DATE NOT NULL
);

CREATE TABLE SKY_PhoneNumber (
  id VARCHAR(255) PRIMARY KEY,
  phone_number VARCHAR(15) UNIQUE NOT NULL,
  phone_ddd VARCHAR(3) NOT NULL,
  data_criacao DATE NOT NULL,
  data_atualizacao DATE NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES SKY_User (id)
);

CREATE TABLE SKY_Token (
  id VARCHAR(255) PRIMARY KEY,
  token VARCHAR(255) UNIQUE NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  data_criacao DATE NOT NULL,
  data_atualizacao DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES SKY_User (id)
);
```
