import React from "react";
import styled from "styled-components";

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className }) => {
    return <Inner className={className}>{children}</Inner>;
};

const Inner = styled.button`
    border-radius: 10px;
    padding: 10px 0;
    border: 1px solid #000;
    cursor: pointer;
`;
