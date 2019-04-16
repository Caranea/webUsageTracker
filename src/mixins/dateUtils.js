const dayInMs = 86400000
const timeZoneOffset = new Date().getTimezoneOffset() * 60000

function daysAgo(date) {
    return dateOnlyFormat(new Date() - date * dayInMs)
}

function dateOnlyFormat(date) {
    console.log(date)
    return new Date(new Date(date) - timeZoneOffset).toISOString().substr(0, 10)
}

function dateAndTimeFormat(date) {
    console.log(date)

    return new Date(new Date(date) - timeZoneOffset).toISOString().substr(0, 19)
}

function todaysMidnight() {
    const date = new Date()
    return date.setHours(0, 0, 0, 0)
}

function firstDayOfTheWeek() {
    const date = new Date()
    return new Date(date.setDate(date.getDate() - (date.getDay() + 6) % 7))
}

function firstDayOfTheMonth() {
    const date = new Date()
    return new Date(date.getFullYear(), date.getMonth(), 1)
}

export { daysAgo, dateOnlyFormat, firstDayOfTheMonth, firstDayOfTheWeek, todaysMidnight, dateAndTimeFormat }