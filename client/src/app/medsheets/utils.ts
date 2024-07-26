export const weekOfYear = date => {
    const startOfYear: any = new Date(date.getFullYear(), 0, 1);
    startOfYear.setDate(startOfYear.getDate() + (startOfYear.getDay() % 7));
    return Math.round((date - startOfYear) / 604_800_000);
  };

 export const monthOfYear = date => date.getMonth() + 1;


 export const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
