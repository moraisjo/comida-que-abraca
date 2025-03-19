CREATE TABLE "user" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- Identificador único do usuário
    name VARCHAR(255) NOT NULL,  -- Nome do usuário
    email VARCHAR(255) NOT NULL UNIQUE,  -- E-mail do usuário
    password VARCHAR(255) NOT NULL,  -- Senha do usuário
    phone VARCHAR(20),  -- Telefone do usuário
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Data de criação do usuário
    address_id UUID,  -- Chave estrangeira para a tabela address
    FOREIGN KEY (address_id) REFERENCES address(id) ON DELETE SET NULL  -- Relacionamento com a tabela address
);
