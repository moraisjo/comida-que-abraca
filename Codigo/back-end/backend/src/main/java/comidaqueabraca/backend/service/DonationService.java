package comidaqueabraca.backend.service;
import comidaqueabraca.backend.dto.PendingDonationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import comidaqueabraca.backend.entity.DonationEntity;
import comidaqueabraca.backend.enums.DonationStatus;
import comidaqueabraca.backend.repository.DonationRepository;

import java.util.List;

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

    public List<PendingDonationDTO> pendingDonations() {
        List<DonationEntity> donations = donationRepository.findByStatus(DonationStatus.PENDING);

        return donations.stream()
                .map(donation -> new PendingDonationDTO(
                        donation.getId(),
                        donation.getName(),
                        donation.getArrivingDate(),
                        donation.getDelivery().name(),
                        donation.getStatus().name(),
                        donation.getDonor().getName(),
                        donation.getCampaign() != null ? donation.getCampaign().getName() : null
                ))
                .toList();
    }
}