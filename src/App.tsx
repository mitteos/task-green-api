import { AuthForm } from "components/Auth";
import React, {useContext, useEffect, useState} from "react";
import { AuthContext } from "context/Wrapper";
import { ChatList } from "components/Chat";
import styled from "styled-components";
import { MessageList } from "components/Message";
import {NotificationState} from "components/Message/types";

export const App: React.FC<{}> = () => {
    const { authState, setAuthState } = useContext(AuthContext);
    const [notification, setNotification] = useState<NotificationState | null>(null)

    useEffect(() => {
        const auth = localStorage.getItem("auth")
        if(auth) {
            const state = JSON.parse(auth)
            setAuthState(state)
        }
    }, [])

    return (
        <div>
            {!authState.IdInstance ? (
                <AuthForm />
            ) : (
                <Container>
                    <ChatList notification={notification} setNotification={setNotification} />
                    <MessageList notification={notification} />
                </Container>
            )}
        </div>
    );
};

const Container = styled.div`
    display: flex;
    width: 100%;
`
