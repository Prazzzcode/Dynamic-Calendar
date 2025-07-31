const monthYear = document.getElementById('monthYear');
const daysContainer = document.getElementById('days');

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const holidays = {
  "2025-01-01": "New Year's Day",
  "2025-03-08": "International Women's Day",
  "2025-04-14": "Nepali New Year",
  "2025-05-01": "Labor Day",
  "2025-07-07": "Prazol's Birthday 🎂",
  "2025-10-20": "Dashain",
  "2025-11-07": "Tihar"
};

function formatDate(year, month, date) {
  const m = (month + 1).toString().padStart(2, '0');
  const d = date.toString().padStart(2, '0');
  return `${year}-${m}-${d}`;
}

function renderCalendar() {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
  const prevLastDate = new Date(currentYear, currentMonth, 0).getDate();

  daysContainer.innerHTML = '';
  monthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  // Previous month's inactive days
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = document.createElement('div');
    day.textContent = prevLastDate - i;
    day.classList.add('inactive');
    daysContainer.appendChild(day);
  }

  // Current month
  for (let i = 1; i <= lastDate; i++) {
    const day = document.createElement('div');
    day.textContent = i;

    const fullDate = formatDate(currentYear, currentMonth, i);

    if (
      i === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    ) {
      day.classList.add('today');
    }

    if (holidays[fullDate]) {
      day.classList.add('holiday');
      day.title = holidays[fullDate];
    }

    daysContainer.appendChild(day);
  }
}

function changeMonth(offset) {
  currentMonth += offset;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
}

renderCalendar();
