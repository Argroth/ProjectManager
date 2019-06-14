const calendarController = require('../controller/calendar-controller');

module.exports = (app) => {
    app.get('/calendar/get-dates', calendarController.getCalendar);
    app.post('/calendar/date-update', calendarController.updateDate);
    app.get('/calendar/generate', calendarController.generateCalendar);
};