-- Criando o tipo ENUM para o status da campanha
CREATE TYPE campaign_status AS ENUM ('ACTIVE', 'FINISHED', 'CANCELLED');

-- Criando a tabela campaign
CREATE TABLE campaign (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    address_id UUID,  -- ID do endereço da campanha (FK para a tabela address)
    start_date DATE,  -- Data de início da campanha
    end_date DATE,  -- Data de fim da campanha
    photo_url TEXT,  -- Ufoto da campanha
    status campaign_status NOT NULL,  -- Status da campanha (Enum: ACTIVE, FINISHED, CANCELLED)

    -- Definindo a relação com a tabela address (FK)
    FOREIGN KEY (address_id) REFERENCES address(id) ON DELETE SET NULL
);
