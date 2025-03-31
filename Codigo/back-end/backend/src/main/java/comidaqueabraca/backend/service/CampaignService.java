package comidaqueabraca.backend.service;

import comidaqueabraca.backend.dto.CampaignDTO;
import comidaqueabraca.backend.entity.CampaignEntity;
import comidaqueabraca.backend.enums.CampaignStatus;
import comidaqueabraca.backend.repository.CampaignRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;

    public CampaignService(CampaignRepository campaignRepository) {
        this.campaignRepository = campaignRepository;
    }

    public CampaignEntity createCampaign(CampaignDTO campaignDTO) {
        CampaignEntity campaign = new CampaignEntity(
                campaignDTO.name(),
                campaignDTO.description(),
                campaignDTO.address(),
                campaignDTO.startDate(),
                campaignDTO.endDate(),
                campaignDTO.photoUrl(),
                campaignDTO.status() != null ? campaignDTO.status() : CampaignStatus.ACTIVE
        );

        return campaignRepository.save(campaign);
    }


    public Page<CampaignDTO> getActiveCampaigns(CampaignDTO data, Pageable pageable){
        return this.campaignRepository.findActiveCampaignsWithFilters(data, pageable);
    }
}