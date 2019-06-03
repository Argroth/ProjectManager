const Calendar = require('../model/calendar-model');
const moment = require('moment');

exports.getCalendar = (req, res) => {
    //Calendar.find({day: {$gte: '2019-05-01', $lt: '2019-06-01'}}, (err, calendar) => {
    Calendar.find({}, (err, calendar) => {
        if(err){
            res.json('Error while fetching data');
        }else{
            let calendarArray = [];

                for(let i=0; i<calendar.length; i++){
                    calendarArray.push({_id: calendar[i]._id, day: moment(calendar[i].day).format("YYYY-MM-DD"), offWork: calendar[i].offWork, description: calendar[i].description, name: calendar[i].name});
                }

            res.json(calendarArray);
            }

    })
};


exports.updateDate = (req, res) => {
    Calendar.findOneAndUpdate({_id: req.body.date._id}, {$set:{offWork: req.body.date.offWork, description: req.body.date.description}}, (err) => {
        if(err){
            res.json('There was a problem updating record!');
        }else{
            res.json('Record updated successfully');
        }
    });
};

exports.sortDate = (req, res) => {
    //Calendar.find({day: {$gte: '2019-05-01', $lt: '2019-06-01'}}, (err, calendar) => {

    Calendar.find({day: {$regex: "2019", "$options": "i"}},(err, results) => {
      res.json(results);
  });
};

//new Calendar generation
//Use only once!
exports.generateCalendar = (req, res) => {
    const dayName = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
    let days = [];
    for(let i=1; i<730; i++) {

        const dayOfTheWeek = new Date(new Date().getFullYear(), 0, i).getDay();
        if(dayOfTheWeek === 0 || dayOfTheWeek === 6){
            days.push({day: new Date(new Date().getFullYear(), 0, i), offWork: true, description: 'Weekend', name: dayName[dayOfTheWeek]});
        }
        else{
            days.push({day: new Date(new Date().getFullYear(), 0, i), offWork: false, description: ' ', name: dayName[dayOfTheWeek]});
        }
    }

    Calendar.insertMany(days, (err) => {
        res.json('done');
    });
};