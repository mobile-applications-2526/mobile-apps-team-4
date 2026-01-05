package be.ucll.controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("")
public class GlobalRestController {
    @GetMapping("/status")
    public String getStatus() {
        return new String("Backend is running!");
    }
}
