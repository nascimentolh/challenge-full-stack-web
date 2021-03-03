<h1 align="center">Grupo A Challenge Full Stack</h1>

<div align="center">
  <p align="center">
    <a href="#sobre-information_source">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#tecnologias-computer">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#como-iniciar-rocket">Como Iniciar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  </p>
</div>

## Sobre :information_source:

## Front

Front-end foi feito utilizando um padrão de projeto padrão pelos usuários na internet, e com base no que já tive vivência.

### Melhoras:

1. Design mais atrativo e sofsticado utilizando as personalizações presente na [Vuetifyjs](https://vuetifyjs.com/en/)
2. Melhora no sistema de autenticação (Dado que eu fiz o mesmo sem necessidade :scream:)
3. Melhora na responsividade como um todo.
4. Implementar o CI/CD e realizar o deploy

## Back

Back-end foi construido utilizando uma arquitetura de microserviços mais independente, sem utilizar regras de dominio ou principios de solid, basicamente funcional, sem classes. (Estudos recentes de Elixir podem ter pesado fortemente na decisão :open_mouth:)

### Melhoras:

1. Uma camada de dados mais persistente.
2. Mais validações referente as requisições de dados.
3. Uma corbetura maior de testes.
4. Utilizar SOLID.
5. Ter implementado as interfaces e repositórios na camada de dados para poder facilitar o trabalho caso fosse necessário trocar de ORM no futuro.
6. Implementar o CI/CD e realizar o deploy

### Observações:

O tempo para execução do desafio é bem bom, porem, eu tive problemas de saude :mask:

## Tecnologias :computer:

- **VueJS**
- **Vuetifyjs**
- **VueACL**
- **Axios**
- **ESLint, Prettier**
- **NodeJS**
- **Typescript**
- **TypeORM**
- **Jest**

## Como Iniciar :rocket:

OBS: É Necessario ter o [NodeJS](https://nodejs.org/en/) e o [PostgreSQL]() instalado para poder prosseguir.

### Rode os testes

1. Execute `npm install` para instalar as dependencias do projeto
2. Execute `npm run test` para rodar todos os testes implementados

**Obs:** Os testes foram implementados somente no backend :confused:

### Iniciar a aplicação Backend

### Iniciando localmente:

1. Execute `npm install` para instalar as dependencias do backend. (Caso você tenha feito a etapa dos testes não será necessário)
2. Edite o arquivo `ormconfig.json` configurando o banco de dados de acordo com suas configurações locais.
3. Execute `npm run watch-node` para iniciar a aplicação em modo de Desenvolvimento.
4. Execute `npm run migration:run` para popular o banco com usuário default (email: admin@grupoa.com.br, password: 123456)
5. Apartir de agora tua API está disponivel para realizar as requisições

### Iniciar a aplicação Frontend

### Inciando localmente:

1. Execute `npm install` para instalar as dependencias do frontend.
2. Execute `npm run serve` para inciar a aplicação em modo de Desenvolvimento
3. Sua aplicação estára disponivel na [URL](http://127.0.0.1:8080)
4. Você poderá logar-se com usuário criado no passo 4 da incialização do backend.
