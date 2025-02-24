# HoraFit Backend

Este é o backend da aplicação **Comida que Abraça**, desenvolvido utilizando **Spring Boot**. O projeto segue uma arquitetura em camadas, organizada de forma a separar as responsabilidades de lógica de negócio, controle de requisições e acesso a dados. Além disso, o projeto utiliza **Swagger** para documentação da API e **Spring Security** para controle de autenticação e autorização.

## Estrutura do Projeto

A estrutura de diretórios do projeto é a seguinte:

```
src
 └── main
     ├── java
     │   └── com
     │       └── horafit
     │           └── backend
     │               ├── config          # Configurações da aplicação (e.g., configuração de segurança, CORS)
     │               ├── controller      # Controladores REST (e.g., APIs)
     │               ├── dto             # Data Transfer Objects (opcional, se usar DTOs)
     │               ├── entity          # Classes das entidades (e.g., modelos do banco de dados)
     │               ├── repository      # Interfaces do repositório (e.g., CRUD e consultas JPA)
     │               ├── service         # Lógica de negócio (e.g., serviços da aplicação)
     │               ├── security        # Configurações e classes de segurança (caso use Spring Security)
     │               └── ComidaQueAbraca.java  # Classe principal do Spring Boot
     └── resources
         ├── application.properties      # Arquivo de configuração da aplicação
         ├── static                      # Arquivos estáticos (e.g., CSS, JS, imagens, se houver front-end)
         └── templates                   # Templates Thymeleaf, caso utilize templates
```


### Detalhes das Camadas

- **`config/`**: Contém as configurações da aplicação, como configuração de segurança, CORS, entre outras.
- **`controller/`**: Contém os controladores REST que lidam com as requisições HTTP e retornam as respostas apropriadas. Cada controlador mapeia um conjunto de endpoints da API.
- **`dto/`**: Define os objetos de transferência de dados (Data Transfer Objects) que são utilizados para encapsular os dados transferidos entre o frontend e o backend.
- **`entity/`**: Contém as classes que representam as entidades do banco de dados (modelos).
- **`repository/`**: Define interfaces que estendem `JpaRepository` para realizar operações de CRUD e consultas no banco de dados.
- **`service/`**: Implementa a lógica de negócio e orquestra as chamadas entre repositórios e controladores.
- **`security/`**: Inclui as configurações e implementações relacionadas à segurança, como autenticação e autorização utilizando Spring Security.
- **`HoraFitBackendApplication.java`**: Classe principal que inicializa a aplicação Spring Boot.

### Tecnologias Utilizadas

- **Spring Boot**: Framework principal para criação do backend.
- **Spring Security**: Utilizado para controle de autenticação e autorização.
- **Swagger**: Utilizado para documentação da API REST.
- **JPA/Hibernate**: Para mapeamento objeto-relacional (ORM) e persistência de dados.
- **MySQL**: Banco de dados relacional utilizado pela aplicação.

### Swagger

O Swagger foi integrado ao projeto para documentar e facilitar o teste dos endpoints da API. Para acessar a documentação, inicie a aplicação e navegue até:

http://localhost:8080/swagger-ui/index.html

### Segurança

O projeto utiliza **Spring Security** para implementar autenticação e autorização. Atualmente, é usada uma configuração básica, mas no futuro, pretendemos implementar JWT (JSON Web Tokens) para segurança baseada em tokens.

### Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2025-1-ti4-1254100-comidaqueabraca.git
   
2. Navegue até o diretório do projeto:
lf-es-2025-1-ti4-1254100-comidaqueabraca/Codigo/back-end/comidaqueabraca-backend
   
4. Execute o projeto:
```bash
./mvnw spring-boot:run
