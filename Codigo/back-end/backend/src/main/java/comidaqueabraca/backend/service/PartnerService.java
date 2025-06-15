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
import java.util.List;

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
        PartnerEntity partner = new PartnerEntity();
        partner.setName(data.name());
        partner.setEmail(data.email());
        partner.setPassword(passwordEncoder.encode(data.password()));
        partner.setPhone(data.phone());
        partner.setAddress(data.address());
        partner.setWantsToDonate(data.wantsToDonate());
        partner.setWantsToReceiveDonations(data.wantsToReceiveDonations());
        partner.setLegalEntityType(data.legalEntityType());
        partner.setRegistrationDate(LocalDateTime.now());
        partner.setUserRole("PARTNER");

        partnerRepository.save(partner);
        return new PartnerDTO(
                partner.getName(),
                partner.getEmail(),
                partner.getWantsToDonate(),
                partner.getWantsToReceiveDonations(),
                partner.getLegalEntityType());
    }

    
    public List<PartnerEntity> getAllBeneficiaries() {
        return partnerRepository.findByWantsToReceiveDonationsTrue();
    }
}
