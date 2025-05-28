package comidaqueabraca.backend.service;

import comidaqueabraca.backend.dto.PendingDonationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import comidaqueabraca.backend.entity.DonationEntity;
import comidaqueabraca.backend.entity.PartnerEntity;
import comidaqueabraca.backend.enums.DonationStatus;
import comidaqueabraca.backend.repository.DonationRepository;
import comidaqueabraca.backend.repository.PartnerRepository;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DonationService {

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private PartnerRepository partnerRepository;

    public DonationEntity createDonation(DonationEntity donation) {

        DonationEntity newDonation = new DonationEntity();
        newDonation.setName(donation.getName());
        newDonation.setArrivingDate(donation.getArrivingDate());
        newDonation.setStatus(DonationStatus.PENDING);
        // newDonation.setBeneficiary(donation.getBeneficiary());
        // newDonation.setCampaign(donation.getCampaign());
        // newDonation.setDonor(donation.getDonor());

        return donationRepository.save(newDonation);
    }

    public List<DonationEntity> getDonationsStock() {
        return donationRepository.findByStatus(DonationStatus.STOCK);
    }
    public List<PendingDonationDTO> pendingDonations() {
        List<DonationEntity> donations = donationRepository.findByStatus(DonationStatus.PENDING);

        return donations.stream()
                .map(donation -> new PendingDonationDTO(
                        donation.getId(),
                        donation.getName(),
                        donation.getRequestDate(),
                        donation.getDelivery().name(),
                        donation.getStatus().name(),
                        donation.getPhotoUrl(),
                        donation.getDonor().getName(),
                        donation.getCampaign() != null ? donation.getCampaign().getName() : null))
                .toList();
    }

    public List<PendingDonationDTO> pendingDeliveries() {
        List<DonationEntity> donations = donationRepository.findByStatus(DonationStatus.PENDING_DELIVERY);

        return donations.stream()
                .map(donation -> new PendingDonationDTO(
                        donation.getId(),
                        donation.getName(),
                        donation.getRequestDate(),
                        donation.getDelivery().name(),
                        donation.getStatus().name(),
                        donation.getPhotoUrl(),
                        donation.getDonor().getName(),
                        donation.getCampaign() != null ? donation.getCampaign().getName() : null))
                .toList();
    }

    public void updateDonationStatus(Long donationId, DonationStatus status) {
        DonationEntity donation = donationRepository.findById(donationId)
                .orElseThrow(() -> new RuntimeException("Doação não encontrada"));

        donation.setStatus(status);

        donationRepository.save(donation);
    }

    public void updateDonationStock(Long donationId, DonationStatus status) {
        DonationEntity donation = donationRepository.findById(donationId)
                .orElseThrow(() -> new RuntimeException("Doação não encontrada"));

        donation.setStatus(status);

        if (status == DonationStatus.STOCK) {
            donation.setArrivingDate(LocalDateTime.now());
            donation.setStockEntryDate(LocalDateTime.now());
        }

        donationRepository.save(donation);
    }

    public void updateDonationOutput(Long donationId, Integer beneficiaryId) {
        DonationEntity donation = donationRepository.findById(donationId)
                .orElseThrow(() -> new RuntimeException("Doação não encontrada"));

        PartnerEntity beneficiary = partnerRepository.findById(beneficiaryId)
                .orElseThrow(() -> new RuntimeException("Parceiro não encontrado"));

        donation.setBeneficiary(beneficiary);
        donation.setStockExitDate(LocalDateTime.now());

        donationRepository.save(donation);
    }
}