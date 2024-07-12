export interface Location {
    id: number;
    seqNo:number;
    url:string;
    iconUrl: string;
    courseListIcon: string;
    description: string;
    longDescription?: string;
    category: string;
    lessonsCount: number;
    promo: boolean;
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