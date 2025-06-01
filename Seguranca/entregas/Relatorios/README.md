# Relatórios de Testes de Vulnerabilidade

Realizamos o escaneamento da nossa aplicação com o software OWASP ZAP para identificação de ameaças, identificas por um ID de CWE (Common Weakness Enumeration), de acordo com o sistema de categorias para fraquezas e vulnerabilidades de hardware e software mantido pela OWASP.

Após realizado o escaneamento, verificamos quais CWEs se encontravam nas listas de vulnerabilidades que buscamos mitigar:
1. https://owasp.org/Top10/A01_2021-Broken_Access_Control/
2. https://owasp.org/Top10/A02_2021-Cryptographic_Failures/
3. https://owasp.org/Top10/A03_2021-Injection/
 
## CWES

Abaixo listamos os CWEs reportados pelo escaneamento e sua classificação segundo as listagens de vulnerabilidades:

| CWE    | Lista   | Descrição |
|--------|---------|-----------|
| 693    | Nenhuma | Content Security Policy (CSP) Header Not Set |
| 538    | A1      | **Insertion of Sensitive Information into Externally-Accessible File or Directory:** <br>Hidden File Found<br>**URL**: http://localhost:5173/.hg<br>**Description**: A sensitive file was identified as accessible or available. This may leak administrative, configuration, or credential information which can be leveraged by a malicious individual to further attack the system or conduct social engineering efforts.<br>**Solution**: Consider whether or not the component is actually required in production, if it isn't then disable it. If it is then ensure access to it requires appropriate authentication and authorization, or limit exposure to internal systems or specific source IPs, etc.|
| 1021   | Nenhuma | Missing Anti-clickjacking Header |
| 497    | A1      | **Exposure of Sensitive System Information to an Unauthorized Control Sphere**<br>Private IP Disclosure<br>**URL**:http://localhost:5173/node_modules/.vite/deps/@mui_icons-material.js?v=65fd103c<br>**Description**: A private IP (such as 10.x.x.x, 172.x.x.x, 192.168.x.x) or an Amazon EC2 private hostname (for example, ip-10-0-56-78) has been found in the HTTP response body. This information might be helpful for further attacks targeting internal systems.<br>**Solution**: Remove the private IP address from the HTTP response body. For comments, use JSP/ASP/PHP comment instead of HTML/JavaScript comment which can be seen by client browsers.|
| 497    | A1      |**Insertion of Sensitive Information into Externally-Accessible File or Directory:** <br>Timestamp Disclosure - Unix<br>**URL**:http://localhost:5173/node_modules/.vite/deps/chunk-4Q44JDHX.js?v=a7152dae<br>**Description**: A timestamp was disclosed by the application/web server. - Unix<br>**Solution**: Manually confirm that the timestamp data is not sensitive, and that the data cannot be aggregated to disclose exploitable patterns.|
| 693    | Nenhuma | X-Content-Type-Options Header Missing | 
| 598    | Nenhuma | Information Disclosure - Sensitive Information in URL |
| 615    | Nenhuma | Information Disclosure - Suspicious Comments |

## Mitigação

### CWE-538

Essa ameaça deve ser mitigada no momento do deploy. Depois de gerar a `build` do projeto, devemos então procurando por arquivos sensíveis (com extensão `.hg`, `.git`, etc) e deleta-los antes de fazer o deploy.

### CWE-497

Essa ameaça também deverá ser mitigada no momento do deploy. Ao gerar o `build` da aplicação, devemos remover as dependências de desenvolvimento e revisar o conteúdo da pasta `dist` antes de fazer o deploy.