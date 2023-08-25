package teamdropin.server.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import teamdropin.server.domain.member.entity.Gender;

@Data
@AllArgsConstructor
@Builder
public class MyInfoResponseDto {
    private String username;
    private String name;
    private String nickname;
    private Gender gender;
    private String profileImageUrl;
}
