import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { addProduct } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useGetProductQuery } from "../redux/productApi";

const Container = styled.div``;

const Wrapper = styled.div`
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: start;
  justify-content: center;
`;

const Image = styled.img`
  max-width: 100%;
  width: 60vh;
  ${mobile({ width: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: ${(props) => (props.color && props.size ? "flex" : "hidden")};
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
  margin-right: 10px;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: ${(props) => (props.selected ? "2px" : "1px")} solid lightgray;
  margin-right: 7px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid #7487bf;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid #7487bf;
  background-color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    background-color: #7487bf;
    color: white;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data: product } = useGetProductQuery(id);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src={product?.image} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product?.title}</Title>
          <Description>{product?.description}</Description>
          <Price>${product?.price}</Price>
          <FilterContainer
            color={product?.color?.length}
            size={product?.size?.length}
          >
            {product?.color?.length > 0 && (
              <Filter>
                <FilterTitle>Color</FilterTitle>
                {product?.color?.map((c) => (
                  <FilterColor
                    color={c}
                    key={c}
                    selected={c === color}
                    onClick={() => setColor(c)}
                  />
                ))}
              </Filter>
            )}
            {product?.size?.length > 0 && (
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize onChange={(e) => setSize(e.target.value)}>
                  {product?.size?.map((s) => (
                    <FilterSizeOption key={s} value={s}>
                      {s}
                    </FilterSizeOption>
                  ))}
                </FilterSize>
              </Filter>
            )}
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove
                onClick={() => handleQuantity("dec")}
                style={{
                  cursor: `${quantity > 1 ? "pointer" : "not-allowed"}`,
                }}
              />
              <Amount>{quantity}</Amount>
              <Add
                onClick={() => handleQuantity("inc")}
                style={{ cursor: "pointer" }}
              />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default Product;
