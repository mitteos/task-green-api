import React, { useEffect, useState, useContext } from "react";
import { ChatItem } from "../ChatItem";
import styled from "styled-components";
import { getNotification } from "http/requests";
import { CreateChatForm } from "../CreateChatForm";
import { AuthContext } from "context/Wrapper";
import { Spinner } from "components/UI";
import { AuthControl } from "components/Auth";
import {NotificationState} from "components/Message/types";
import {ChatState} from "components/Chat/types";

interface ChatListProps {
    notification: NotificationState | null;
    setNotification: React.Dispatch<
        React.SetStateAction<NotificationState | null>
    >;
}

export const ChatList: React.FC<ChatListProps> = ({
    notification,
    setNotification,
}) => {
    const [list, setList] = useState<ChatState[]>([]);
    const { authState, setSelectedChat } = useContext(AuthContext);
    const [isPending, setIsPending] = useState<boolean>(false);

    const getNotificationHandler = async () => {
        setIsPending(true);
        const res = await getNotification(
            authState.IdInstance,
            authState.ApiTokenInstance
        );
        setIsPending(false);
        setSelectedChat({} as ChatState);
        setNotification(res);
    };

    useEffect(() => {
        getNotificationHandler();
    }, []);

    return (
        <Container>
            <AuthControl />
            <CreateChatForm list={list} setList={setList} />
            <NotificationContainer>
                <RefreshButton
                    onClick={getNotificationHandler}
                    isPending={isPending}
                >
                    {isPending ? <Spinner /> : <p>Обновить</p>}
                </RefreshButton>
                <Title>Уведомления</Title>
                {notification ? (
                    <ChatItem id={notification.body.senderData.sender} isNotification={true}/>
                ) : (
                    <EmptyText>Новых уведомлений нет</EmptyText>
                )}
            </NotificationContainer>
            <ChatsContainer>
                <Title>Сообщения</Title>
                {list.length ?
                    list.map((chat) => <ChatItem key={chat.id} id={chat.id} />)
                : <EmptyText>Добавьте чат</EmptyText>
                }
            </ChatsContainer>
        </Container>
    );
};

const Container = styled.div`
  max-width: 400px;
  max-height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e0e0e0;
  @media (max-width: 550px) {
    max-width: none;
    width: 100%;
  }
`;
const RefreshButton = styled.button<{ isPending: boolean }>`
  justify-self: stretch;
  padding: ${({isPending}) => (isPending ? 7 : 10)}px 0;
  cursor: pointer;
  margin: 0 10px 10px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #25D366;
  background-color: #fff;
  border-radius: 10px;
  color: #25D366;
  transition: background-color .3s ease, color .3s ease;
  &:hover {
    background-color: ${({isPending}) => !isPending && "#25D366"};
    color: #fff;
  }
`;
const Title = styled.p`
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 10px;
  padding: 0 10px;
`;
const EmptyText = styled.div`
  font-size: 14px;
  color: #1f1f1f;
  padding: 0 10px;
`;
const NotificationContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid #000;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;
const ChatsContainer = styled.div`
  padding: 10px 0;
`
