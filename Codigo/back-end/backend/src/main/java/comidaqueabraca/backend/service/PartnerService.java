package comidaqueabraca.backend.service;

import comidaqueabraca.backend.dto.PartnerDTO;
import comidaqueabraca.backend.entity.PartnerEntity;
import comidaqueabraca.backend.repository.PartnerRepository;
import comidaqueabraca.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class PartnerService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PartnerRepository partnerRepository;

    @Transactional
    public PartnerEntity createPartner(@Valid PartnerDTO data) {
        // Criar um parceiro (que já estende UserEntity)
        PartnerEntity partner = new PartnerEntity();
        partner.setName(data.name());
        partner.setEmail(data.email());
        // partner.setPassword(generateRandomPassword()); // Implementar lógica de senha
        partner.setWantsToDonate(data.wantsToDonate());
        partner.setWantsToReceiveDonations(data.wantsToReceiveDonations());
        partner.setLegalEntityType(data.legalEntityType());
        partner.setRegistrationDate(LocalDateTime.now());

        return partnerRepository.save(partner); // Salva tanto em db_user quanto em db_partner
    }

//    private String generateRandomPassword() {
//        return UUID.randomUUID().toString(); // Simples para testes, ajuste conforme necessário
//    }
}
