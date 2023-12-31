import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SvgIcon } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 130px);
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://res.heraldm.com/content/image/2022/08/24/20220824000086_0.jpg")
      center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({ minHeight: "calc(100vh - 100px)" })}
`;

const Logo = styled.img`
  width: 60px;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  max-width: 300px;
`;

const UsernameInput = styled.input`
  width: 100%;
  margin: 10px 0px 5px 0px;
  padding: 10px;
  border: 1px solid darkgray;
  outline: none;
  font-size: 16px;
  ${mobile({ fontSize: "14px" })}

  &:focus {
    border-color: black;
  }

  &::placeholder {
    color: darkgray;
  }
`;

const PasswordContainer = styled.div`
  width: 100%;
  margin: 10px 0px 5px 0px;
  padding: 10px;
  border: 1px solid darkgray;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:focus-within {
    border-color: black;
  }
`;

const PasswordInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  ${mobile({ fontSize: "14px" })}

  &::placeholder {
    color: darkgray;
  }
`;

const Icon = styled(SvgIcon)`
  height: 20px !important;
  width: 20px !important;
  color: darkgray;
  ${mobile({ height: "18px !important", width: "18px !important" })}

  &:hover {
    cursor: pointer;
  }
`;

const Button = styled.button`
  margin: 15px 0px 10px 0px;
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: #7487bf;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    background-color: #183888;
  }

  &:disabled {
    background-color: #183888;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  text-align: center;
`;

const LoginLink = styled(Link)`
  margin: 10px 0px;
  font-size: 12px;
  text-decoration: underline;
  text-underline-position: under;
  cursor: pointer;
  transition: all 300ms ease;

  &:visited {
    color: black;
  }

  &:hover {
    color: #7487bf;
  }
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.auth);

  const handleClick = async (e) => {
    e.preventDefault();

    const res = await login(dispatch, { username, password });
    if (!res) {
      setUsername("");
      setPassword("");
      setShowPassword(false);
    } else {
      setErrorMsg(res.response?.data);
    }
  };

  return (
    <Container>
      <Logo src="src/assets/logo.png" />
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <UsernameInput
            placeholder="Username or Email"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordContainer>
            <PasswordInput
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <Icon
                component={VisibilityIcon}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <Icon
                component={VisibilityOffIcon}
                onClick={() => setShowPassword(true)}
              />
            )}
          </PasswordContainer>
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>{errorMsg}</Error>}
          <LinkContainer>
            <LoginLink to="">FORGOT PASSWORD?</LoginLink>
            <LoginLink to="/register">CREATE A NEW ACCOUNT</LoginLink>
          </LinkContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
