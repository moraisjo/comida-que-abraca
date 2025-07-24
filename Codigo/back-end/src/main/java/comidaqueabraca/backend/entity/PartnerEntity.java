package comidaqueabraca.backend.entity;

import java.time.LocalDateTime;
import comidaqueabraca.backend.enums.LegalEntityType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "db_partner")
@DiscriminatorValue("PARTNER")
@Getter
@Setter
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "id") // Usa o mesmo ID da superclasse como chave primária (trabalha junto com InheritanceType.JOINED)
public class PartnerEntity extends UserEntity {
    @Column(name = "wants_to_donate", nullable = false)
    private Boolean wantsToDonate;

    @Column(name = "wants_to_receive_donations", nullable = false)
    private Boolean wantsToReceiveDonations;

    @Column(name = "registration_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime registrationDate = LocalDateTime.now();

    // Enum para os tipos de pessoa jurídica
    @Enumerated(EnumType.STRING)
    @Column(name = "legal_entity_type", nullable = false)
    private LegalEntityType legalEntityType;

    public PartnerEntity(String name, String email, String password, String phone,String address, Boolean wantsToDonate, Boolean wantsToReceiveDonations, LegalEntityType legalEntityType) {
        super(name, email, password, phone, address); // Não precisa passar ID, pois o banco gera automaticamente
        this.wantsToDonate = wantsToDonate;
        this.wantsToReceiveDonations = wantsToReceiveDonations;
        this.registrationDate = LocalDateTime.now();
        this.legalEntityType = legalEntityType;
    }
}