// Your code here

const createEmployeeRecord = (arr) => {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }           
};

const createEmployeeRecords = (arr) => {
    let employeeRecordArr = [];
    for(let i = 0; i < arr.length; i++){
        employeeRecordArr.push(createEmployeeRecord(arr[i]));
    }
    return employeeRecordArr;
};

const createTimeInEvent = (employee, dateStamp) => {
    employee.timeInEvents.push({
                    type: 'TimeIn',
                    hour: parseInt(dateStamp.split(' ')[1]),
                    date: dateStamp.split(' ')[0],
    });  
    return employee;
};

const createTimeOutEvent = (employee, dateStamp) => {
    employee.timeOutEvents.push({
                    type: 'TimeOut',
                    hour: parseInt(dateStamp.split(' ')[1]),
                    date: dateStamp.split(' ')[0],
    });  
    return employee;
};

const hoursWorkedOnDate = (employee, dateGiven) => {
    let timeIn = employee.timeInEvents.find(time => time.date === dateGiven);               // Find the object that has the given date.
    let timeOut = employee.timeOutEvents.find(time => time.date === dateGiven);             // Find the object that has the given date.
    return (timeOut.hour - timeIn.hour) / 100;                                              // Dividing by 100 coz 2400 - 2200 = 200, so 200/100 = 2 Hrs
};

const wagesEarnedOnDate = (employee, date) => {
    return parseInt(hoursWorkedOnDate(employee, date)) * parseInt(employee.payPerHour);
};

const allWagesFor = (employee) => {
    let date = employee.timeInEvents.map(arr => arr.date);
    let sum = date.reduce((acc, curr) => (acc + wagesEarnedOnDate(employee, curr)), 0);
    return sum;
};

const calculatePayroll = (employeeArr) => {
    let sum = employeeArr.reduce((acc, curr) => (acc + allWagesFor(curr)), 0);
    return sum;
}; 

const findEmployeeByFirstName = (employeeArr, name) => {
    return employeeArr.find(employee => employee.firstName === name);
};

