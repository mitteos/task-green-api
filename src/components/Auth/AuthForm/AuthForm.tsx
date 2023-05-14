import {AuthContext} from "context/Wrapper";
import React, {useState, useContext} from "react";
import styled from "styled-components";
import {AuthState} from "components/Auth/types";
import {Button, Input} from "components/UI";

export const AuthForm: React.FC = () => {
    const [formValues, setFormValues] = useState<AuthState>({
        ApiTokenInstance: "",
        IdInstance: "",
    });
    const {setAuthState} = useContext(AuthContext)

    const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formValues.ApiTokenInstance && formValues.IdInstance) {
            setAuthState(formValues);
            localStorage.setItem("auth", JSON.stringify(formValues))
        }
    };

    return (
        <Container>
            <Content>
                <Title>Авторизация</Title>
                <Form onSubmit={(e) => handleAuth(e)}>
                    <Input
                        value={formValues.IdInstance}
                        label="IdInstance"
                        placeholder="Введите Instance"
                        setValue={(e) => setFormValues({...formValues, IdInstance: e})}
                    />
                    <Input
                        value={formValues.ApiTokenInstance}
                        label="ApiTokenInstance"
                        placeholder="Введите Token"
                        setValue={(e) => setFormValues({...formValues, ApiTokenInstance: e})}
                    />
                    <FormButton>Сохранить</FormButton>
                </Form>
            </Content>
        </Container>
    );
};

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
`;
const Content = styled.div`
  padding: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  margin: 30px 0;
  gap: 20px;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
`;
const Title = styled.p`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const FormInput = styled.input`
  border-radius: 10px;
  border: 1px solid #000;
  padding: 10px;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  }
`;
const FormButton = styled(Button)`
  border-radius: 10px;
  padding: 10px 0;
  cursor: pointer;
  border: 1px solid #bfc1c4;
  transition: all .3s ease;
  color: #545657;
  background: none;

  &:hover {
    border: 1px solid #25D366;
    color: #25D366;
  }
`;
