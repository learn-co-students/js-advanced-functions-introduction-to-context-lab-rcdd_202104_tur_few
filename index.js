// Your code here
function createEmployeeRecord(arr){
    let employee = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}
function createEmployeeRecords(arr) {
    let employees = []
    arr.forEach(element => {
        employees.push(createEmployeeRecord(element))
    });
    return employees
}
function createTimeInEvent(employee, timeStamp) {
    let hour = parseInt(timeStamp.split(' ')[1])
    let date = timeStamp.split(' ')[0]
    employee.timeInEvents.push({type: "TimeIn", hour: hour, date: date})
    return employee
}

function createTimeOutEvent(employee, timeStamp) {
    let hour = parseInt(timeStamp.split(' ')[1])
    let date = timeStamp.split(' ')[0]
    employee.timeOutEvents.push({type: "TimeOut", hour: hour, date: date})
    return employee
}
function hoursWorkedOnDate(employee, timeStamp){
    let timeIn = employee.timeInEvents.find(x => x.date === timeStamp)
    let timeOut = employee.timeOutEvents.find(x => x.date === timeStamp)
    let hours = (timeOut.hour - timeIn.hour) / 100
    return hours
}
function wagesEarnedOnDate(employee, timeStamp){
    return hoursWorkedOnDate(employee, timeStamp) * employee.payPerHour
}
function allWagesFor(employee){
    let dates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let earn = dates.reduce(function(acc, curr){
        return acc + wagesEarnedOnDate(employee, curr)
    }, 0)

    return earn
}
function findEmployeeByFirstName(employees, firstName){
    return employees.find(employee => employee.firstName === firstName)
}

function calculatePayroll(employees){
    let sum = employees.reduce((acc, curr) => (acc + allWagesFor(curr)), 0);
    return sum
}

