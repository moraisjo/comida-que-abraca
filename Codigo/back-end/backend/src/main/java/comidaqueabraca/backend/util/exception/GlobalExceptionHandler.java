package comidaqueabraca.backend.util.exception;

import comidaqueabraca.backend.dto.response.ResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ResponseDTO> handleBusinessException(BusinessException ex) {
        ResponseDTO response = new ResponseDTO(ex.getMessage(), 400);
        return ResponseEntity.badRequest().body(response);
    }

//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<ResponseDTO> handleGenericException(Exception ex) {
//        ResponseDTO response = new ResponseDTO("Erro interno no servidor. Tente novamente mais tarde.", 500);
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
//    }
}
