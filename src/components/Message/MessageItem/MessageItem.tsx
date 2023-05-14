import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "context/Wrapper";
import {MessageState, NotificationState} from "components/Message/types";

interface NotificationItemProps {
    messageInfo?: MessageState;
}

export const MessageItem: React.FC<NotificationItemProps> = ({ messageInfo }) => {

    const {authState} = useContext(AuthContext)


    useEffect(() => {
        const removeNotification = async () => {
            if(messageInfo?.type === "received") {
                await axios.delete(`https://api.green-api.com/waInstance${authState.IdInstance}/deleteNotification/${authState.ApiTokenInstance}/${messageInfo.receiptId}`)
            }
        }
        removeNotification()
    }, []);

    return (
        <Container isMyMessage={messageInfo?.type === "sent"}>
            <Text>{messageInfo?.text}</Text>
        </Container>
    );
};

const Container = styled.div<{isMyMessage: boolean}>`
    border-radius: 5px;
    padding: 15px;
    max-width: 200px;
    min-width: 100px;
    background: #fff;
    align-self: ${({isMyMessage}) => isMyMessage ? "flex-end" : "flex-start"}
`;
const Text = styled.p`
    font-size: 14px;
    font-weight: 500;
`;
