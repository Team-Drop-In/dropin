package teamdropin.server.domain.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import teamdropin.server.domain.member.dto.*;
import teamdropin.server.domain.member.entity.Member;
import teamdropin.server.domain.member.mapper.MemberMapper;
import teamdropin.server.domain.member.service.MemberService;
import teamdropin.server.global.dto.SingleResponseDto;
import teamdropin.server.global.exception.BusinessLogicException;
import teamdropin.server.global.exception.ExceptionCode;
import teamdropin.server.global.util.UriCreator;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/api/members";
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    /**
     * 회원가입
     */
    @PostMapping("/member")
    public ResponseEntity<URI> signupMember(@RequestBody @Valid MemberSignUpRequestDto memberSignUpRequestDto){
        Member member = memberMapper.toMember(memberSignUpRequestDto);
        Long memberId = memberService.join(member);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, memberId);
        return ResponseEntity.created(location).build();
    }

    /**
     * 이메일 중복 체크
     */
    @GetMapping("check-duplicate/email")
    public ResponseEntity<Void> checkDuplicateEmail(@RequestBody SignUpDuplicateCheckEmailDto signUpDuplicateCheckEmailDto){
        memberService.validateDuplicateEmail(signUpDuplicateCheckEmailDto.getUsername());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 닉네임 중복 체크
     */
    @GetMapping("check-duplicate/nickname")
    public ResponseEntity<Void> checkDuplicateNickname(@RequestBody SignUpDuplicateCheckNicknameDto signUpDuplicateCheckNicknameDto){
        memberService.validateDuplicateNickname(signUpDuplicateCheckNicknameDto.getNickname());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 마이페이지
     */
    @GetMapping("member/my-page")
    public ResponseEntity<SingleResponseDto> toMyPage(@AuthenticationPrincipal Member member){
        if(member == null){
            throw new BusinessLogicException(ExceptionCode.USER_NOT_AUTHORIZED);
        }
        Member findMember = memberService.getMember(member.getId());
        MyInfoResponseDto myInfoResponseDto = memberMapper.memberToGetMyInfoResponseDto(findMember);
        return new ResponseEntity<>(new SingleResponseDto(myInfoResponseDto), HttpStatus.OK);
    }

    /**
     * 특정 회원 조회
     */
    @GetMapping("/member/{id}")
    public ResponseEntity<SingleResponseDto> getMember(@AuthenticationPrincipal Member member, @PathVariable("id") Long memberId ){
        if(member == null){
            throw new BusinessLogicException(ExceptionCode.USER_NOT_AUTHORIZED);
        }
        Member findMember = memberService.getMember(memberId);
        GetMemberResponseDto getMemberResponseDto = memberMapper.memberToGetMemberResponseDto(findMember);
        return new ResponseEntity<>(new SingleResponseDto(getMemberResponseDto), HttpStatus.OK);
    }

    /**
     * 회원 탈퇴
     */
    @DeleteMapping("/member")
    public ResponseEntity<Void> deleteMember(@AuthenticationPrincipal Member member){
        if(member == null){
            throw new BusinessLogicException(ExceptionCode.USER_NOT_AUTHORIZED);
        }
        memberService.deleteMember(member.getUsername());
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    /**
     * 아이디 찾기
     */
    public ResponseEntity<Void> findUsername(){
        return null;
    }
}