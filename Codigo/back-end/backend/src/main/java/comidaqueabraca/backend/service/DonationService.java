package comidaqueabraca.backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import comidaqueabraca.backend.entity.DonationEntity;
import comidaqueabraca.backend.enums.DonationStatus;
import comidaqueabraca.backend.repository.DonationRepository;

@Service
public class DonationService {

    @Autowired
    private DonationRepository donationRepository;

    public DonationEntity createDonation(DonationEntity donation) {

        DonationEntity newDonation = new DonationEntity();
        newDonation.setName(donation.getName());
        newDonation.setArrivingDate(donation.getArrivingDate());
        newDonation.setStatus(DonationStatus.PENDING);
        //newDonation.setBeneficiary(donation.getBeneficiary());
        //newDonation.setCampaign(donation.getCampaign());
        //newDonation.setDonor(donation.getDonor());

        return donationRepository.save(newDonation);
    }
    
}
