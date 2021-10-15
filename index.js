// Your code here
// has a function called createEmployeeRecord
// populate a record from an array
// function should take in the array as an argument
// array should be 4 elements long with a string, string, string and number
function createEmployeeRecord(array) {
    let employeeRecord = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
    }
    return employeeRecord
}

// process an Array of Arrays into an Array of employee records

function createEmployeeRecords (arrays) {
    return arrays.map(createEmployeeRecord)
}

// create a newTimeInEvent object
// object has keys for type, set to "TimeIn", hour, date derived from the argument 
// add the object to an employee's record of timeInEvents 
// date stamp format is "YYYY-MM-DD HHMM"
// when provided an employee record and Date/Time String and returns the updated record

function createTimeInEvent(empRecord, dateStamp){
    const timeIn = {
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    }
    empRecord.timeInEvents.push(timeIn)
    return empRecord
}

function createTimeOutEvent(empRecord, dateStamp){
    const timeOut = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    }
    empRecord.timeOutEvents.push(timeOut)
    return empRecord

}

function hoursWorkedOnDate(empRecord, date){
    const timeIn = empRecord.timeInEvents.find((e) => e.date === date).hour
    const timeOut = empRecord.timeOutEvents.find((e) => e.date === date).hour
       return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(empRecord, date){
    return(empRecord.payPerHour * hoursWorkedOnDate(empRecord, date))
}

function allWagesFor(empRecord){
    const allWages = empRecord.timeInEvents.map(event => wagesEarnedOnDate(empRecord, event.date))
    return allWages.reduce((total, wage) => total + wage)
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(empRecord => empRecord.firstName === firstName)
}

function calculatePayroll(array){
    const total = array.map(empRecord => allWagesFor(empRecord))
    return total.reduce((t, empT) => t + empT)
}