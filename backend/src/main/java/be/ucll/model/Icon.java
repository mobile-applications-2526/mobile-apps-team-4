package be.ucll.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Embeddable
public class Icon {

    public enum IconSymbolName {
        figure_walk,
        bicycle,
        book_fill,
        music_note,
        fork_knife,
        cart_fill,
        gamecontroller_fill,
        paintpalette_fill,
        briefcase_fill,
        leaf_fill,
        film_fill,
        graduationcap_fill,
        calendar,
        sparkles,
        cloud_sun_fill,
        house_fill,
        star_fill,
        moon_fill,
        sun_max_fill,
        heart_fill,
        flag_fill,
        map_fill,
        tshirt_fill,
        bag_fill,
        music_mic,
        theatermasks_fill,
        soccerball,
        basketball_fill,
        flame_fill,
        airplane,
        tent_fill,
        pawprint_fill,
        books_vertical_fill,
        person_2_fill,
        person_3_fill,
        megaphone_fill,
        mappin_and_ellipse,
        gift_fill,
        party_popper_fill,
        wineglass_fill,
        cup_and_saucer_fill,
        music_note_list,
        guitars_fill,
        paintbrush_pointed_fill,
        camera_fill,
        figure_run,
        globe_europe_africa_fill;
    }

    public enum IconColor {
        HEX_E71D36("#E71D36"),
        HEX_FF6B6B("#FF6B6B"),
        HEX_FF9F1C("#FF9F1C"),
        HEX_FFBF69("#FFBF69"),
        HEX_FFD93D("#FFD93D"),
        HEX_4ECDC4("#4ECDC4"),
        HEX_2EC4B6("#2EC4B6"),
        HEX_3A86FF("#3A86FF"),
        HEX_1A535C("#1A535C"),
        HEX_8338EC("#8338EC");

        private final String hex;

        IconColor(String hex) {
            this.hex = hex;
        }

        public String getHex() {
            return hex;
        }
    }

    @Enumerated(EnumType.STRING)
    @Schema(description = "currently still like figure_walk, should be changed to figure.walk", example = "figure_walk")
    private IconSymbolName iconSymbolName;

    @Enumerated(EnumType.STRING)
    @Schema(description = "currently still like HEX_E71D36, should be changed to #E71D36", example = "HEX_E71D36")
    private IconColor iconColor;

    protected Icon() {}

    public Icon(IconSymbolName iconSymbolName, IconColor iconColor) {
        this.iconSymbolName = iconSymbolName;
        this.iconColor = iconColor;
    }

    public IconSymbolName getIconSymbolName() {
        return this.iconSymbolName;
    }

    public void setIconSymbolName(IconSymbolName iconSymbolName) {
        this.iconSymbolName = iconSymbolName;
    }

    public IconColor getIconColor() {
        return this.iconColor;
    }

    public void setIconColor(IconColor iconColor) {
        this.iconColor = iconColor;
    }
}
