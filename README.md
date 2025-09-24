# n8n Random Node


Este repositório contém um **nó customizado para o n8n** chamado **Random**, responsável por gerar números aleatórios dentro de um intervalo definido pelo usuário.  
O nó utiliza a [API do Random.org](https://www.random.org/), oferecendo resultados de alta qualidade ao invés de simples pseudoaleatoriedade.

---

## Pré-requisitos

Antes de prosseguir, garanta que possui as ferramentas abaixo instaladas no seu ambiente:

- [Docker + Docker Compose](https://docs.n8n.io/hosting/installation/docker/) configurados  
- [WSL 2 (Windows Subsystem for Linux)](https://learn.microsoft.com/pt-br/windows/wsl/install) — é um requisito *não* obrigatorio mas pode ser útil para facilitar a execução  

---

## Preparando variáveis de ambiente

Na raiz do projeto, crie um arquivo chamado `.env`.  
Você pode se guiar pelo modelo disponível em: [Exemplo .env](https://github.com/fiori007/n8n-random-node/blob/main/.env)

---

## Instalando dependências e compilando o projeto  

Acesse a pasta do pacote:  

```bash
cd custom-nodes/n8n-nodes-random

# Limpar instalações anteriores
rm -rf node_modules package-lock.json dist

# Instalar e compilar usando Node.js 22 em container
docker run --rm -v "$PWD":/app -w /app node:22 bash -lc "npm install && npm run build"
```

Isso gera os arquivos compilados na pasta ```dist/.```

---

## Subindo a aplicação com Docker Compose

Na raiz do projeto, execute:

```bash
docker compose up -d
```
- O n8n ficará disponível em [http://localhost:5678](http://localhost:5678/).  
- O *Postgres* será usado como banco de dados persistente.  

Para parar os serviços:

```bash
docker compose down
```

---

## Testando o nó Random no n8n

1. Acesse a interface do n8n em [http://localhost:5678](http://localhost:5678/).  
2. Crie um novo workflow.  
3. Adicione o nó **Random**.  
4. Configure os parâmetros:  
   - Min -> valor inteiro mínimo  
   - Max -> valor inteiro máximo  
5. Clique em *Execute Node*.  

---

## Tecnologias utilzadas  

- *n8n*: v1.85.4  

- *Postgres*: v16  

- *Node.js*: v22 (LTS)  
