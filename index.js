// Your code here
function createEmployeeRecord ([firstName, familyName, title, payRate]) {
    const object = { firstName: `${firstName}`, familyName: `${familyName}`, title: `${title}`, payPerHour: payRate, timeInEvents: [], timeOutEvents: [] }
    return object
}

function createEmployeeRecords (Arrays) {
const outputArray = []; 
    Arrays.forEach(element => {
        outputArray.push(createEmployeeRecord(element))
    });
return outputArray
}

function createTimeInEvent (employeeRecordObject = createEmployeeRecord(["ali", "veli", "a", "b", "c"]), dateStamp ="2014-02-28 1400") {
    const addObject = { 
        type : "TimeIn",
        hour : parseInt(dateStamp.slice(11)), //-4
        date : dateStamp.slice(0,10)
    }
    employeeRecordObject.timeInEvents.push(addObject)
return employeeRecordObject
}

function createTimeOutEvent (employeeRecordObject = createEmployeeRecord(["ali", "veli", "a", "b", "c"]), dateStamp ="2014-02-28 1400") {
    let [date, hour] = dateStamp.split(' ')
    const addObject = { 
        type : "TimeOut",
        hour : parseInt(hour, 10),
        date,
    }
    employeeRecordObject.timeOutEvents.push(addObject)
return employeeRecordObject
}

// let hoursWorkedOnDate = function(employee, soughtDate){
//     let inEvent = employee.timeInEvents.find(function(e){
//         return e.date === soughtDate
//     })

//     let outEvent = employee.timeOutEvents.find(function(e){
//         return e.date === soughtDate
//     })
//     // console.log(outEvent.hour - inEvent.hour)

//     return (outEvent.hour - inEvent.hour) / 100
// }

function hoursWorkedOnDate (employeeRecordObject , dateStamp) { 
const dateTimeIn = employeeRecordObject.timeInEvents.find(({date}) => date === dateStamp)
const dateTimeOut = employeeRecordObject.timeOutEvents.find(({date}) => date === dateStamp)
// console.log(dateStamp)
// console.log(employeeRecordObject)
// console.log(employeeRecordObject.timeOutEvents)
// console.log((dateTimeOut.hour-dateTimeIn.hour)/100)
return (dateTimeOut.hour-dateTimeIn.hour)/100
}    

// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000])
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
// hoursWorkedOnDate(cRecord, "0044-03-15")

function wagesEarnedOnDate (employeeRecordObject , dateStamp) {
    return hoursWorkedOnDate(employeeRecordObject, dateStamp)*employeeRecordObject.payPerHour
}

// let cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// let updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100")
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
// console.log(allWagesFor(cRecord))

function allWagesFor (employeeRecordObject) {
    const datesArray = employeeRecordObject.timeInEvents.map(day => day.date)
    // console.log(wagesEarnedOnDate(employeeRecordObject, datesArray[1]))
    // console.log(datesArray.reduce((total, date) => wagesEarnedOnDate(employeeRecordObject, total) + wagesEarnedOnDate(employeeRecordObject, date)))
    return (datesArray.reduce((total, date) => total + wagesEarnedOnDate(employeeRecordObject, date), 0))
}

function calculatePayroll (srcArray) {
return srcArray.reduce((total,element) => total + allWagesFor(element), 0)
}

// let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
// let sRecord = createEmployeeRecord(["Simba", "", "King", 100])
// let sTimeData = [
//   ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
//   ["2019-01-02 1000", "2019-01-02 1300"]  // 3 * 100 = 300 ===> 700 total
// ]
// let rTimeData = [
//   ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
//   ["2019-01-12 1000", "2019-01-12 1300"]  // 3 * 10 = 40 ===> 70 total ||=> 770
// ]
// sTimeData.forEach(function (d) {
//     let [dIn, dOut] = d
//     sRecord = createTimeInEvent(sRecord, dIn)
//     sRecord = createTimeOutEvent(sRecord, dOut)
//   })
// rTimeData.forEach(function (d, i) {
//     let [dIn, dOut] = d
//     rRecord = createTimeInEvent(rRecord, dIn)
//     rRecord = createTimeOutEvent(rRecord, dOut)
//   })
// let employees = [sRecord, rRecord]
// let grandTotalOwed = employees.reduce((m, e) => m + allWagesFor(e), 0)
// console.log(calculatePayroll(employees))

function findEmployeeByFirstName (srcArray, firstName) {
    return srcArray.find ((employee) => employee.firstName === firstName);
}



// Full Payroll Test SET
const csvDataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300]
  ]

  const csvTimesIn = [
    ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
    ["Natalia", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1300"]],
    ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
    ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
  ]

  const csvTimesOut = [
    ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Natalia", ["2018-01-01 2300", "2018-01-02 2300", "2018-01-03 2300"]],
    ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
    ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]
  ]

         let employeeRecords = createEmployeeRecords(csvDataEmployees)
        employeeRecords.forEach(function (rec) {
          let timesInRecordRow = csvTimesIn.find(function (row) {
            return rec.firstName === row[0]
          })

          let timesOutRecordRow = csvTimesOut.find(function (row) {
            return rec.firstName === row[0]
          })

          timesInRecordRow[1].forEach(function(timeInStamp){
            createTimeInEvent(rec, timeInStamp)
          })

          timesOutRecordRow[1].forEach(function(timeOutStamp){
            createTimeOutEvent(rec, timeOutStamp)
          })
        })
calculatePayroll(employeeRecords) //12480
