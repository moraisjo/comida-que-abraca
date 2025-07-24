package comidaqueabraca.backend.controller;

import comidaqueabraca.backend.dto.response.ResponseDTO;
import comidaqueabraca.backend.entity.NotificationEntity;
import comidaqueabraca.backend.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Notificações", description = "Endpoints para gerenciamento de notificações dos usuários")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Operation(summary = "Buscar notificações do usuário", description = "Retorna todas as notificações de um usuário específico, com ordenação por visualização e data de envio. As notificações não visualizadas aparecem primeiro, seguidas pelas visualizadas — ambas ordenadas da mais recente para a mais antiga.")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Lista de notificações retornada com sucesso"), @ApiResponse(responseCode = "404", description = "Usuário não encontrado")})
    @GetMapping("/user/{userId}")
    public List<NotificationEntity> getNotificationsByUser(@Parameter(description = "ID do usuário para buscar notificações", example = "1") @PathVariable Integer userId) {
        return notificationService.getNotificationsByUserId(userId);
    }

    @Operation(summary = "Marcar notificação como visualizada", description = "Atualiza uma notificação específica definindo como visualizada e registrando a data/hora da visualização.")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Notificação marcada como visualizada"), @ApiResponse(responseCode = "404", description = "Notificação não encontrada")})
    @PutMapping("/{notificationId}/visualize")
    public ResponseDTO markAsVisualized(@PathVariable Integer notificationId) {
        notificationService.markNotificationAsVisualized(notificationId);
        return new ResponseDTO("Notificação visualizada com sucesso", 200);
    }
}
