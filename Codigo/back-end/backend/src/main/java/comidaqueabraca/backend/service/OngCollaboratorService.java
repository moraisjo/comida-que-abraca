package comidaqueabraca.backend.service;

import comidaqueabraca.backend.dto.CreateOngCollaboratorDTO;
import comidaqueabraca.backend.dto.OngCollaboratorResponseDTO;
import comidaqueabraca.backend.entity.OngCollaboratorEntity;
import comidaqueabraca.backend.repository.OngCollaboratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OngCollaboratorService {

    @Autowired
    private OngCollaboratorRepository ongCollaboratorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public OngCollaboratorResponseDTO createOngCollaborator(CreateOngCollaboratorDTO request) {
        OngCollaboratorEntity collaborator = new OngCollaboratorEntity();
        collaborator.setName(request.name());
        collaborator.setEmail(request.email());
        collaborator.setPassword(passwordEncoder.encode(request.password()));
        collaborator.setPhone(request.phone());
        collaborator.setAddress(request.address());
        collaborator.setRole(request.role());
        collaborator.setUserRole("COLLABORATOR");

        ongCollaboratorRepository.save(collaborator);

        return new OngCollaboratorResponseDTO(
                collaborator.getName(),
                collaborator.getEmail(),
                collaborator.getPhone(),
                collaborator.getAddress(),
                collaborator.getRole()
        );
    }
}
