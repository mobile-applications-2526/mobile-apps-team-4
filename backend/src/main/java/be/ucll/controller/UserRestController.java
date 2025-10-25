package be.ucll.controller;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import be.ucll.dto.AuthResponse;
import be.ucll.dto.LoginDTO;
import be.ucll.dto.RegisterDTO;
import be.ucll.dto.UserDTO;
import be.ucll.service.UserService;
import be.ucll.util.exceptions.DomainException;
import be.ucll.util.exceptions.ServiceException;

@RestController
@RequestMapping("/users")
public class UserRestController {

    private UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserDTO register(@RequestBody RegisterDTO registerDTO) {
        return userService.register(registerDTO);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginDTO loginDTO) {
        return userService.login(loginDTO);
    }


    @ExceptionHandler(DomainException.class)
    public ResponseEntity<Map<String, Object>> handleDomainException(DomainException ex) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("errorCode", ex.getStatus().value() + " " + ex.getStatus());
        errorResponse.put("message", ex.getMessage());
        errorResponse.put("type", "DomainException");
        return ResponseEntity.status(ex.getStatus()).body(errorResponse);
    }

    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<Map<String, Object>> handleServiceException(ServiceException ex) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("errorCode", ex.getStatus().value() + " " + ex.getStatus());
        errorResponse.put("message", ex.getMessage());
        errorResponse.put("type", "ServiceException");
        return ResponseEntity.status(ex.getStatus()).body(errorResponse);
    }

}
