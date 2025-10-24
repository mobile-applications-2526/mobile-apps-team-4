package be.ucll.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record RegisterDTO(
    @Schema(example = "John Doe")
    String name,
    
    @Schema(example = "john.doe@example.com")
    String email,

    @Schema(example = "VerySecure!")
    String password
) {}