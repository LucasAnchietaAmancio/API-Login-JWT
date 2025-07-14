# 🛡️ Projeto de Autenticação JWT - Backend + Frontend

## 🚀 Visão Geral

Este projeto é um sistema básico de autenticação utilizando **JWT (JSON Web Tokens)**, desenvolvido para fins de estudo e aprendizado. Ele é dividido em duas partes:

- **Backend**: API Node.js com Express
- **Frontend**: Aplicação React com Material-UI

### ✅ Funcionalidades

- Cadastro de usuários
- Login com JWT
- Validação básica de formulários
- Proteção de rotas no front-end

---

## ⚠️ Limitações Intencionais (Para fins didáticos)

> Este projeto é **apenas para estudo** e **NÃO** deve ser usado em produção sem melhorias.

- 🔓 Senhas armazenadas em texto puro (sem hash)
- 🔑 Secret do JWT está fixo no código
- 🛡️ Falta de validações robustas de segurança
- 📦 Estrutura simplificada (sem arquitetura MVC)

---

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (v16+)
- [MySQL](https://www.mysql.com/) ou similar
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)

---

## 🛠️ Instalação

### Backend

cd backend
npm install
# Configure seu banco de dados no arquivo /banco/db.js
npm start

### Frontend

cd frontend
npm install
npm start
