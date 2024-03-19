function createEmployeeRecord(information){
    return  {
        firstName: information[0],
        familyName: information[1],
        title: information[2],
        payPerHour: information[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
function createEmployeeRecords(infoArray) {
    const recordArray = [];
    infoArray.forEach(element => {
        recordArray.push(createEmployeeRecord(element));
    });
    return recordArray;
}

function createTimeInEvent(record,timeString) {
    const timeIn = {
        type: "TimeIn",
        date: timeString.split(" ")[0],
        hour: Number(timeString.split(" ")[1])
    }
    record.timeInEvents.push(timeIn);
    return record;
}

function createTimeOutEvent(record,timeString) {
    const timeOut = {
        type: "TimeOut",
        date: timeString.split(" ")[0],
        hour: Number(timeString.split(" ")[1])
    }
    record.timeOutEvents.push(timeOut);
    return record;
}

function hoursWorkedOnDate(record,date) {
    const eventsIn = record.timeInEvents;
    const eventsOut = record.timeOutEvents;
    let index;
    for (let i = 0; i < eventsIn.length; i++) {
        if(eventsIn[i].date === date && eventsOut[i].date === date){
            index = i;
            i = record.length
        }
    }
    return (eventsOut[index].hour - eventsIn[index].hour)/100;
}

function wagesEarnedOnDate(record,date) {
    return hoursWorkedOnDate(record,date)*record.payPerHour;
}

function allWagesFor(record) {
    return record.timeInEvents.reduce((accumulator, eventIn) => {
        return accumulator+wagesEarnedOnDate(record,eventIn.date);
    },0)
}

function calculatePayroll(employees) {
    return employees.reduce((accumulator,record) => {
        return accumulator + allWagesFor(record);
    },0)
}