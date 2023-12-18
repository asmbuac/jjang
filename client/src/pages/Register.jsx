import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useCreateWishlistMutation } from "../redux/wishlistApi";
import { useDispatch } from "react-redux";
import { publicRequest } from "../requestMethods";
import { ErrorOutline } from "@mui/icons-material";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 130px);
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://media.allure.com/photos/636539c37a5b9d68f388697d/16:9/w_2240,c_limit/LE%20SSERAFIM%20interview%20lede.jpg")
      center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({ height: "calc(100vh - 100px)" })}
`;

const Logo = styled.img`
  width: 60px;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Error = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  color: tomato;
`;

const ErrorMsg = styled.span`
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border: 1px solid darkgray;
  outline: none;
  font-size: 16px;

  &:focus {
    border: 1px solid black;
  }

  &::placeholder {
    color: darkgray;
  }

  ${mobile({ fontSize: "14px" })}
`;

const Agreement = styled.span`
  font-size: 14px;
  margin: 20px 0px;
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  height: 25px;
  width: 25px;
  cursor: pointer;
  accent-color: #b38080;
  ${mobile({ flex: "1" })}
`;

const Description = styled.p`
  ${mobile({ flex: "9" })}
`;

const Button = styled.button`
  margin-bottom: 10px;
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: rosybrown;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    background-color: #804d4d;
  }
`;

const LinkContainer = styled.p`
  margin: 10px 0px;
  text-align: center;
  font-size: 12px;
`;

const LoginLink = styled(Link)`
  text-decoration: underline;
  text-underline-position: under;
  cursor: pointer;
  transition: all 300ms ease;

  &:visited {
    color: black;
  }

  &:hover {
    color: #804d4d;
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [createWishlist] = useCreateWishlistMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    } else {
      setErrorMsg("");
    }

    try {
      const res = await publicRequest.post("/auth/register", formData);

      if (res.data) {
        const { username, password } = formData;
        await login(dispatch, { username, password });
        createWishlist({ userId: res.data._id });
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      setErrorMsg(err.response?.data || err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container>
      <Logo src="src/assets/logo.png" />
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        {errorMsg.length > 0 && (
          <Error>
            <ErrorOutline />
            <ErrorMsg>{errorMsg}</ErrorMsg>
          </Error>
        )}
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="First Name"
            type="text"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
          />
          <Input
            placeholder="Last Name"
            type="text"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
          />
          <Input
            placeholder="Username"
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            placeholder="Email"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Agreement>
            <Checkbox type="checkbox" required />
            <Description>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Description>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
        <LinkContainer>
          ALREADY HAVE AN ACCOUNT? <LoginLink to="/login">SIGN IN</LoginLink>
        </LinkContainer>
      </Wrapper>
    </Container>
  );
};

export default Register;
