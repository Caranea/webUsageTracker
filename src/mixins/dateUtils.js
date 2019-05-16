const dayInMs = 86400000
const timeZoneOffset = new Date().getTimezoneOffset() * 60000

function daysAgo(date) {
  return dateOnlyFormat(new Date() - date * dayInMs)
}

function dateOnlyFormat(date) {
  return new Date(new Date(date) - timeZoneOffset).toISOString().substr(0, 10)
}

function dateAndTimeFormat(date) {
  return new Date(new Date(date) - timeZoneOffset).toISOString().substr(0, 19)
}

function todaysMidnight() {
  const date = new Date()
  return date.setHours(0, 0, 0, 0)
}

function setMidnight(date) {
  return date.setHours(0, 0, 0, 0)
}

function firstDayOfTheWeek() {
  const date = new Date()
  return new Date(date.setDate(date.getDate() - ((date.getDay() + 6) % 7)))
}

function firstDayOfTheMonth() {
  const date = new Date()
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function timeFromMs(millisec) {
  let seconds = (millisec / 1000).toFixed(0)
  let minutes = Math.floor(parseInt(seconds) / 60) < 10 ? '0' + Math.floor(parseInt(seconds) / 60) : Math.floor(parseInt(seconds) / 60)
  let hours = '00'

  if (parseInt(minutes) > 59) {
    hours = Math.floor(parseInt(minutes) / 60) < 10 ? '0' + Math.floor(parseInt(minutes) / 60) : Math.floor(parseInt(minutes) / 60)
    minutes = parseInt(minutes) - (parseInt(hours) * 60)
  }
  seconds = Math.floor(parseInt(seconds) % 60) < 10 ? '0' + Math.floor(parseInt(seconds) % 60) : Math.floor(parseInt(seconds) % 60)

  return `${hours}:${minutes}:${seconds}`
}

export { daysAgo, dateOnlyFormat, firstDayOfTheMonth, firstDayOfTheWeek, todaysMidnight, dateAndTimeFormat, timeFromMs, setMidnight }
