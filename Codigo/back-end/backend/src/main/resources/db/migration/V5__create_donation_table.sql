-- Criar o tipo ENUM para o método de entrega
CREATE TYPE delivery_method AS ENUM ('PICKUP', 'DELIVERY');

-- Criar o tipo ENUM para o status da doação
CREATE TYPE donation_status AS ENUM ('PENDING', 'STOCK', 'DONATED');

-- Criar a tabela donation
CREATE TABLE donation (
    id SERIAL PRIMARY KEY,  -- Unique Identifier (Auto-incrementing)
    item_name VARCHAR(255) NOT NULL,  -- Item name
    donor_id INT NOT NULL,  -- Donor identifier (FK to partner)
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,  -- Donation registration date
    delivery_method delivery_method NOT NULL,  -- Delivery method enum
    status donation_status NOT NULL,  -- Donation status enum
    beneficiary_id INT,  -- Beneficiary identifier (FK to partner, nullable)
    campaign_id INT,  -- Campaign identifier (FK to campaign, nullable)

    FOREIGN KEY (donor_id) REFERENCES partner(id) ON DELETE CASCADE,
    FOREIGN KEY (beneficiary_id) REFERENCES partner(id) ON DELETE SET NULL,
    FOREIGN KEY (campaign_id) REFERENCES campaign(id) ON DELETE SET NULL
);
