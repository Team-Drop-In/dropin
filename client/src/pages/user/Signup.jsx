import styled from "styled-components";
import { Container, Content } from "../../styles/style";
import { COLOR } from "../../styles/theme";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import LogoImage from "../../images/logo.svg";
import {
  signupApi,
  duplicateEmailApi,
  duplicateNicknameApi,
  getAuthCodeApi,
  checkAuthCodeApi,
} from "../../apis/api";

const Signup = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    getValues,
    formState: { isValid },
  } = useForm();
  const [emailValue, setEmailValue] = useState("");
  const [nicknameValue, setNicknameValue] = useState("");
  const [authcodeValue, setAuthcodeValue] = useState("");
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const [isEmailError, setIsEmailError] = useState(true);
  const [isNicknameError, setIsNicknameError] = useState(true);
  const [getAuthCode, setIsGetAuthCode] = useState(false);
  const [checkAuthCode, setIsCheckAuthCode] = useState(false);

  const emailOptions = {
    required: "이메일을 입력해주세요.",
    pattern: {
      value:
        /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
      message: "@를 포함한 이메일 주소를 적어주세요",
    },
  };

  const authOptions = {
    required: "인증번호를 입력해주세요", // 필드가 비어있을 때 표시될 오류 메시지
  };

  const passwordOptions = {
    required: "비밀번호를 입력해주세요",
    validate: (value) => {
      if (value.length < 8) {
        return "비밀번호는 8자 이상이어야 합니다";
      }

      const hasUppercase = /[A-Z]/.test(value);
      const hasLowercase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&()]/.test(value);

      if (!(hasUppercase && hasLowercase && hasNumber && hasSpecialChar)) {
        return "대/소문자, 숫자, 특수문자를 포함해야 합니다";
      }

      return true;
    },
  };

  const passwordCheckOptions = {
    required: "비밀번호를 한번 더 입력해주세요",
    validate: (value) => {
      const password = getValues("password");
      if (value === password) {
        return true;
      } else {
        return "비밀번호와 일치하지 않습니다";
      }
    },
  };

  const GENDER_OPTIONS = ["UNSELECTED", "MALE", "FEMALE"];

  const nameValidationOptions = {
    required: "이름을 입력해주세요.",
    minLength: {
      value: 2,
      message: "이름은 최소 2글자 이상이어야 합니다",
    },
    maxLength: {
      value: 10,
      message: "이름은 최대 10글자까지 가능합니다",
    },
    pattern: {
      value: /^[^\s0-9]+$/,
      message: "이름에는 공백과 숫자를 포함할 수 없습니다",
    },
  };

  const nickValidationOptions = {
    required: "닉네임을 입력해주세요.",
    minLength: {
      value: 2,
      message: "닉네임은 최소 2글자 이상이어야 합니다.",
    },
    maxLength: {
      value: 20,
      message: "닉네임은 최대 20글자까지 가능합니다.",
    },
    pattern: {
      value: /^[A-Za-z가-힣]+$/,
      message: "닉네임은 한글과 영어만 사용 가능합니다.",
    },
    validate: (value) => {
      if (/\s/.test(value)) {
        return "닉네임에 공백을 포함할 수 없습니다.";
      }
      return true;
    },
  };

  const handleEmailAvailability = async () => {
    const data = {
      username: emailValue,
    };

    if (!emailValue.trim()) return;
    if (!emailOptions.pattern.value.test(emailValue)) return;

    try {
      console.log(data);
      await duplicateEmailApi(data);
      setIsEmailAvailable(true);
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const handleNicknameAvailability = async () => {
    const validateResult = nickValidationOptions.validate(nicknameValue);
    if (!nicknameValue.trim()) return;
    if (nickValidationOptions.minLength.value > nicknameValue.length) return;
    if (nickValidationOptions.maxLength.value < nicknameValue.length) return;
    if (!nickValidationOptions.pattern.value.test(nicknameValue)) return;
    if (validateResult !== true) return;

    try {
      await duplicateNicknameApi({ nickname: nicknameValue });
      setIsNicknameAvailable(true);
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const handleGetAuthCode = async () => {
    try {
      await getAuthCodeApi({ username: emailValue });
      setIsGetAuthCode(true);
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const handleSendAuthCode = async () => {
    const data = {
      username: emailValue,
      verificationCode: authcodeValue,
    };

    try {
      await checkAuthCodeApi(data);
      setIsCheckAuthCode(true);
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const onFormSubmit = async ({ emailAuth, passwordcheck, ...data }) => {
    try {
      await signupApi(data);
      navigate("/login");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  useEffect(() => {
    const isValidEmail =
      emailOptions.pattern.value.test(emailValue) &&
      emailValue.trim().length > 0;
    setIsEmailError(!isValidEmail);
  }, [emailValue]);

  useEffect(() => {
    const isNicknameValid =
      nicknameValue.trim().length >= nickValidationOptions.minLength.value &&
      nicknameValue.trim().length <= nickValidationOptions.maxLength.value &&
      nickValidationOptions.pattern.value.test(nicknameValue) &&
      !/\s/.test(nicknameValue);

    setIsNicknameError(!isNicknameValid);
  }, [nicknameValue]);

  return (
    <Wrap>
      <Contain>
        <Logo src={LogoImage} alt="로고" className="logo_img" />
        <Title>회원가입</Title>
        <Form onSubmit={handleSubmit(onFormSubmit)}>
          <div>
            <Controller
              name="username"
              control={control}
              rules={emailOptions}
              render={({ field, fieldState: { error } }) => (
                <Input
                  id="username"
                  label="이메일"
                  type="text"
                  disabled={isEmailAvailable}
                  width={"300px"}
                  placeholder="이메일을 입력해주세요"
                  errorMessage={error?.message}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setEmailValue(e.target.value);
                  }}
                  value={field.value || ""}
                />
              )}
            />
            {isEmailAvailable ? (
              <Button
                text={"확인완료"}
                type="button"
                width={"110px"}
                height={"39px"}
                style={{
                  marginTop: "20px",
                  marginLeft: "5px",
                  backgroundColor: `${COLOR.main_yellow}`,
                }}
              />
            ) : (
              <Button
                text={"중복확인"}
                type="button"
                width={"110px"}
                height={"39px"}
                style={{
                  marginTop: "20px",
                  marginLeft: "5px",
                  backgroundColor: !isEmailError
                    ? ` ${COLOR.main_yellow}`
                    : ` ${COLOR.btn_grey}`,
                }}
                onClick={handleEmailAvailability}
              />
            )}
          </div>
          <div>
            <Controller
              name={"emailAuth"}
              rules={authOptions}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  id="emailAuth"
                  label="인증번호"
                  type="text"
                  width={"300px"}
                  placeholder="발송된 인증번호를 입력해주세요"
                  errorMessage={error?.message}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setAuthcodeValue(e.target.value);
                  }}
                  value={field.value || ""}
                />
              )}
            />
            {getAuthCode ? (
              <Button
                text={checkAuthCode ? "확인완료" : "인증하기"}
                type="button"
                width={"110px"}
                height={"39px"}
                style={{
                  marginTop: "20px",
                  marginLeft: "5px",
                  backgroundColor: checkAuthCode
                    ? ` ${COLOR.main_yellow}`
                    : ` ${COLOR.gender_pink}`,
                }}
                onClick={handleSendAuthCode}
              />
            ) : (
              <Button
                text={"인증번호 발송"}
                type="button"
                width={"110px"}
                height={"39px"}
                style={{
                  marginTop: "20px",
                  marginLeft: "5px",
                  backgroundColor: isEmailAvailable
                    ? ` ${COLOR.main_yellow}`
                    : ` ${COLOR.btn_grey}`,
                }}
                onClick={handleGetAuthCode}
              />
            )}
          </div>
          <Controller
            name={"password"}
            control={control}
            rules={passwordOptions}
            render={({ field, fieldState: { error } }) => (
              <Input
                label="비밀번호"
                type="password"
                width={"300px"}
                placeholder="비밀번호를 입력해주세요"
                errorMessage={error?.message}
                onChange={field.onChange}
                value={field.value || ""}
              />
            )}
          />
          <Controller
            name={"passwordcheck"}
            control={control}
            rules={passwordCheckOptions}
            render={({ field, fieldState: { error } }) => (
              <Input
                label="비밀번호 확인"
                type="password"
                width={"300px"}
                placeholder="비밀번호를 한번 더 입력해주세요"
                errorMessage={error?.message}
                onChange={(e) => field.onChange(e.target.value)}
                value={field.value || ""}
              />
            )}
          />
          <div>
            <Controller
              name={"name"}
              control={control}
              rules={nameValidationOptions}
              render={({ field, fieldState: { error } }) => (
                <Input
                  id="name"
                  label="이름"
                  type="text"
                  width={"300px"}
                  height={"39px"}
                  placeholder="이름을 입력해 주세요"
                  errorMessage={error?.message}
                  onChange={field.onChange}
                  value={field.value || ""}
                />
              )}
            />
            <Gender>
              <label>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue={GENDER_OPTIONS[0]} // 초기값을 "UNSELECTED"로 설정
                  render={({ field }) => (
                    <StyledRadioInput
                      type="radio"
                      value={GENDER_OPTIONS[1]}
                      checked={field.value === GENDER_OPTIONS[1]}
                      onChange={() => field.onChange(GENDER_OPTIONS[1])}
                    />
                  )}
                />
                <span>남</span>
              </label>
              <label>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue={GENDER_OPTIONS[0]}
                  render={({ field }) => (
                    <StyledRadioInput
                      type="radio"
                      value={GENDER_OPTIONS[2]}
                      checked={field.value === GENDER_OPTIONS[2]}
                      onChange={() => field.onChange(GENDER_OPTIONS[2])}
                    />
                  )}
                />
                <span>여</span>
              </label>
            </Gender>
          </div>
          <div>
            <Controller
              name={"nickname"}
              control={control}
              rules={nickValidationOptions}
              render={({ field, fieldState: { error } }) => (
                <Input
                  id="nickname"
                  label="닉네임"
                  type="text"
                  disabled={isNicknameAvailable}
                  width={"300px"}
                  placeholder="닉네임을 입력해 주세요"
                  errorMessage={error?.message}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setNicknameValue(e.target.value);
                  }}
                  value={field.value || ""}
                />
              )}
            />
            {isNicknameAvailable ? (
              <Button
                text={"확인완료"}
                type="button"
                width={"110px"}
                height={"39px"}
                style={{
                  marginTop: "20px",
                  marginLeft: "5px",
                  backgroundColor: `${COLOR.main_yellow}`,
                }}
              />
            ) : (
              <Button
                text={"중복확인"}
                type="button"
                width={"110px"}
                height={"39px"}
                style={{
                  marginTop: "20px",
                  marginLeft: "5px",
                  backgroundColor: !isNicknameError
                    ? ` ${COLOR.main_yellow}`
                    : ` ${COLOR.btn_grey}`,
                }}
                disabled={!nicknameValue.trim()}
                onClick={handleNicknameAvailability}
              />
            )}
          </div>
          <Button
            text={"회원가입"}
            width={"100%"}
            height={"40px"}
            style={{
              marginTop: "10px",
              backgroundColor:
                isValid && isNicknameAvailable && isEmailAvailable
                  ? `${COLOR.main_yellow}`
                  : `${COLOR.btn_grey}`,
              cursor: isValid ? "pointer" : "default",
            }}
            type="submit"
          />
        </Form>
      </Contain>
    </Wrap>
  );
};

export default Signup;

const Wrap = styled(Container)`
  label {
    font-size: 14px;
  }
`;

const Contain = styled(Content)`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.img`
  margin-top: 50px;
  width: 180px;
`;

const Title = styled.span`
  margin-top: 12px;
  font-size: 20px;
  color: ${COLOR.main_grey};
`;

const Form = styled.form`
  width: 415px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;
  margin-bottom: 12px;

  & > div {
    display: flex;
    align-items: flex-start;
  }
`;

const Gender = styled.div`
  width: 110px;
  height: 39px;
  display: flex;
  margin-top: 15px;
  margin-left: 5px;
  justify-content: space-between;

  label:first-of-type > span {
    border-radius: 5px 0 0 5px;
  }

  label:last-of-type > span {
    border-radius: 0 5px 5px 0;
  }
`;

const StyledRadioInput = styled.input`
  display: none;

  + span {
    display: inline-block;
    height: 39px;
    width: 54px;
    font-weight: bold;
    text-align: center;
    color: black;
    cursor: pointer;
    text-align: center;
    padding: 11px;
    margin-top: 5px;
    background-color: #818181;
  }

  &:checked + span {
    background-color: ${COLOR.main_yellow};
    color: black;
  }
`;
