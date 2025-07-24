import { v4 as uuidv4 } from 'uuid';
import WK_Model from '../Model/WK_Model';

type WS_Start = {
    Id: string, 
    TimeUTC: number, 
    Date: string,
    Hours: number,
    Minutes: number,
    Seconds: number
}

function startSession()
{
    const Today = new Date();

    const WS_Start: WS_Start = {
        Id : uuidv4(),
        TimeUTC: Date.now(),
        Date: `${Today.getFullYear()}-${Today.getMonth()}-${Today.getDate()}`,
        Hours: Today.getHours(),
        Minutes: Today.getMinutes(),
        Seconds: Today.getSeconds()
    }

    localStorage.setItem(WS_Start.Id, JSON.stringify(WS_Start));
    localStorage.setItem("currentSessionId", WS_Start.Id);

    return WS_Start;
}

function finishSession(StartedSessionId: string)
{
    const Item = localStorage.getItem(StartedSessionId);

    if(Item != null)
    {
        const StartedSession: WS_Start = JSON.parse(Item);

        const Today = new Date();

        const finishedSession = new WK_Model(
            uuidv4(),
            Date.now(),
            `${Today.getFullYear()}-${Today.getMonth()}-${Today.getDate()}`,
            StartedSession.Hours,
            StartedSession.Minutes,
            StartedSession.Seconds,
            Today.getHours(),
            Today.getMinutes(),
            Today.getSeconds()
        )

        localStorage.removeItem(StartedSessionId);
        localStorage.setItem(finishedSession.Id, JSON.stringify(finishedSession));

        return finishedSession;
    }
    else{
        console.error("No started session was found");
    }
}

export { startSession, finishSession }