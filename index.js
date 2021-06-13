// Your code here
function createEmployeeRecord (array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: parseInt(array[3]),
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array) {
    let records = []
    array.forEach(element => {
        records.push(createEmployeeRecord(element))
    });
    return records
}

function createTimeInEvent (employee, timeStamp) {
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(timeStamp.split(' ')[1]),
        date: timeStamp.split(' ')[0]
    })
    return employee
}

function createTimeOutEvent (employee, timeStamp) {
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(timeStamp.split(' ')[1]),
        date: timeStamp.split(' ')[0]
    })
    return employee
}

function hoursWorkedOnDate (employee, date) {
    let timeIn = employee.timeInEvents.find(time => time.date == date)
    let timeOut = employee.timeOutEvents.find(time => time.date === date)

    return (parseInt(timeOut.hour - timeIn.hour) / 100)
}

function wagesEarnedOnDate(employee, date) {
    return(hoursWorkedOnDate(employee, date) * employee.payPerHour)
}

function allWagesFor(employee) {
    const dates = employee.timeInEvents.map((e) => e.date)
    return dates.reduce((acc,curr) => (acc + wagesEarnedOnDate(employee, curr)), 0)
}

function findEmployeeByFirstName(records, name) {
    return records.find(employee => (employee.firstName === name))
}

function calculatePayroll(records) {
    return records.reduce((acc, curr) => acc + allWagesFor(curr), 0)
}