// scripts.js

// Function to create an array of a given length with values from 0 to length-1
const createArray = (length) => Array.from({ length }, (_, i) => i);

// Function to generate data for a calendar
const createData = () => {
  // Get the current date and set it to the first day of the month
  const current = new Date();
  current.setDate(1);

  // Get the day of the week (0-6) and the number of days in the month
  const startDay = current.getDay();
  const daysInMonth = getDaysInMonth(current);

  // Calculate the number of weeks needed to display the month
  const weeks = createArray(Math.ceil((startDay + daysInMonth) / 7));
  const daysOfWeek = createArray(7);
  const result = weeks.map((weekIndex) => ({
    // Week number
    week: weekIndex + 1,
    // Days of the week
    days: daysOfWeek.map((dayIndex) => {
      // Calculate the day of the month (1-31)
      const day = weekIndex * 7 + dayIndex - startDay + 1;
      // Check if the day is valid (not outside the month)
      const isValid = day > 0 && day <= daysInMonth;
      return {
        // Day of the week (1-7)
        dayOfWeek: dayIndex + 1,
        // Day of the month (1-31) or empty string if not valid
        value: isValid ? day : "",
      };
    }),
  }));

  return result;
};

// Function to create a table cell with a given class and value
const createCell = (classString, value) => `
  <td class="${classString}">
    ${value} 
  </td>
`;

// Function to generate the HTML for the calendar
const createHtml = (data) => data.map(({ week, days }) => {
  // Create a cell for the week number
  const weekCell = createCell("table_cell table_cell_sidebar", `Week ${week}`);
  // Create cells for the days of the week
  const dayCells = days.map(({ dayOfWeek, value }) => {
    // Check if the day is today, a weekend, or an alternate week
    const isToday = new Date().getDate() === value;
    const isWeekend = dayOfWeek === 1 || dayOfWeek === 7;
    const isAlternate = week % 2 === 0;
    let classString = "table__cell";
    if (isToday) classString += " table__cell_today";
    if (isWeekend) classString += " table__cell_weekend";
    if (isAlternate) classString += " table__cell_alternate";
    return createCell(classString, value);
  }).join("");

  // Return a table row with the week number and day cells
  return `<tr>${weekCell}${dayCells}</tr>`;
}).join("");

// Get the current month and year
const current = new Date();
document.querySelector("[data-title]").innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`;

// Generate the calendar data and HTML
const data = createData();
document.querySelector("[data-content]").innerHTML = createHtml(data);