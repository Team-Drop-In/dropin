import styled from "styled-components";
import { Container, Content } from "../../styles/style";
import { COLOR } from "../../styles/theme";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import FindMessage from "../../components/user/FindMessage";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { findPwdApi } from "../../apis/api";

const findword = "임시 비밀번호";

const FindPwd = () => {
  const [findpwd, setFindPwd] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm();

  const emailValidationOptions = {
    required: "이메일을 입력해주세요.",
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "올바른 이메일 형식이 아닙니다.",
    },
  };

  const nameValidationOptions = {
    required: "이름을 입력해주세요.",
    minLength: {
      value: 2,
      message: "이름은 최소 2글자 이상이어야 합니다.",
    },
    maxLength: {
      value: 10,
      message: "이름은 최대 10글자까지 가능합니다.",
    },
    pattern: {
      value: /^[^\s0-9]+$/,
      message: "이름에는 공백과 숫자를 포함할 수 없습니다.",
    },
  };

  const onFormSubmit = async (data) => {
    try {
      await findPwdApi(data);
      setFindPwd(true);
    } catch (error) {
      console.log(error);
      console.error("비밀번호 찾기 실패:", error);
    }
  };

  return (
    <Container>
      <Contain>
        <Title>
          <h2>비밀번호 찾기</h2>
          <p>회원가입 시 입력한 이메일과 이름을 입력해주세요</p>
        </Title>
        {!findpwd ? (
          <Form onSubmit={handleSubmit(onFormSubmit)}>
            <Controller
              name={"username"}
              control={control}
              rules={emailValidationOptions}
              render={({ field, fieldState: { error } }) => (
                <Input
                  id="username"
                  label="이메일"
                  type="text"
                  placeholder="이메일"
                  errorMessage={error?.message}
                  onChange={field.onChange}
                  value={field.value || ""}
                />
              )}
            />
            <Controller
              name={"name"}
              control={control}
              rules={nameValidationOptions}
              render={({ field, fieldState: { error } }) => (
                <Input
                  id="name"
                  label="이름"
                  type="text"
                  height={"39px"}
                  placeholder="이름을 입력해 주세요"
                  errorMessage={error?.message}
                  onChange={field.onChange}
                  value={field.value || ""}
                />
              )}
            />
            {errors.form && <ErrorMsg>일치하는 정보가 없습니다</ErrorMsg>}
            <Button
              type="submit"
              text={"확인"}
              height={"39px"}
              margin={"10px 0 0 0"}
              disabled={!isValid}
              style={{
                backgroundColor: isValid
                  ? `${COLOR.main_yellow}`
                  : `${COLOR.btn_grey}`,
                cursor: isValid ? "pointer" : "default",
              }}
            />
          </Form>
        ) : (
          <FindMessage findword={findword} />
        )}
      </Contain>
    </Container>
  );
};

export default FindPwd;

const Contain = styled(Content)`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 30px;
  width: 350px;

  h2 {
    color: ${COLOR.main_grey};
    font-size: 26px;
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }

  p {
    color: white;
    font-size: 15px;
    letter-spacing: 0.5px;
  }
`;

const Form = styled.form`
  width: 350px;
  margin-top: 15px;
`;

const ErrorMsg = styled.div`
  color: ${COLOR.main_yellow};
  font-size: 12px;
  margin-top: 4px;
`;
