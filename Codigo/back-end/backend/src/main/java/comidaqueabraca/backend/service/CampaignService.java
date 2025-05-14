package comidaqueabraca.backend.service;

import comidaqueabraca.backend.dto.CampaignDTO;
import comidaqueabraca.backend.entity.CampaignEntity;
import comidaqueabraca.backend.entity.NotificationEntity;
import comidaqueabraca.backend.entity.UserEntity;
import comidaqueabraca.backend.enums.CampaignStatus;
import comidaqueabraca.backend.repository.CampaignRepository;
import comidaqueabraca.backend.repository.NotificationRepository;
import comidaqueabraca.backend.repository.UserRepository;
import comidaqueabraca.backend.util.message.NotificationMessageBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;

    public CampaignService(CampaignRepository campaignRepository, UserRepository userRepository, NotificationRepository notificationRepository) {
        this.campaignRepository = campaignRepository;
        this.userRepository = userRepository;
        this.notificationRepository = notificationRepository;
    }

    public CampaignEntity createCampaign(CampaignDTO campaignDTO) {
        List<CampaignEntity> existingCampaigns = campaignRepository.findConflictingCampaignsByNameAndPeriod(
                campaignDTO.name(), campaignDTO.startDate(), campaignDTO.endDate()
        );

        if (!existingCampaigns.isEmpty()) {
            throw new IllegalArgumentException("Já existe uma campanha com esse nome no período informado.");
        }

        CampaignEntity campaign = new CampaignEntity(
                campaignDTO.name(),
                campaignDTO.description(),
                campaignDTO.address(),
                campaignDTO.startDate(),
                campaignDTO.endDate(),
                campaignDTO.photoUrl(),
                campaignDTO.status() != null ? campaignDTO.status() : CampaignStatus.ACTIVE
        );

        CampaignEntity savedCampaign = campaignRepository.save(campaign);

        if (campaignDTO.notifyUsers()) {
            List<UserEntity> users = userRepository.findAll();

            String title = NotificationMessageBuilder.buildTitle();
            String message = NotificationMessageBuilder.buildMessage(savedCampaign);

            List<NotificationEntity> notifications = users.stream()
                    .map(user -> new NotificationEntity(
                            user,
                            savedCampaign,
                            title,
                            message
                    ))
                    .toList();

            notificationRepository.saveAll(notifications);
        }

        return savedCampaign;
    }

    public Page<CampaignEntity> getActiveCampaigns(Pageable pageable) {
        return campaignRepository.findAllActiveCampaigns(pageable);
    }
}