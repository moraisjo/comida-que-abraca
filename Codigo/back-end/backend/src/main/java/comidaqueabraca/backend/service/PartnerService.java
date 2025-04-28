package comidaqueabraca.backend.service;

import comidaqueabraca.backend.dto.CreatePartnerDTO;
import comidaqueabraca.backend.dto.PartnerDTO;
import comidaqueabraca.backend.entity.PartnerEntity;
import comidaqueabraca.backend.repository.PartnerRepository;
import comidaqueabraca.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class PartnerService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PartnerRepository partnerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public PartnerDTO createPartner(@Valid CreatePartnerDTO data) {
        // Criar um parceiro (que já estende UserEntity)
        PartnerEntity partner = new PartnerEntity();
        partner.setName(data.name());
        partner.setEmail(data.email());
        partner.setPassword(passwordEncoder.encode(data.password()));
        partner.setWantsToDonate(data.wantsToDonate());
        partner.setWantsToReceiveDonations(data.wantsToReceiveDonations());
        partner.setLegalEntityType(data.legalEntityType());
        partner.setRegistrationDate(LocalDateTime.now());

        partnerRepository.save(partner); // Salva tanto em db_user quanto em db_partner
        // retorna DTO para não expor dados sensíveis como senha
        return new PartnerDTO(
                partner.getName(),
                partner.getEmail(),
                partner.getWantsToDonate(),
                partner.getWantsToReceiveDonations(),
                partner.getLegalEntityType());
    }
}
