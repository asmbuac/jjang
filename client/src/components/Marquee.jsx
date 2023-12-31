import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 40px;
  background-color: #f5fafd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  position: relative;

  ${mobile({ height: "30px", fontSize: "12px" })}
`;

const Marquee = () => {
  return (
    <Container>
      <marquee>
        <b>New Arrivals: </b>BLACKPINK - Official Light Stick Version 2 | ATEEZ
        Lightstick | Jisoo (BLACKPINK) - 1st Single Album + YG Select Benefits
      </marquee>
    </Container>
  );
};

export default Marquee;
