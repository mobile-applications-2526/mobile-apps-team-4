package be.ucll.controller;
import org.springframework.web.bind.annotation.*;

import be.ucll.dto.LoginDTO;
import be.ucll.model.User;
import be.ucll.service.UserService;

@RestController
@RequestMapping("/users")
public class UserRestController {

    private UserService userService;

    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginDTO loginDTO) {
        return userService.login(loginDTO);
    }
}
