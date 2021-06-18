// Your code here
let array  = ["mustafa", "guldag", "manager", 4];


let createEmployeeRecord = function(array) {
    
      let newArray =  {
             firstName: array[0],
             familyName: array[1],
             title: array[2],
             payPerHour: array[3],
             timeInEvents:[],
             timeOutEvents:[],
         }
         return newArray
    
}

let createEmployeeRecords = function(employeeData){
    
    
    return employeeData.map(function(array){
        return createEmployeeRecord(array);


})
};

// let array  = ["mustafa", "guldag", "manager", 4];
// {
// firstName: array[0],
// familyName: array[1],
// title: array[2],
// payPerHour: array[3],
// timeInEvents:[],
// timeOutEvents:[],
// }

let createTimeInEvent = function(employeeRecord, dateStamp) {

    

    let newObject = {
        type:"TimeIn",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]};
    employeeRecord.timeInEvents.push(newObject);
    return employeeRecord

}

let createTimeOutEvent = function(employeeRecord, dateStamp) {
    let newObject = {
        type:"TimeOut",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]};
    employeeRecord.timeOutEvents.push(newObject);
    return employeeRecord

}

let hoursWorkedOnDate = function(employeeRecord, dateStamp) {

    
        let timeIn = employeeRecord.timeInEvents.find(time => time.date === dateStamp);
        let timeOut = employeeRecord.timeOutEvents.find(time => time.date === dateStamp);
        let totalHour = (timeOut.hour - timeIn.hour) / 100;
        return totalHour


}

let wagesEarnedOnDate = function(employeeRecord, dateStamp) {

    
    return parseInt(employeeRecord.payPerHour) * parseInt(hoursWorkedOnDate(employeeRecord, dateStamp))
    

}

let allWagesFor = function(employeeRecord) {
    const datesOfArray = employeeRecord.timeInEvents.map(day => day.date)
    
    return (datesOfArray.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0))

}
    





let findEmployeeByFirstName = function(srcArray, firstName){
  return srcArray.find(names => {return names.firstName === firstName})

}

let calculatePayroll = function(employeeRecords) {
    return employeeRecords.reduce((total,element) => total + allWagesFor(element), 0)

}

    
    
    
    
    








