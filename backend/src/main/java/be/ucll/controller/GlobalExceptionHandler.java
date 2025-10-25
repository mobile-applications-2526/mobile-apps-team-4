// package be.ucll.controller;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.ControllerAdvice;
// import org.springframework.web.bind.annotation.ExceptionHandler;

// import be.ucll.util.exceptions.DomainException;
// import be.ucll.util.exceptions.ServiceException;

// import java.util.HashMap;
// import java.util.Map;

// @ControllerAdvice
// public class GlobalExceptionHandler {

//     @ExceptionHandler(DomainException.class)
//     public ResponseEntity<Map<String, String>> handleDomainException(DomainException ex) {
//         Map<String, String> errorResponse = new HashMap<>();
//         errorResponse.put("errorType", "DomainException");
//         errorResponse.put("message", ex.getMessage());
//         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
//     }

//     @ExceptionHandler(ServiceException.class)
//     public ResponseEntity<Map<String, String>> handleServiceException(ServiceException ex) {
//         Map<String, String> errorResponse = new HashMap<>();
//         errorResponse.put("errorType", "ServiceException");
//         errorResponse.put("message", ex.getMessage());
//         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
//     }
// }
