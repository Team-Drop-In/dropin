package teamdropin.server.domain.box.dto.box;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import teamdropin.server.domain.box.dto.boxImage.CreateBoxImageRequestDto;
import teamdropin.server.domain.box.dto.boxTag.CreateBoxTagRequestDto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoxCreateRequestDto {

    @NotBlank
    private String name;

    @NotBlank
    private String location;

    private String phoneNumber;

    @NotNull
    private Long cost;

    @NotNull
    private Long area;

    private boolean barbellDrop;
    private String url;
    private String detail;

    private List<CreateBoxTagRequestDto> tagList;

    private List<CreateBoxImageRequestDto> imageInfo;

}
