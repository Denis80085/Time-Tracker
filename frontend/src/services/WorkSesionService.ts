import { v4 as uuidv4 } from 'uuid';

type WS_Start = {
    Id: string, 
    TimeUTC: number, 
    Date: string,
    Hours: number,
    Minutes: number,
    Seconds: number
}

type WS_Finished = {
    Id: string, 
    TimeUTC: number, 
    Date: string,
    StartHours: number,
    StartMinutes: number,
    StartSeconds: number,
    EndHours: number,
    EndMinutes: number,
    EndSeconds: number
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

        const finishedSession: WS_Finished = {
            Id: uuidv4(),
            TimeUTC: Date.now(),
            Date: `${Today.getFullYear()}-${Today.getMonth()}-${Today.getDate()}`,
            StartHours: StartedSession.Hours,
            StartMinutes: StartedSession.Minutes,
            StartSeconds: StartedSession.Seconds,
            EndHours: Today.getHours(),
            EndMinutes: Today.getMinutes(),
            EndSeconds: Today.getSeconds()
        }

        localStorage.removeItem(StartedSessionId);
        localStorage.setItem(finishedSession.Id, JSON.stringify(finishedSession));

        return finishedSession;
    }
    else{
        console.error("No started session was found");
    }
}

export { startSession, finishSession }