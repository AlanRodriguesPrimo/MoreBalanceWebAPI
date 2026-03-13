MoreBalanceWebAPI
API desenvolvida para o projeto MoreBalance, com foco em gerenciamento de contas, pessoas e categorias financeiras.
O objetivo é fornecer endpoints que consolidam receitas, despesas e saldos, permitindo relatórios e análises de forma simples e escalável.

🚀 Tecnologias utilizadas
.NET / C# – Backend principal da API

ASP.NET Core Web API – Estrutura para criação dos endpoints

Entity Framework Core – ORM para acesso ao banco de dados

TypeScript – Integração com frontend e tipagem

CSS – Estilização de componentes no frontend

React + Ant Design – Interface web para consumo da API

📂 Estrutura do Projeto
Application/ – Regras de aplicação e serviços

Domain/ – Entidades e lógica de domínio

Infrastructure/ – Configuração de banco de dados, repositórios e dependências

MoreBalanceAPI/ – Projeto principal da API

⚙️ Como rodar o projeto
Pré-requisitos
.NET 8 SDK

Node.js (para frontend)

Banco de dados configurado (SQL Server ou outro suportado)

Passos
Clone o repositório:

bash
git clone https://github.com/AlanRodriguesPrimo/MoreBalanceWebAPI.git
Acesse a pasta do projeto:

bash
cd MoreBalanceWebAPI
Restaure dependências:

bash
dotnet restore
Configure a string de conexão no appsettings.json.

Execute as migrations:

bash
dotnet ef database update
Rode a aplicação:

bash
dotnet run
A API estará disponível em:
👉 http://localhost:5000 ou https://localhost:5001

📊 Endpoints principais
GET /api/GeneralSummary/GetSummaryPeople → Retorna consolidação de receitas, despesas e saldo por pessoa

GET /api/GeneralSummary/GetSummaryCategories → Retorna consolidação por categorias

(Mais endpoints podem ser adicionados conforme evolução do projeto.)
