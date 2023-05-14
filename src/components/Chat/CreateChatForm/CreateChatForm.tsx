import { Button, Input } from "components/UI";
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {ChatState} from "components/Chat/types";

interface CreateChatFormProps {
    list: ChatState[];
    setList: React.Dispatch<React.SetStateAction<ChatState[]>>;
}

export const CreateChatForm: React.FC<CreateChatFormProps> = ({
    list,
    setList,
}) => {
    const [value, setValue] = useState("");
    const [isUnknown, setIsUnknown] = useState(false);

    const handleCreateChat = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data } = await axios.post(
            "https://api.green-api.com/waInstance1101818602/checkWhatsapp/022fb2de497742349b48bfa40acda57dde003220027e4e1d86",
            {
                phoneNumber: value,
            }
        );

        if (data.existsWhatsapp) {
            if (!list.map((el) => el.id).includes(`${value}@c.us`)) {
                setList([{ id: `${value}@c.us` }, ...list]);
                setValue("")
            }
            setIsUnknown(false);
        } else setIsUnknown(true);
    };

    return (
        <Container>
            <Form onSubmit={(e) => handleCreateChat(e)}>
                <FormInput
                    value={value}
                    setValue={setValue}
                    label="Добавить чат"
                    placeholder="Введите номер"
                />
                <FormButton>Создать</FormButton>
            </Form>
            {isUnknown && (
                <UnknownMessage>Пользователь не найден</UnknownMessage>
            )}
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    padding: 10px 10px 30px 10px;
    border-bottom: 1px solid #000;
`;
const Form = styled.form`
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 15px;
`;
const FormInput = styled(Input)`
    width: 100%;
`;
const FormButton = styled(Button)`
  padding: 10px;
  border: none;
  background: #F0F2F5;
  transition: all .3s ease;
  &:hover {
    background: #dbdee1;
  }
`;
const UnknownMessage = styled.p`
    color: #da3030;
    margin: 10px 0 0 0;
`;
