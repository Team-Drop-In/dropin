import styled from "styled-components";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Container, Content } from "../../styles/style";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import LogoImage from "../../images/logo.svg";

const Login = () => {
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();

  const emailOptions = {
    required: "이메일을 입력해주세요.",
    pattern: {
      value:
        /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
      message: "@를 포함한 이메일 주소를 적어주세요.",
    },
  };
  const passwordOptions = {
    required: "비밀번호를 입력해주세요.",
    pattern: {
      value:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      message:
        "비밀번호는 8자 이상으로 하나 이상의 대문자, 소문자, 숫자, 특수문자를 포함해주세요.",
    },
  };

  const onFormSubmit = (data) => {
    console.log("폼 제출", data);
    setError((prev) => !prev);
  };

  return (
    <Wrap>
      <Contain>
        <Logo src={LogoImage} alt="로고" className="logo_img" />
        <Form onSubmit={handleSubmit(onFormSubmit)}>
          <Controller
            name={"username"}
            control={control}
            rules={emailOptions}
            render={({ field, fieldState: { error } }) => (
              <Input
                id="email"
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
            name={"password"}
            control={control}
            rules={passwordOptions}
            render={({ field, fieldState: { error } }) => (
              <Input
                label="비밀번호"
                type="password"
                placeholder="비밀번호"
                errorMessage={error?.message}
                onChange={field.onChange}
                value={field.value || ""}
              />
            )}
          />
          {error && <ErrorMsg>정보가 일치하지 않습니다</ErrorMsg>}
          <Button
            text={"로그인"}
            width={"100%"}
            height={"40px"}
            style={{ marginTop: "10px" }}
            type="submit"
          />
        </Form>
        <More>
          <Find>
            <Link>아이디</Link> / <Link to="/findpwd">비밀번호</Link> 찾기
          </Find>
          <Google>구글</Google>
        </More>
      </Contain>
    </Wrap>
  );
};

export default Login;

const Wrap = styled(Container)`
  label {
    display: none;
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

const Form = styled.form`
  width: 350px;
  margin-top: 35px;
  margin-bottom: 12px;
`;

const ErrorMsg = styled.div`
  width: 100%;
  padding: 0 2px;
  text-align: right;
`;

const More = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const Find = styled.article`
  font-size: 14px;
`;
const Google = styled.div`
  width: 350px;
  margin-top: 40px;
  text-align: center;
`;