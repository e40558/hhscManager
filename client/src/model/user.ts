export interface User {
    id:number | undefined;
    email:string;
    firstName:string;
    lastName:string;
    roles: string[];
}