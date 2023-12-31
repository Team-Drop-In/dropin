package teamdropin.server.domain.member.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
public class GetWriterResponseDto {
    private Long id;
    private String nickname;
    private String profileImageUrl;

    public GetWriterResponseDto(Long id, String nickname, String profileImageUrl) {
        this.id = id;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
    }
}
