export interface MessageState {
    id: number;
    chatId: string;
    createdAt: number;
    text: string;
    type: "received" | "sent";
    receiptId?: number
}

export interface NotificationState {
    receiptId: number;
    body: {
        senderData: {
            sender: string;
            senderName: string;
        };
        messageData: {
            textMessageData: {
                textMessage: string;
            }
        }
        timestamp: number;
    }
}
