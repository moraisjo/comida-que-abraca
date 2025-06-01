package comidaqueabraca.backend.service;

import comidaqueabraca.backend.dto.PartnerRequestDTO;
import comidaqueabraca.backend.dto.UserDTO;
import comidaqueabraca.backend.entity.PartnerRequestEntity;
import comidaqueabraca.backend.entity.UserEntity;
import comidaqueabraca.backend.repository.PartnerRequestRepository;
import comidaqueabraca.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PartnerRequestService {
    private PartnerRequestRepository partnerRequestRepository;
    private UserRepository userRepository;

    public PartnerRequestEntity createRequest(Integer userId, PartnerRequestEntity request) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        request.setUser(user);
        request.setRequestDate(LocalDateTime.now());

        return partnerRequestRepository.save(request);
    }

    public List<PartnerRequestDTO> getAllRequests() {
        List<PartnerRequestEntity> requests = partnerRequestRepository.findAll();

        return requests.stream()
                .map(request -> new PartnerRequestDTO(
                        request.getId(),
                        request.getItemType(),
                        request.getDescription(),
                        request.getRequestDate(),
                        new UserDTO(
                                request.getUser().getName(),
                                request.getUser().getEmail(),
                                request.getUser().getPhone(),
                                request.getUser().getAddress()
                        )
                ))
                .collect(Collectors.toList());
    }

    public List<PartnerRequestEntity> getRequestsByUser(Integer userId) {
        return partnerRequestRepository.findByUserId(userId);
    }
}
