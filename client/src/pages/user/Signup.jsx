import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Container, Content } from "../../styles/style";
import { COLOR } from "../../styles/theme";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import LogoImage from "../../images/logo.svg";

const Signup = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();

  const emailOptions = {
    required: "이메일을 입력해주세요.",
    pattern: {
      value:
        /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
      message: "@를 포함한 이메일 주소를 적어주세요",
    },
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

  const nickValidationOptions = {};

  const onFormSubmit = (data) => {
    console.log(data);
  };

  return (
    <Wrap>
      <Contain>
        <Logo src={LogoImage} alt="로고" className="logo_img" />
        <Title>회원가입</Title>
        <Form onSubmit={handleSubmit(onFormSubmit)}>
          {/* <Form> */}
          <div>
            <Controller
              name={"email"}
              control={control}
              rules={emailOptions}
              render={({ field, fieldState: { error } }) => (
                <Input
                  id="email"
                  label="이메일"
                  type="text"
                  width={"300px"}
                  placeholder="이메일을 입력해주세요"
                  errorMessage={error?.message}
                  onChange={field.onChange}
                  value={field.value || ""}
                />
              )}
            />
            <Button
              text={"중복확인"}
              width={"110px"}
              height={"39px"}
              style={{ marginTop: "20px", marginLeft: "5px" }}
            />
          </div>
          <div>
            <Controller
              name={"emailAuth"}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  id="emailAuth"
                  label="인증번호"
                  type="text"
                  width={"300px"}
                  placeholder="발송된 인증번호를 입력해주세요"
                  errorMessage={error?.message}
                  onChange={field.onChange}
                  value={field.value || ""}
                />
              )}
            />
            <Button
              text={"인증번호 발송"}
              width={"110px"}
              height={"39px"}
              style={{ marginTop: "20px", marginLeft: "5px" }}
            />
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
            render={({ field, fieldState: { error } }) => (
              <Input
                label="비밀번호 확인"
                type="password"
                width={"300px"}
                placeholder="비밀번호를 한번 더 입력해주세요"
                errorMessage={error?.message}
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
                  render={({ field }) => (
                    <StyledRadioInput
                      type="radio"
                      value="남"
                      checked={field.value === "남"}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
                <span>남</span>
              </label>
              <label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <StyledRadioInput
                      type="radio"
                      value="여"
                      checked={field.value === "여"}
                      onChange={(e) => field.onChange(e.target.value)}
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
                  width={"300px"}
                  placeholder="닉네임을 입력해 주세요"
                  errorMessage={error?.message}
                  onChange={field.onChange}
                  value={field.value || ""}
                />
              )}
            />
            <Button
              text={"중복확인"}
              width={"110px"}
              height={"39px"}
              style={{ marginTop: "20px", marginLeft: "5px" }}
            />
          </div>
          <Button
            text={"회원가입"}
            width={"100%"}
            height={"40px"}
            style={{ marginTop: "10px" }}
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