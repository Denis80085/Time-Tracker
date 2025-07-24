class WK_Model
{
    Id!: string; 
    TimeUTC!: number; 
    Date!: string;
    StartHours!: number;
    StartMinutes!: number;
    StartSeconds!: number;
    EndHours!: number;
    EndMinutes!: number;
    EndSeconds!: number;

    constructor(
        Id: string, 
        TimeUTC: number, 
        Date: string, 
        StartHours: number, 
        StartMinutes: number,
        StartSeconds: number,
        EndHours: number,
        EndMinutes: number,
        EndSeconds: number)
    {
        this.Id = Id;
        this.TimeUTC = TimeUTC;
        this.Date = Date;
        this.StartHours = StartHours;
        this.StartMinutes = StartMinutes;
        this.StartSeconds = StartSeconds;
        this.EndSeconds = EndSeconds;
        this.EndHours = EndHours;
        this.EndMinutes = EndMinutes;
    }
}

export default WK_Model;