import React, { useState } from "react";
import {ChatState} from "components/Chat/types";
import {AuthState} from "components/Auth/types";

interface OnboardingContextValue {
    authState: AuthState;
    setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
    selectedChat: ChatState;
    setSelectedChat: React.Dispatch<React.SetStateAction<ChatState>>;
}

interface OnboardingProviderProps {
    children: React.ReactNode;
}

export const AuthContext = React.createContext<OnboardingContextValue>({
    authState: { ApiTokenInstance: "", IdInstance: "" },
    setAuthState: () => {},
    selectedChat: { id: "" },
    setSelectedChat: () => {},
});

export const Wrapper: React.FC<OnboardingProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({
        ApiTokenInstance: "",
        IdInstance: "",
    });
    const [selectedChat, setSelectedChat] = useState({id: ""})
    return (
        <AuthContext.Provider value={{ authState, setAuthState, selectedChat, setSelectedChat }}>
            {children}
        </AuthContext.Provider>
    );
};
