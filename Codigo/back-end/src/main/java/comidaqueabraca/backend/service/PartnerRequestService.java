package comidaqueabraca.backend.service;

import comidaqueabraca.backend.dto.PartnerRequestDTO;
import comidaqueabraca.backend.dto.PartnerRequestListDTO;
import comidaqueabraca.backend.dto.UserDTO;
import comidaqueabraca.backend.dto.UserRequestDTO;
import comidaqueabraca.backend.entity.PartnerRequestEntity;
import comidaqueabraca.backend.entity.UserEntity;
import comidaqueabraca.backend.repository.PartnerRequestRepository;
import comidaqueabraca.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PartnerRequestService {
    @Autowired
    private PartnerRequestRepository partnerRequestRepository;

    @Autowired
    private UserRepository userRepository;

    public PartnerRequestEntity createRequest(PartnerRequestDTO requestDTO) {
        UserEntity user = userRepository.findById(requestDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        PartnerRequestEntity request = new PartnerRequestEntity();
        request.setItemType(requestDTO.getItemType());
        request.setDescription(requestDTO.getDescription());
        request.setUser(user);
        request.setRequestDate(LocalDateTime.now());

        return partnerRequestRepository.save(request);
    }

    public List<PartnerRequestListDTO> getAllRequests() {
        List<PartnerRequestEntity> requests = partnerRequestRepository.findAll();

        return requests.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<PartnerRequestListDTO> getRequestsByUser(Integer userId) {
        List<PartnerRequestEntity> requests = partnerRequestRepository.findByUserId(userId);

        return requests.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    private PartnerRequestListDTO mapToDTO(PartnerRequestEntity request) {
        UserEntity user = request.getUser();

        UserRequestDTO userDTO = new UserRequestDTO(
                user != null ? user.getName() : null,
                user != null ? user.getEmail() : null,
                user != null ? user.getPhone() : null,
                user != null ? user.getAddress() : null
        );

        return new PartnerRequestListDTO(
                request.getId(),
                request.getItemType(),
                request.getDescription(),
                request.getRequestDate(),
                userDTO
        );
    }

}
