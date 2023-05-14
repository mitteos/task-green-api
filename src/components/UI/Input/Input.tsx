import React from "react";
import styled from "styled-components";

interface InputProps {
    value: string;
    setValue: (e: string) => void;
    label: string;
    className?: string;
    placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
    value,
    setValue,
    label,
    className,
    placeholder
}) => {
    return (
        <Container className={className}>
            <p>{label}</p>
            <InputInner
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </Container>
    );
};

const Container = styled.label`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;
const InputInner = styled.input`
    width: 100%;
    border-radius: 10px;
    border: 1px solid #dbdee1;
    padding: 10px;
    font-size: 14px;
    transition: all 0.3s ease;
    &:focus {
        outline: none;
        box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
    }
`;
