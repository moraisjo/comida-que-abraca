package comidaqueabraca.backend.service;

import comidaqueabraca.backend.dto.CreateDonationRequestDTO;
import comidaqueabraca.backend.dto.DonationDTO;
import comidaqueabraca.backend.dto.PartnerDonationDTO;
import comidaqueabraca.backend.dto.PendingDonationDTO;
import comidaqueabraca.backend.entity.*;
import comidaqueabraca.backend.repository.*;
import comidaqueabraca.backend.util.message.DonationNotificationMessageBuilder;
import comidaqueabraca.backend.util.message.NotificationMessageBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import comidaqueabraca.backend.enums.DonationStatus;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DonationService {
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private PartnerRepository partnerRepository;

    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private UserRepository userRepository;

    public void createDonation(CreateDonationRequestDTO request) {
        PartnerEntity donor = partnerRepository.findById(request.getDonor())
                .orElseThrow(() -> new RuntimeException("Doador não encontrado"));

        CampaignEntity campaign = null;
        if (request.getCampaign() != null) {
            campaign = campaignRepository.findById(request.getCampaign())
                    .orElseThrow(() -> new RuntimeException("Campanha não encontrada"));
        }

        DonationEntity donation = new DonationEntity();
        donation.setName(request.getName());
        donation.setDescription(request.getDescription());
        donation.setCategory(request.getCategory());
        donation.setQuantity(request.getQuantity());
        donation.setContactInfo(request.getContactInfo());
        donation.setDeliveryDescription(request.getDeliveryDescription());
        donation.setDelivery(request.getDelivery());
        donation.setPhotoUrl(request.getPhotoUrl());
        donation.setDonor(donor);
        donation.setCampaign(campaign);
        donation.setRequestDate(LocalDateTime.now());
        donation.setStatus(DonationStatus.PENDING);

        donationRepository.save(donation);

        List<UserEntity> collaborators = userRepository.findByUserRole("COLLABORATOR");

        String title = DonationNotificationMessageBuilder.buildTitle();
        String message = DonationNotificationMessageBuilder.buildMessage(donation);

        List<NotificationEntity> notifications = collaborators.stream()
                .map(user -> new NotificationEntity(
                        user,
                        null,
                        title,
                        message
                ))
                .toList();

        notificationRepository.saveAll(notifications);
    }


    public List<PartnerDonationDTO> getDonationsByPartnerUserId(Long partnerUserId) {
        List<DonationEntity> donations = donationRepository.findByDonor_Id(partnerUserId);

        return donations.stream().map(this::convertToDTO).toList();
    }

    public List<DonationDTO> getDonationsStockOrDonated() {
        List<DonationEntity> donations = donationRepository.findByStatusIn(
                Arrays.asList(DonationStatus.STOCK, DonationStatus.DONATED));

        return donations.stream()
                .map(DonationDTO::fromEntity)
                .collect(Collectors.toList());
    }


    public List<PendingDonationDTO> pendingDonations() {
        List<DonationEntity> donations = donationRepository.findByStatus(DonationStatus.PENDING);

        return getPendingDonationDTOS(donations);
    }

    public List<PendingDonationDTO> pendingDeliveries() {
        List<DonationEntity> donations = donationRepository.findByStatus(DonationStatus.PENDING_DELIVERY);

        return getPendingDonationDTOS(donations);
    }

    private List<PendingDonationDTO> getPendingDonationDTOS(List<DonationEntity> donations) {
        return donations.stream()
                .map(donation -> new PendingDonationDTO(
                        donation.getId(),
                        donation.getName(),
                        donation.getDescription(),
                        donation.getCategory(),
                        donation.getQuantity(),
                        donation.getContactInfo(),
                        donation.getDeliveryDescription(),
                        donation.getRequestDate(),
                        donation.getDelivery().name(),
                        donation.getStatus().name(),
                        donation.getPhotoUrl(),
                        donation.getDonor().getName(),
                        donation.getCampaign() != null ? donation.getCampaign().getName() : null
                ))
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

    private PartnerDonationDTO convertToDTO(DonationEntity entity) {
        return new PartnerDonationDTO(
                entity.getId(),
                entity.getName(),
                entity.getRequestDate(),
                entity.getDelivery(),
                entity.getStatus(),
                entity.getPhotoUrl(),
                entity.getCampaign()
        );
    }
}