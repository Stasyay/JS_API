const initialSchedule = JSON.parse(initialData);

const scheduleKey = 'schedule';

if (!localStorage.getItem(scheduleKey)) {
    localStorage.setItem(scheduleKey, JSON.stringify(initialSchedule));
}

function getRows() {
    return JSON.parse(localStorage.getItem(scheduleKey));
}

function saveRows(rows) {
    localStorage.setItem(scheduleKey, JSON.stringify(rows));
}

export { getRows, saveRows }