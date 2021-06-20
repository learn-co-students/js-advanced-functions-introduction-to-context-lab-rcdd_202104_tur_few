// Your code here
function createEmployeeRecord(arr) {
  let object = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return object
}

function createEmployees(arrayOfArrays) {
      let newArray = []
    arryOfArrays.forEach (e => {
        newArray.push(createEmployeeRecord(e))
    });
    return newArray
}

function createEmployeeRecords(arryOfArrays) {
  let newArray = []
    arryOfArrays.forEach(e => {
        newArray.push(createEmployeeRecord(e))
    });
    return newArray
}

function createTimeInEvent(object, dateStamp){
  let hour = parseInt(dateStamp.split(' ')[1])
  let date = dateStamp.split(' ')[0]
  object.timeInEvents.push({type: "TimeIn", hour: hour, date: date})
  return object
}

function createTimeOutEvent(object, dateStamp){
  let hour = parseInt(dateStamp.split(' ')[1])
  let date = dateStamp.split(' ')[0]
  object.timeOutEvents.push({type: "TimeOut", hour: hour, date: date})
  return object
}

function hoursWorkedOnDate(object, dateStamp) {
  let timeIn = object.timeInEvents.find(x => x.date === dateStamp)
  let timeOut = object.timeOutEvents.find(x => x.date === dateStamp)
  let hoursWorked = (timeOut.hour - timeIn.hour) / 100
  return hoursWorked
}

function wagesEarnedOnDate(object, dateStamp) {
  return hoursWorkedOnDate(object, dateStamp) * object.payPerHour
}

function allWagesFor(object) {
  let availableDates = object.timeInEvents.map(function(e){
    return e.date
  })
  
  let pay = availableDates.reduce(function(acc, curr){
    return acc + wagesEarnedOnDate(object, curr)
  }, 0)
  
  return pay
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(e => {return e.firstName === firstName})
}


function calculatePayroll(array){
    let sum = array.map((e) => allWagesFor(e))
    return sum.reduce((num, sum) => num + sum)
}