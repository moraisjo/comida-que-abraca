-- Criar o tipo ENUM para o tipo de parceiro
CREATE TYPE partner_type AS ENUM ('INDIVIDUAL', 'COMPANY', 'NON_GOVERNMENTAL_ORGANIZATION', 'GOVERNMENT');

-- Criar a tabela partner
CREATE TABLE partner (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- Unique Identifier
    user_id UUID NOT NULL,  -- Foreign Key to User table
    type partner_type NOT NULL,  -- Partner type using ENUM type
    is_donor BOOLEAN NOT NULL,  -- Se o parceiro está disposto a doar
    wants_to_receive_donations BOOLEAN NOT NULL,  -- Se o parceiro está disposto a receber doações
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,  -- Partner registration date

    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE  -- Foreign Key with cascading delete
);
