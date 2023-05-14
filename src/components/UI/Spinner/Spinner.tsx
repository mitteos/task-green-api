import React from "react";
import styled, { keyframes } from "styled-components";

interface SpinnerProps {}

export const Spinner: React.FC<SpinnerProps> = ({}) => {
    return <Container></Container>;
};

const anim = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Container = styled.div`
    display: inline-block;
    width: 25px;
    height: 25px;
    &::after {
        content: " ";
        display: block;
        width: 25px;
        height: 25px;
        margin: 0px;
        border-radius: 50%;
        border: 4px solid #fff;
        border-color: #25D366 transparent #25D366 transparent;
        animation: ${anim} 1.2s linear infinite;
    }
`;
