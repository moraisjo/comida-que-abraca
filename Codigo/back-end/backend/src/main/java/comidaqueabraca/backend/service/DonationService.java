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
import comidaqueabraca.backend.entity.CampaignEntity;
import comidaqueabraca.backend.repository.CampaignRepository;
import comidaqueabraca.backend.entity.UserEntity;
import comidaqueabraca.backend.repository.UserRepository;

@Service
public class DonationService {

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private PartnerRepository partnerRepository;

    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private UserRepository userRepository;

    public DonationEntity createDonation(DonationEntity donation) {
        CampaignEntity campaign = campaignRepository.findById(donation.getCampaign().getId())
            .orElseThrow(() -> new RuntimeException("Campanha não encontrada"));

        if (!campaign.getActive()) {
            throw new RuntimeException("Campanha não está ativa");
        }

        UserEntity donor = userRepository.findById(donation.getDonor().getId())
            .orElseThrow(() -> new RuntimeException("Doador não encontrado"));

        if (!donor.getActive()) {
            throw new RuntimeException("Doador não está ativo");
        }

        donation.setStatus(DonationStatus.PENDING);
        return donationRepository.save(donation);
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