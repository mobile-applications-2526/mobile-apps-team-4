package be.ucll.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

public record CreateGroupDTO(
    @Schema(example = "Group 17")
    String name,
    
    // @Schema(example = "")
    // String description,

    @Schema(example = "[1, 2]")
    List<Long> members
) {}