function createEmployeeRecord ([firstName, familyName, title, payPerHour]) {
    const obj = {
        firstName: `${firstName}`,
        familyName: `${familyName}`,
        title: `${title}`,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
    }
    return obj;
};


function createEmployeeRecords (arrays) {
return arrays.map(element => element = createEmployeeRecord(element))
};


function createTimeInEvent (employeeObject, dateHour = "YYYY-MM-DD HHMM"){
  let obj = {
    type : "TimeIn",
    hour : parseInt(dateHour.slice(10)),
    date : dateHour.slice(0,10),
  };
  employeeObject.timeInEvents.push(obj);
  return employeeObject;
};

function createTimeOutEvent (employeeObject, dateHour = "YYYY-MM-DD HHMM"){
  let obj = {
    type : "TimeOut",
    hour : parseInt(dateHour.slice(10)),
    date : dateHour.slice(0,10),
  };
  employeeObject.timeOutEvents.push(obj);
  return employeeObject;
};

function hoursWorkedOnDate(employeeObject, date="YYYY-MM-DD"){
  let timeIn = employeeObject.timeInEvents.filter(checkIn => checkIn.date === date);
  let timeOut = employeeObject.timeOutEvents.filter(checkOut => checkOut.date === date);
  return (parseInt(timeOut[0].hour)-parseInt(timeIn[0].hour))/100;
}

function wagesEarnedOnDate (employeeObject, date="YYYY-MM-DD"){
  let hoursWorked = hoursWorkedOnDate(employeeObject, date);
  let rate  = employeeObject.payPerHour;
  return (parseInt(hoursWorked))*(parseInt(rate));
}

function allWagesFor (employeeObject){
  let dates = employeeObject.timeInEvents.map(workingDates => workingDates.date);
  return dates.reduce((acc, date) => acc + wagesEarnedOnDate (employeeObject, date),0);
}

function calculatePayroll(employeeArr) {
  return employeeArr.reduce((acc, payroll) => acc + allWagesFor(payroll),0);
}

function findEmployeeByFirstName (srcArray, firstName){
  return srcArray.find((employee) => employee.firstName === firstName);
}
