export interface medSheetItem{
    id: number;    
    linesPerItem:number;
    medicationName:string;
    frequency: Array<string>[];
    doctorOrder: string;
    month: string;
    day: string;
    year: string;
    initial: string;
    signiture: string;
}