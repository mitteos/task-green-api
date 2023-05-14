import React, {SetStateAction, useContext, useState} from 'react';
import styled from "styled-components";
import {Button, Input} from "components/UI";
import axios from "axios";
import {MessageState} from "components/Message/types";
import {AuthContext} from "context/Wrapper";

interface SendMessageFormProps {
    messagesCollection: MessageState[];
    setMessagesCollection: React.Dispatch<SetStateAction<MessageState[]>>
}

export const SendMessageForm: React.FC<SendMessageFormProps> = ({messagesCollection, setMessagesCollection}) => {

    const [messageValue, setMessageValue] = useState("");
    const {selectedChat, authState} = useContext(AuthContext)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = {
            chatId: selectedChat.id,
            message: messageValue,
        };
        await axios
            .post(
                `https://api.green-api.com/waInstance${authState.IdInstance}/SendMessage/${authState.ApiTokenInstance}`,
                {
                    ...result,
                }
            )
            .then(({ data }) => {
                const message: MessageState = {
                    id: Date.now(),
                    chatId: selectedChat.id,
                    text: messageValue,
                    createdAt: Date.now(),
                    type: "sent"
                }
                if (data.idMessage) {
                    setMessageValue("");
                    const newCollection = [...messagesCollection, message].sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)
                    setMessagesCollection([...messagesCollection, message])
                }
            });
    };

    return (
        <Form onSubmit={(e) => handleSubmit(e)}>
            <FormInput
                label=""
                value={messageValue}
                setValue={setMessageValue}
                placeholder="Введите сообщение"
            />
            <FormButton>Отправить</FormButton>
        </Form>
    );
};

const Form = styled.form`
  width: 100%;
  padding: 15px;
  background: #fff;
  display: flex;
  gap: 10px;
`;
const FormButton = styled(Button)`
  padding: 10px;
  align-self: flex-end;
  border-radius: 8px;
  border: 1px solid #bfc1c4;
  transition: all .3s ease;
  color: #545657;
  background: none;
  &:hover {
    border: 1px solid #25D366;
    color: #25D366;
  }
`;
const FormInput = styled(Input)`
  width: 100%;
`;
