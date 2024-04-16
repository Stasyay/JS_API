import { getRows, saveRows } from './storage.js';

const scheduleTable = getRows();

const tableBodyEl = document.querySelector('tbody');

scheduleTable.forEach((row) => {

    tableBodyEl.insertAdjacentHTML('beforeend', createRow(row));
});

function createRow(row) {
    return `           
    <tr class="rowShedule" data-id="${row.id}">
        <td class="nameClass">${row.name}</td>
        <td class="timeClass">${row.time}</td>
        <td class="maxParticipantsInClass">${row.maxParticipants}</td>
        <td class="currentParticipantsInClass">${row.currentParticipants}</td>
        <td> <button class="registration">Записаться</button></td>
        <td> <button class="cancelRegistration">Отменить запись</button></td>
    </tr>`
}

const rowsSheduleEl = document.querySelectorAll('.rowShedule');

rowsSheduleEl.forEach(row => {
    const maxParticipantsInClass = Number(row.querySelector('.maxParticipantsInClass').textContent);
    const currentParticipantsInClass = Number(row.querySelector('.currentParticipantsInClass').textContent);
    row.querySelector('.cancelRegistration').disabled = true;
    if (currentParticipantsInClass >= maxParticipantsInClass) {
        row.querySelector('.registration').disabled = true;
        row.querySelector('.cancelRegistration').disabled = false;
    }
});


tableBodyEl.addEventListener('click', ({ target }) => {

    if (target.closest('.registration')) {
        const scheduleTable = getRows();

        const rowSheduleEl = target.closest('.rowShedule');
        const scheduleId = rowSheduleEl.dataset.id;

        const editingRow = scheduleTable.find((row) => row.id === Number(scheduleId));

        const maxParticipantsInClass = editingRow.maxParticipants
        let currentParticipantsInClass = editingRow.currentParticipants

        if (currentParticipantsInClass <= maxParticipantsInClass) {
            rowSheduleEl.querySelector('.registration').disabled = true;
            rowSheduleEl.querySelector('.cancelRegistration').disabled = false;

            currentParticipantsInClass = currentParticipantsInClass + 1;
            rowSheduleEl.querySelector('.currentParticipantsInClass').innerHTML = currentParticipantsInClass

            editingRow.currentParticipants = currentParticipantsInClass;
            saveRows(scheduleTable);
        }
    }

    if (target.closest('.cancelRegistration')) {
        const scheduleTable = getRows();

        const rowSheduleEl = target.closest('.rowShedule');

        const scheduleId = rowSheduleEl.dataset.id;
        const editingRow = scheduleTable.find((row) => row.id === Number(scheduleId));

        const maxParticipantsInClass = editingRow.maxParticipants

        let currentParticipantsInClass = editingRow.currentParticipants

        if (currentParticipantsInClass <= maxParticipantsInClass) {
            rowSheduleEl.querySelector('.registration').disabled = false;
            rowSheduleEl.querySelector('.cancelRegistration').disabled = true;

            currentParticipantsInClass = currentParticipantsInClass - 1;
            rowSheduleEl.querySelector('.currentParticipantsInClass').innerHTML = currentParticipantsInClass

            editingRow.currentParticipants = currentParticipantsInClass;
            saveRows(scheduleTable);
        }
    }
})
