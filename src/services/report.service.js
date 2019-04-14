import { urls } from '../mixins/urls.js'
import { getSavedUser } from '../mixins/userUtils.js'
import { todaysMidnight, dateAndTimeFormat } from '../mixins/dateUtils.js'

async function fetchReport(from = todaysMidnight(), to = new Date()) {
    from = dateAndTimeFormat(from)
    to = dateAndTimeFormat(to)
    const user = await getSavedUser()
    const response = await fetch(`${urls.report}/${user._id}/?from=${from}&to=${to}`)
    const report = await response.json()
    return report
}

export { fetchReport }
