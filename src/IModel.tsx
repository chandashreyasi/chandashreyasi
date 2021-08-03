export interface IModel
{
    OperationalProcessCode:string,
    OperationalProcessName:string,
    JobServiceAndChargeId:number,
    ParentFk:number,
    subtask:IModel
}