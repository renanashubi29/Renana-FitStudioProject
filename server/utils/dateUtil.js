/**
 * הופכת אובייקט תאריך או מחרוזת תאריך לפורמט YYYY-MM-DD נקי
 */
export const getDateToString = (date) => {
  if (!date) return ''; 
  //אם הגיע מחרוזת מהDB
  const d = new Date(date);
  
  // בדיקה שהתאריך תקין כדי למנוע שגיאות NaN או קריסה
  if (isNaN(d.getTime())) return ''; 

  return d.toISOString().split('T')[0];
};
export const getMinutesFromStartOfDay = (timeStr) => {

   const [hours, minutes] = timeStr.split(':');
  const totalMinutes = (Number(hours) * 60) + Number(minutes);

  return totalMinutes;
};
/**
 * מקבלת אובייקט תאריך ומחזירה מחרוזת שעה בפורמט HH:mm
 * @param {Date} dateObj - אובייקט תאריך (למשל new Date())
 * @returns {string} - שעה בפורמט "14:30"
 */
export const extractTimeFromDate = (dateObj) => {
  // padStart דואג שאם השעה היא 9, נקבל "09"
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  
  return `${hours}:${minutes}`;
};
export const getCurrentWeekRange = (dateInput = new Date()) => {
    // הופכים את הקלט לאובייקט Date (למקרה שנשלח מחרוזת או Timestamp)
    const referenceDate = new Date(dateInput);
    
    const dayOfWeek = referenceDate.getDay(); // 0 (ראשון) עד 6 (שבת)
    
    // חישוב תחילת השבוע (יום ראשון)
    const startOfWeek = new Date(referenceDate);
    startOfWeek.setDate(referenceDate.getDate() - dayOfWeek);
    startOfWeek.setHours(0, 0, 0, 0); 

    // חישוב סוף השבוע (יום שבת)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999); 

    return { startOfWeek, endOfWeek };
};
export const getNextDateByDayName = (dayName, itemTime) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    
    // 1. חילוץ שעה ודקות נוכחיות לצורך השוואה (פורמט HH:mm)
    const currentHours = now.getHours().toString().padStart(2, '0');
    const currentMinutes = now.getMinutes().toString().padStart(2, '0');
    const currentTimeStr = `${currentHours}:${currentMinutes}`;

    // 2. מציאת האינדקס של היום המבוקש והיום הנוכחי
    const targetDayIndex = daysOfWeek.indexOf(dayName);
    const currentDayIndex = now.getDay(); // משתמשים ב-getDay המקומי כדי להתאים לשעה המקומית

    // 3. חישוב בסיסי של ימים להוספה
    let daysToAdd = (targetDayIndex - currentDayIndex + 7) % 7;

    // 4. הלוגיקה המבוקשת: אם זה היום, אבל השעה כבר עברה - קפוץ שבוע קדימה
    if (daysToAdd === 0 && itemTime <= currentTimeStr) {
        daysToAdd = 7;
    }

    // 5. יצירת התאריך הסופי (בפורמט UTC 00:00 כפי שעבדנו עד כה)
    const targetDate = new Date(Date.UTC(
        now.getFullYear(), 
        now.getMonth(), 
        now.getDate() + daysToAdd, 
        0, 0, 0, 0
    ));

    return targetDate;
};