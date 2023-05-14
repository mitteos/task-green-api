import {AuthContext} from "context/Wrapper";
import React, {useContext, useState, useEffect} from "react";
import styled from "styled-components";
import {MessageItem} from "../MessageItem";
import {MessageState, NotificationState} from "components/Message/types";
import {SendMessageForm} from "components/Message/SendMessageForm";
import {ChatState} from "components/Chat/types";

interface NotificationListProps {
    notification: NotificationState | null;
}

export const MessageList: React.FC<NotificationListProps> = ({
                                                                 notification,
                                                             }) => {
        const {selectedChat, setSelectedChat} = useContext(AuthContext);
        const [messagesCollection, setMessagesCollection] = useState<MessageState[]>([]);


        useEffect(() => {
            if (!notification) {
                setMessagesCollection([])
            }
            if(notification) {
                const curNotification: MessageState = {
                    id: notification?.body.timestamp || 0,
                    text: notification?.body.messageData.textMessageData.textMessage || "",
                    chatId: notification?.body.senderData.sender || "",
                    createdAt: notification?.body.timestamp || 0,
                    type: "received",
                    receiptId: notification?.receiptId
                }
                const newCollection = [...messagesCollection, curNotification].sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)
                setMessagesCollection(newCollection)
            }
        }, [notification])

        return (
            <Container isOpen={!!selectedChat.id}>
                <Header>
                    <BackButton onClick={() => setSelectedChat({} as ChatState)}>&larr;</BackButton>
                    <p>
                        {selectedChat.id
                            ? selectedChat.id.split("@")[0]
                            : "Выберите пользователя"}
                    </p>
                </Header>
                <List>
                    {!!messagesCollection.length &&
                        messagesCollection.map((el) => el.chatId === selectedChat.id && (
                            <MessageItem key={el.id} messageInfo={el}/>
                        ))}
                </List>
                {!!selectedChat.id && (
                    <SendMessageForm
                        messagesCollection={messagesCollection}
                        setMessagesCollection={setMessagesCollection}
                    />
                )}
            </Container>
        );
    }
;

const Container = styled.div<{ isOpen: boolean }>`
  background: #f0f2f5;
  flex: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  @media (max-width: 550px) {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    transition: all .3s ease;
    transform: translateX(${({isOpen}) => isOpen ? 0 : "100%"});
  }
`;
const BackButton = styled.button`
  border-radius: 100%;
  padding: 6px 8px 8px 8px;
  cursor: pointer;
  border: none;
  display: none;
  @media (max-width: 550px) {
    display: block;
  }
`
const Header = styled.div`
  width: 100%;
  padding: 20px;
  background: #fff;
  display: flex;
  gap: 15px;
  align-items: center;
`;
const List = styled.div`
  flex: auto;
  background: #F0F2F5;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 15px;
  padding: 20px;
`;
