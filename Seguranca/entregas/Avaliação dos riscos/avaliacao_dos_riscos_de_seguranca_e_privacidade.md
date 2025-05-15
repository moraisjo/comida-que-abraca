# Avaliação dos Riscos de Segurança e Privacidade

## 1. Consultor de Segurança  
**Nome:** Milena Lara Reis Ferreira

## 2. Requisitos Funcionais e Medidas de Segurança  

### 2.1 Partes do Projeto que Requerem Modelos de Ameaças Antes da Liberação  
- RF001 - Cadastro de parceiros  
- RF002 - Login de usuário  
- RF008 - Envio de formulário para doação  
- RF010 - Acompanhamento de doações registradas  
- RF012 - Gerenciamento de entrada de doações  
- RF013 - Gerenciamento de saída de doações  
- RF015 - Geração de relatórios  

### 2.2 Partes do Projeto que Requerem Revisões do Design de Segurança  
- **Autenticação e autorização**  
  - RF002 - Login de usuário  
- **Formulários**  
  - RF001 - Cadastro de parceiros  
  - RF008 - Formulário de doação  
- **Gerenciamento de doações e solicitações**  
  - RF010 - Acompanhamento de doações registradas  
  - RF012 - Gerenciamento de entrada de doações  
  - RF013 - Gerenciamento de saída de doações  
- **Visualização e exportação de dados**  
  - RF006 - Visualização de tabela de doações  
  - RF015 - Geração de relatórios  
- **Notificações**  
  - RF014 - Notificações de campanhas  

### 2.3 Partes do Projeto que Exigirão Teste de Penetração por Grupo Externo  
- RF001 - Cadastro de parceiros  
- RF002 - Login de usuário  
- RF008 - Envio de formulário para doação   
- RF012 - Gerenciamento de entrada de doações  
- RF013 - Gerenciamento de saída de doações  

### 2.4 Outros Requisitos de Teste ou Análise  
- **Análise de Código Estático (SAST)**  
  - Ferramenta: SonarQube (para React.js e Spring Boot)  
  - Uso adicional: `npm audit` antes dos deploys  
- **Análise de Dependências e Bibliotecas (SCA)**  
  - Ferramenta: OWASP Dependency-Check  
- **Testes de Autorização e Acesso**  
  - Mapeamento de permissões por Role (parceiro, colaborador, público geral)  
  - Testes manuais no navegador ou Swagger  
- **Verificação do Armazenamento Seguro de Senhas**  
  - Site: [bcrypt-generator.com](https://bcrypt-generator.com/)  
- **Verificação de Validade do JWT Token**  
  - Ferramenta: Debug do site [jwt.io](http://jwt.io)  
- **Testes de Injeção SQL**  
  - Ferramenta: OWASP ZAP  

### 2.5 Escopo dos Requisitos de Teste de Fuzzing  
Identificar falhas de segurança, estouros, travamentos e comportamentos inesperados causados por entradas malformadas, aleatórias ou maliciosas.  
- **Formulários**  
  - RF001 - Cadastro de parceiros  
  - RF008 - Formulário de doação  
- **Endpoints de PUT, POST e PATCH da API REST**  
- **Autenticação e sessão (RF002)**  
- **Parâmetros em URLs**  

## 3. Classificação de Impacto de Privacidade  
**Classificação:** P1 - Risco de privacidade alto  
**Justificativa:** O sistema armazena e manipula dados pessoais identificáveis (PII) de parceiros e usuários da ONG, como nome, e-mail, telefone, histórico de doações e solicitações.  