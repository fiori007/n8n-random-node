# Node Customizado: Random para n8n

Este repositório contém um **nó customizado para o n8n** chamado **Random**, responsável por gerar números aleatórios dentro de um intervalo definido pelo usuário.  
O nó utiliza a [API do Random.org](https://www.random.org), oferecendo resultados de alta qualidade ao invés de simples pseudoaleatoriedade.

---

## Requisitos básicos

Antes de prosseguir, garanta que possui as ferramentas abaixo instaladas no seu ambiente:

- [Docker e Docker Compose](https://docs.docker.com/get-docker/) configurados
- (Para Windows) [WSL 2](https://learn.microsoft.com/pt-br/windows/wsl/install) pode ser útil para facilitar a execução

---

## Preparando variáveis de ambiente

Na raiz do projeto, crie um arquivo chamado `.env`.  
Você pode se guiar pelo modelo disponível em: [Exemplo .env](./.env).

---

## Instalando dependências e compilando o projeto

Acesse a pasta do pacote:

```bash
cd custom-nodes/n8n-nodes-random
```
Antes de instalar, limpe arquivos antigos (se existirem):
```rm -rf node_modules package-lock.json dist```

Agora, rode a instalação e o build usando Node.js 22 dentro de um container:
``` docker run --rm -v "$PWD":/app -w /app node:22 bash -lc "npm install && npm run build" ```

Após esse comando, os arquivos compilados estarão disponíveis em dist/.


# Subindo a aplicação com Docker Compose

Na raiz do projeto, execute:

```docker compose up -d```

O n8n ficará disponível em http://localhost:5678
.

O Postgres será usado como banco de dados persistente.

Para parar os serviços:

```docker compose down ```








