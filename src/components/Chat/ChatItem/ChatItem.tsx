import { AuthContext } from "context/Wrapper";
import React, {useContext} from "react";
import styled from "styled-components";

interface ChatItemProps {
    id: string;
    isNotification?: boolean;
}

export const ChatItem: React.FC<ChatItemProps> = ({id, isNotification = false}) => {
    const {setSelectedChat} = useContext(AuthContext)
    return (
        <Container onClick={() => setSelectedChat({id})} isNotification={isNotification}>
            <Number>{id.split("@")[0]}</Number>
        </Container>
    )
}
const Container = styled.div<{isNotification: boolean}>`
    padding: 30px 15px;
    width: 100%;
    border-bottom: ${({isNotification}) => !isNotification && "1px solid #666666"};
    transition: all .3s ease;
    cursor: pointer;
    &:hover {
        background: #ececec;
    }
`
const Number = styled.p`
    font-weight: 500;
`