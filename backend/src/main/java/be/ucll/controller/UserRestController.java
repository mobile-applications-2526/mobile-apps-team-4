package be.ucll.controller;
import org.springframework.web.bind.annotation.*;

import be.ucll.dto.AuthResponse;
import be.ucll.dto.LoginDTO;
import be.ucll.dto.RegisterDTO;
import be.ucll.dto.UserDTO;
import be.ucll.service.UserService;

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
}
