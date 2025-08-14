# Front-MFO

Este projeto é uma aplicação web desenvolvida com Next.js. Este README fornece instruções sobre como configurar e executar o projeto usando Docker.

## Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Como Rodar o Projeto com Docker

Siga os passos abaixo para construir a imagem Docker e executar o contêiner da aplicação.

### 1. Navegar até o Diretório do Projeto

Abra seu terminal e navegue até o diretório raiz do projeto `Front-MFO-main` onde o `Dockerfile` e o `package.json` estão localizados:

```bash
cd /caminho/para/Front-MFO-main
```

### 2. Construir a Imagem Docker

Execute o seguinte comando para construir a imagem Docker. Este processo pode levar alguns minutos, pois ele instalará as dependências e construirá a aplicação Next.js.

```bash
docker build -t front-mfo .
```

- `docker build`: Comando para construir uma imagem Docker.
- `-t front-mfo`: Atribui a tag `front-mfo` à imagem, facilitando sua identificação.
- `.`: Indica que o `Dockerfile` está no diretório atual.

### 3. Executar o Contêiner Docker

Após a imagem ser construída com sucesso, você pode executar o contêiner usando o seguinte comando:

```bash
docker run -p 3000:3000 front-mfo
```

- `docker run`: Comando para executar um contêiner a partir de uma imagem.
- `-p 3000:3000`: Mapeia a porta 3000 do seu host para a porta 3000 do contêiner. A aplicação Next.js será acessível via `http://localhost:3000`.
- `front-mfo`: O nome da imagem Docker que você construiu no passo anterior.

### 4. Acessar a Aplicação

Uma vez que o contêiner esteja em execução, abra seu navegador e acesse:

```
http://localhost:3000
```

Você deverá ver a aplicação Front-MFO em funcionamento.

## Parar o Contêiner

Para parar o contêiner em execução, pressione `Ctrl+C` no terminal onde o contêiner está rodando. Se você o executou em segundo plano, pode usar:

```bash
docker ps
```

Para encontrar o ID do contêiner e depois:

```bash
docker stop <ID_DO_CONTÊINER>
```

## Desenvolvimento Local (sem Docker)

Se preferir executar o projeto localmente sem Docker, siga os passos abaixo:

### 1. Instalar Dependências

```bash
npm install
```

### 2. Executar em Modo de Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Comandos Disponíveis

- `npm run dev`: Executa o servidor de desenvolvimento
- `npm run build`: Constrói a aplicação para produção
- `npm start`: Inicia o servidor de produção
- `npm run lint`: Executa o linter para verificar problemas no código

## Considerações Adicionais

- **Variáveis de Ambiente**: Se a aplicação precisar de variáveis de ambiente, você pode passá-las para o contêiner usando a flag `-e` no comando `docker run` (ex: `docker run -p 3000:3000 -e API_URL=http://your-api.com front-mfo`).
- **Desenvolvimento**: Para desenvolvimento, você pode montar o código-fonte local no contêiner para ter hot-reloading. Isso geralmente é feito com `docker-compose`.

---

**Autor**: Manus AI
