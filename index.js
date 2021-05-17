let aliVeliInfo = ["ali", "veli", "a", "10", "c"];
let eyYoInfo = ["ey", "yo", "x", "20", "z"];
let aliVeliRecord = createEmployeeRecord(aliVeliInfo); //Used function hoisting here!
let eyYoRecord = createEmployeeRecord(eyYoInfo); //Used function hoisting here!
let updatedAliVeliRecord;
let updatedEyYoRecord;

// updatedAliVeliRecord = 

//                                        //                                       //



// Creates one record, with one person's informations.
function createEmployeeRecord(onePersonInfo = aliVeliInfo) {

    let record = {};

    onePersonInfo.forEach(function(info) {

        if (info === onePersonInfo[0]) {
            record.firstName = onePersonInfo[0];
        }

        else if (info === onePersonInfo[1]) {
            record.familyName = onePersonInfo[1];
        }

        else if (info === onePersonInfo[2]) {
            record.title = onePersonInfo[2];
        }

        else if (info === onePersonInfo[3]) {
            record.payPerHour = onePersonInfo[3];
        }

    });

    record.timeInEvents = [];
    record.timeOutEvents = [];


    console.log(record);
    return record;

};

// createEmployeeRecord();

//                                         //                                     //



// Creates more than one record, with more than one person's informations.
const createEmployeeRecords = function(moreThanOnePersonInfo = [aliVeliInfo, eyYoInfo]) {

    let records = [];

    moreThanOnePersonInfo.forEach(function(onePersonInfo) {

        records.push(createEmployeeRecord(onePersonInfo));

    });

    console.log(records);
    return records;

};

// createEmployeeRecords();

//                                          //                                          //



// Adds an event with the keys of "type", "date" and "hour" to the given record's timeInEvents key.
const createTimeInEvent = function(record = aliVeliRecord, dateAndHourStrings = ["2014-02-28 1400", "2014-02-29 1500"]) {

    if (typeof dateAndHourStrings === "string") {
        
        let dateAndHourArray = dateAndHourStrings.split(" ");
        let dateString = dateAndHourArray[0];
        let hourNumber = parseInt(dateAndHourArray[1], 10);

        console.log(dateAndHourArray);
        console.log(dateString);
        console.log(hourNumber);

        let timeInEvent = {
            "type": "TimeIn",
            "date": dateString,
            "hour": hourNumber   
        };

        console.log(record);

        record.timeInEvents.push(timeInEvent);

        console.log(record);
    }

    else if (typeof dateAndHourStrings === "object") {

        function pushIndividualEvent(dateAndHourString) {
                
                let dateAndHourArray = dateAndHourString.split(" ");
                let dateString = dateAndHourArray[0];
                let hourNumber = parseInt(dateAndHourArray[1], 10);

                console.log(dateAndHourArray);
                console.log(dateString);
                console.log(hourNumber);

                let timeInEvent = {
                    "type": "TimeIn",
                    "date": dateString,
                    "hour": hourNumber   
                };

                console.log(record);

                record.timeInEvents.push(timeInEvent);

                console.log(record);

            };

            dateAndHourStrings.forEach(pushIndividualEvent);

    }

    


    return record;
    
};

createTimeInEvent();

//                                        //                                      //



// Adds an event with the keys of "type", "date" and "hour" to the given record's timeOutEvents key.
const createTimeOutEvent = function(record = aliVeliRecord, dateAndHourStrings = ["2014-02-28 1700", "2014-02-29 1800"]) { 


    if (typeof dateAndHourStrings === "string") {

        let dateAndHourArray = dateAndHourStrings.split(" ");
        let dateString = dateAndHourArray[0];
        let hourNumber = parseInt(dateAndHourArray[1], 10);

        console.log(dateAndHourArray);
        console.log(dateString);
        console.log(hourNumber);

        let timeOutEvent = {
            "type": "TimeOut",
            "date": dateString,
            "hour": hourNumber   
        };

        console.log(record);

        record.timeOutEvents.push(timeOutEvent);

        console.log(record);

    }

    else if (typeof dateAndHourStrings === "object") {

        function pushIndividualEvent(dateAndHourString) {
                
                let dateAndHourArray = dateAndHourString.split(" ");
                let dateString = dateAndHourArray[0];
                let hourNumber = parseInt(dateAndHourArray[1], 10);

                console.log(dateAndHourArray);
                console.log(dateString);
                console.log(hourNumber);

                let timeOutEvent = {
                    "type": "TimeOut",
                    "date": dateString,
                    "hour": hourNumber   
                };

                console.log(record);

                record.timeOutEvents.push(timeOutEvent);

                console.log(record);

            };

            dateAndHourStrings.forEach(pushIndividualEvent);

    }


    

    return record;

};

createTimeOutEvent();

//                                            //                                      //



// We get the in total hours that person worked in that day, by pasisng the person's record and the date.
const hoursWorkedOnDate = function(record = aliVeliRecord, date = "2014-02-28") {

    let matchedTimeInEvent = record.timeInEvents.filter(function(event) {
        return event.date === date;
    });

    console.log(matchedTimeInEvent);


    let matchedTimeOutEvent = record.timeOutEvents.filter(function(event) {
        return event.date === date;
    });

    console.log(matchedTimeOutEvent)


    let hoursWorkedOnDate = (matchedTimeOutEvent[0].hour - matchedTimeInEvent[0].hour) / 100;
    console.log(hoursWorkedOnDate)
    return hoursWorkedOnDate;

};

// hoursWorkedOnDate();

//                                             //                                      //



// Calculates the money earned on the given date by the person that we received the record of.
const wagesEarnedOnDate = function(record = aliVeliRecord, date = "2014-02-28") {

    let hours = hoursWorkedOnDate(record, date);

    let moneyEarnedOnDate = hours * record.payPerHour;
    
    return moneyEarnedOnDate;

}

// wagesEarnedOnDate();

//                                              //                                       //



// Calculates the money that business owes to the person given record of. 
const allWagesFor = function(record = aliVeliRecord) {

    
    let dates = record.timeInEvents.map(function(event) {
        return event.date;
    });

    console.log(dates);


    function reducer(accumulator, currentDate) {
        console.log(wagesEarnedOnDate(record,currentDate));
        return accumulator += wagesEarnedOnDate(record, currentDate);
    }

    // let allWagesOfThePerson = dates.reduce(reducer, 0);
    // console.log(allWagesOfThePerson);
    // return allWagesOfThePerson;

    console.log(dates.reduce(reducer, 0));
    return dates.reduce(reducer, 0);

}

// allWagesFor();

//                                              //                                      //



// Calculates the money businnes owes in total, to the people that records given of.
const calculatePayroll = function(employeeRecords = [aliVeliRecord, eyYoRecord]) {

    function reducer(accumulator ,employeeRecord) {
        return accumulator += allWagesFor(employeeRecord);
    }

    let result = employeeRecords.reduce(reducer, 0);

    return result;


};

// calculatePayroll();

//                                          //                                            //



// Finds the person's record from the given records by the person's name.
const findEmployeeByFirstName = function(employeeRecordsArray = [aliVeliRecord, eyYoRecord], firstNameString = "ali") {

    let matchedRecord = employeeRecordsArray.find(function(record) {
        return record.firstName === firstNameString;
    })

    return matchedRecord;

};

findEmployeeByFirstName();

//                                              //                                      //