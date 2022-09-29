
export default class DateHelper {
    
    private static gregorianDaysInMonth:any =  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    private static hijriShamsiDaysInMonth:any =  [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
   
    
    /**
     * 
     * @param hijriShamsiYear 
     * @param hijriShamsiMonth 
     * @param hijriShamsiDay 
     * @returns 
     */
    private static covertFromShamsiToGregorian(hijriShamsiYear:any, hijriShamsiMonth:any, hijriShamsiDay:any){
        hijriShamsiYear = parseInt(hijriShamsiYear);
        hijriShamsiMonth = parseInt(hijriShamsiMonth);
        hijriShamsiDay = parseInt(hijriShamsiDay);
        let year = hijriShamsiYear - 979;
        let month = hijriShamsiMonth - 1;
        let day = hijriShamsiDay - 1;
    
        let hijriShamsiDayay_no = 365 * year + Math.floor(year/33) * 8 + Math.floor((year % 33 + 3) / 4);
        for (let i = 0; i < month; ++i) hijriShamsiDayay_no += DateHelper.hijriShamsiDaysInMonth[i];
    
        hijriShamsiDayay_no += day;
    
        let gregorianDayNo = hijriShamsiDayay_no + 79;
    
        let gregorianYear = 1600 + 400 * Math.floor(gregorianDayNo / 146097); 
        gregorianDayNo = gregorianDayNo % 146097;
    
        let jump = true;
        if (gregorianDayNo >= 36525)
        {
            gregorianDayNo--;
            gregorianYear += 100 * Math.floor(gregorianDayNo / 36524); 
            gregorianDayNo = gregorianDayNo % 36524;
    
            if (gregorianDayNo >= 365) gregorianDayNo++;
            else jump = false;
        }
    
        gregorianYear += 4 * Math.floor(gregorianDayNo / 1461); 
        gregorianDayNo %= 1461;
    
        if (gregorianDayNo >= 366) {
            jump = false;
    
            gregorianDayNo--;
            gregorianYear += Math.floor(gregorianDayNo / 365);
            gregorianDayNo = gregorianDayNo % 365;
        }
    
        for (var i = 0; gregorianDayNo >= (DateHelper.gregorianDaysInMonth[i]) + Math.floor(Number((i == 1 && jump))); i++)
        gregorianDayNo -= (DateHelper.gregorianDaysInMonth[i]) + Math.floor(Number((i == 1 && jump)));
        let gregorianMonth:any = i + 1;
        let gregorianDay:any = gregorianDayNo + 1;
    
        gregorianMonth = gregorianMonth < 10 ? '0' + gregorianMonth : gregorianMonth;
        gregorianDay = gregorianDay < 10 ? '0' + gregorianDay : gregorianDay;
    
        return [gregorianYear, gregorianMonth, gregorianDay];
    }

    
    /**
     * 
     * @param HijriShamiDateValue (YYYY-MM-DD)
     * @return GregorianDateValue (YYYY-MM-DD)
     */
    static convertHijriShamsiDateIntoGregorian(HijriShamiDateValue:any){
        let gregorianDateValue = HijriShamiDateValue,
        dateSplitted = gregorianDateValue.split("-"),
        day = DateHelper.covertFromShamsiToGregorian(dateSplitted[0], dateSplitted[1],  dateSplitted[2]);
        return day.join(',');
    }

}
