package be.ucll.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record LoginDTO(
    @Schema(example = "Barack@Obama.com")
    String email,
    
    @Schema(example = "TheGoat123")
    String password
) {}