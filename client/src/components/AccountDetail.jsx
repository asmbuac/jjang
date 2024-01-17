import { EditOutlined } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  padding: 15px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e6e6e6;
  padding: 10px;
  margin-bottom: 10px;

  &:focus-within {
    border-color: black;
  }
`;

const Label = styled.label`
  font-size: 12px;
  color: gray;
  text-transform: capitalize;
  margin-left: 2px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 8px;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 10px;
  border: 2px solid;
  border-color: ${(props) => props.bc};
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DetailTitle = styled.span`
  font-size: 12px;
  color: gray;
  text-transform: capitalize;
`;

const Data = styled.span``;

const EditButton = styled(EditOutlined)`
  cursor: pointer;
`;

const AccountDetail = ({ label, field, data, type }) => {
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.table(Object.fromEntries(formData));
  };

  if (showForm) {
    return (
      <Container>
        <Form onSubmit={handleSubmit}>
          {field !== "name" ? (
            <InputContainer>
              <Label htmlFor={field}>{label}</Label>
              <Input type={type} id={field} name={field} defaultValue={data} />
            </InputContainer>
          ) : (
            <>
              <InputContainer>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type={type}
                  id="firstName"
                  name="firstName"
                  defaultValue={data?.firstName}
                />
              </InputContainer>
              <InputContainer>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type={type}
                  id="lastName"
                  name="lastName"
                  defaultValue={data?.lastName}
                />
              </InputContainer>
            </>
          )}
          <ButtonContainer>
            <Button
              bc="black"
              bg="white"
              color="black"
              type="button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
            <Button bc="black" bg="black" color="white" type="submit">
              Save
            </Button>
          </ButtonContainer>
        </Form>
      </Container>
    );
  }

  return (
    <Container>
      <DetailContainer>
        <DetailTitle>{label}</DetailTitle>
        <Data>
          {field === "name" ? `${data.firstName} ${data.lastName}` : data}
        </Data>
      </DetailContainer>
      <EditButton onClick={() => setShowForm(true)} />
    </Container>
  );
};

export default AccountDetail;
