package comidaqueabraca.backend.service;

import comidaqueabraca.backend.dto.CampaignDTO;
import comidaqueabraca.backend.entity.CampaignEntity;
import comidaqueabraca.backend.entity.AddressEntity;
import comidaqueabraca.backend.enums.CampaignStatus;
import comidaqueabraca.backend.repository.CampaignRepository;
import comidaqueabraca.backend.repository.AddressRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;
    private final AddressRepository addressRepository;

    public CampaignService(CampaignRepository campaignRepository, AddressRepository addressRepository) {
        this.campaignRepository = campaignRepository;
        this.addressRepository = addressRepository;
    }

    public void createCampaign(CampaignDTO data) {
        if (data.startDate().isAfter(data.endDate())) {
            throw new IllegalArgumentException("A data de início não pode ser depois da data de término");
        }
    // Dropar a tabela de endereço?
        AddressEntity address = addressRepository.findById(data.addressId())
                .orElseThrow(() -> new IllegalArgumentException("Endereço não encontrado"));

        this.campaignRepository.save(new CampaignEntity(
                data.name(),
                data.description(),
                address,
                data.startDate(),
                data.endDate(),
                data.photoUrl(),
                data.status() != null ? data.status() : CampaignStatus.ACTIVE
        ));
    }

    public Page<CampaignDTO> getActiveCampaigns(CampaignDTO data, Pageable pageable){
        return this.campaignRepository.findActiveCampaignsWithFilters(data, pageable);
    }
}