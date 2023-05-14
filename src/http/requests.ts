import axios from "axios";
import {NotificationState} from "components/Message/types";

export const getNotification = async (IdInstance: string, ApiTokenInstance: string) => {
    const {data} = await axios.get<NotificationState | null>(`https://api.green-api.com/waInstance${IdInstance}/receiveNotification/${ApiTokenInstance}`)
    return data
}
