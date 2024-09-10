export interface Medication {
    id: number;
   
    name:string;
    seqNo:number;
   
  }
  
  
  export function compareMedications(c1:Medication, c2: Medication) {
  
    const compare = c1.seqNo - c2.seqNo;
  
    if (compare > 0) {
      return 1;
    }
    else if ( compare < 0) {
      return -1;
    }
    else return 0;
  
  }