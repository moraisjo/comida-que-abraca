CREATE TYPE delivery_method AS ENUM ('PICKUP', 'DELIVERY');

CREATE TYPE donation_status AS ENUM ('PENDING', 'STOCK', 'DONATED');

CREATE TABLE donation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- Geração automática do UUID
    item_name VARCHAR(255) NOT NULL,
    donor_id UUID NOT NULL,  -- Donor identifier (FK to partner, UUID type)
    donatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,  -- Donation registration date
    delivery_method delivery_method NOT NULL, -- PICKUP ou DELIVERY
    status donation_status NOT NULL,  -- Donation status enum
    beneficiary_id  UUID NOT NULL,  -- Beneficiary identifier (FK to partner, nullable)
    campaign_id  UUID NOT NULL,  -- Campaign identifier (FK to campaign, nullable)

    FOREIGN KEY (donor_id) REFERENCES partner(id),
    FOREIGN KEY (beneficiary_id) REFERENCES partner(id) ON DELETE SET NULL,
    FOREIGN KEY (campaign_id) REFERENCES campaign(id) ON DELETE SET NULL
);
