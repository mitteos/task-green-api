import {AuthContext} from "context/Wrapper";
import React, {useContext} from "react";
import styled from "styled-components";
import {AuthState} from "components/Auth/types";

export const AuthControl: React.FC = () => {
    const {authState, setAuthState} = useContext(AuthContext);

    const handleLogoutClick = () => {
        localStorage.removeItem("auth")
        setAuthState({} as AuthState)
    }

    return <Container>
        <Title>ID: {authState.IdInstance}</Title>
        <LogoutButton onClick={handleLogoutClick}>Выйти</LogoutButton>
    </Container>;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px;
  background: #F0F2F5;
`;
const Title = styled.p`
  font-size: 14px;
  font-weight: 700;
`
const LogoutButton = styled.button`
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid #bfc1c4;
  transition: all .3s ease;
  color: #545657;

  &:hover {
    border: 1px solid #de5b5b;
    color: #de5b5b;
  }
`
