# Segurança e Privacidade — Comida que Abraça

Este repositório reúne a documentação de segurança e privacidade do projeto **Comida que Abraça**, uma plataforma web para gestão de doações entre a ONG e seus parceiros. O trabalho abrange modelagem de ameaças, avaliação de riscos, requisitos de testes e recomendações de mitigação.

Realizamos uma análise completa e abrangente e fizemos um recorte no que diz respeito à mitigação das ameaças, de acordo com o escopo proposto:
- Broken Access Control
- Cryptographic Failures
- Injection

**Responsável:** Milena Lara Reis Ferreira  
**Revisor:** Érica Alves


## 1. Avaliação de Riscos

A avaliação de riscos considerou requisitos funcionais, fluxos sensíveis e impactos à privacidade:

- **Funcionalidades críticas:** Cadastro de parceiros, login, envio e gestão de doações, geração de relatórios.
- **Revisão de design:** Autenticação/autorização, formulários, gerenciamento de doações, visualização/exportação de dados.
- **Testes obrigatórios:** Teste de penetração externo, SAST (SonarQube), SCA (OWASP Dependency-Check), fuzzing em formulários e endpoints, verificação de armazenamento seguro de senhas e tokens.
- **Classificação de privacidade:** P1 (alto risco), devido ao tratamento de dados pessoais identificáveis (PII).

> Detalhes completos em `Avaliação dos riscos/avaliacao_dos_riscos_de_seguranca_e_privacidade.md`.

## 2. Modelagem de Ameaças

A modelagem de ameaças foi realizada conforme a metodologia [OWASP Threat Modeling](https://owasp.org/www-community/Threat_Modeling_Process#introduction), utilizando o modelo STRIDE para identificar e mitigar riscos em fluxos críticos do sistema.

> Consulte o arquivo `Modelagem de ameaças/README.md` para detalhes completos e o arquivo `2025-06-01.json` para visualização no Threat Dragon.

## 3. Relatórios de Testes

- **Testes de vulnerabilidade:** Realizados com OWASP ZAP, identificando pontos de melhoria.
- **Recomendações:** Implementar cabeçalhos de segurança HTTP (CSP, X-Frame-Options), restringir acesso a arquivos sensíveis, reforçar autenticação e autorização.

> Consulte o arquivo `Relatorios/README.md` para detalhes e relatórios gerados pelo OWASP ZAP na pasta `Relatorios/`.

## 4. Referências

- [OWASP Threat Modeling](https://owasp.org/www-community/Threat_Modeling_Process)
- [Threat Dragon](https://owasp.org/www-project-threat-dragon/)
- [OWASP ZAP](https://www.zaproxy.org/)
- [SonarQube](https://www.sonarqube.org/)