// // Your code here
// // populates a record from an Array
// function createEmployeeRecord(array){
//     let testEmployee = {
//         firstName:array[0],
//         familyName:array[1],
//         title:array[2],
//         payPerHour:array[3],
//         timeInEvents:[],
//         timeOutEvents:[],
//     }
//     return testEmployee
// }
// createEmployeeRecord(["Gray", "Worm", "Security", 1])

// ////////////////////////////////////////////////////
// let twoRows = [
//     ["moe", "sizlak", "barkeep", 2],
//     ["bartholomew", "simpson", "scamp", 3]
//   ]

// function createEmployeeRecords(employeeRecords){
    
//  let newArray = employeeRecords.map(nameExtractor => {
//     let arrayOfObjects = {firstName: nameExtractor[0]}
//     return arrayOfObjects
//  })

//  return newArray
// }
// createEmployeeRecords(twoRows)

// //////////////////////////////////////////////////

// function createTimeInEvent(bpRecord,updatedBpRecord){
//     let dateAndTime = updatedBpRecord.split(" ")
    
//     let newEvent  = {
//         type: "TimeIn",
//         date: dateAndTime[0],
//         hour: parseInt(dateAndTime[1])
//     }
//     bpRecord.timeInEvents.push(newEvent)
//  //   console.log(bpRecord)

// return bpRecord
// }
// createTimeInEvent(createEmployeeRecord(["Byron", "Poodle", "Mascot", 3]), "2014-02-28 1400")


// function createTimeOutEvent(bpRecord,updatedBpRecord){
//     let dateAndTime = updatedBpRecord.split(" ")
    
//     let newEvent  = {
//         type: "TimeOut",
//         date: dateAndTime[0],
//         hour: parseInt(dateAndTime[1])
//     }
//     bpRecord.timeOutEvents.push(newEvent)
// return bpRecord
// }
// createTimeOutEvent(createTimeInEvent(createEmployeeRecord(["Byron", "Poodle", "Mascot", 3]), "2014-02-28 1400"), "2015-02-28 1700")

// function hoursWorkedOnDate(cRecord, date){
//     const timeIn = cRecord.timeInEvents.find((e) => e.date === date).hour
//     const timeOut = cRecord.timeOutEvents.find((e) => e.date === date).hour


//     return (timeOut - timeIn)/100
// }

// function wagesEarnedOnDate(cRecord, date){

//     const payment = cRecord.payPerHour
//     const hoursWorked = hoursWorkedOnDate(cRecord, date)
//     return payment * hoursWorked
// }

// function allWagesFor(cRecord){
//     const allWages = cRecord.timeInEvents.map((day) => {return wagesEarnedOnDate(cRecord, day.date)})
//     return allWages.reduce((acc, cum) => acc + cum)
// }

// function findEmployeeByFirstName(employeeArray,firstName){
//     const employeesFirstName = employeeArray.find((record) => record.firstName  === firstName )
//     // if(!employeesFirstName){
//     //     return undefined;
//     //   }
//       return employeesFirstName
   
//     // for (let i = 0 ; i<employeeArray.length ; i++){
//     //     if(i[1] === familyName){
//     //       return familyName
//     //     }
//     //     else return undefined
//     // }
    
// }

// // console.log(findEmployeeByFirstName([
// //     ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
// //     ["Natalia", "Romanov", "CEO", 150]
// //   ], "Loki", "Laufeysson-Odinsson")
// // )


// // function findEmployeeByFirstName (srcArray, firstName) {
// //     return srcArray.find(function(rec){
// //       return rec.firstName === firstName
// //     })
// //   }

// //   let calculatePayroll = function(arrayOfEmployeeRecords){
// //       return arrayOfEmployeeRecords.reduce(function(memo, rec){
// //           return memo + allWagesFor(rec)
// //       }, 0)
// //   }

// function calculatePayroll(records){
//     const allPayments = (records.map((employee) => {return allWagesFor(employee)}))
//     return allPayments.reduce((acc, cum) => acc + cum)
// }


function createEmployeeRecord(array){
    let testEmployee = {
        firstName:array[0],
        familyName:array[1],
        title:array[2],
        payPerHour:array[3],
        timeInEvents:[],
        timeOutEvents:[],
    }
    return testEmployee
}

let createEmployees = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}


let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let createEmployeeRecords = function(src) {
  return src.map(function(row){
    return createEmployeeRecord(row)
  })
}

function findEmployeeByFirstName(employeeArray,firstName){
    const employeesFirstName = employeeArray.find((record) => record.firstName  === firstName )
      return employeesFirstName
}
let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}