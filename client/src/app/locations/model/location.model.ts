export interface Location {
    id: number;
    seqNo:number;
    name:string;
    iconUrl: string;
    phoneNum: string;
    city: string;
    zip?: string;
    address: string;
    state: number;
   
  }
  
  
  export function compareLocations(c1:Location, c2: Location) {
  
    const compare = c1.seqNo - c2.seqNo;
  
    if (compare > 0) {
      return 1;
    }
    else if ( compare < 0) {
      return -1;
    }
    else return 0;
  
  }