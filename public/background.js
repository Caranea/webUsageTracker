let userId, entryTime, report, currentUrl, reportingInProgress = false
chrome.idle.setDetectionInterval(300)
chrome.storage.sync.set({ user: null }, () => {})
chrome.storage.onChanged.addListener(changes => {
    changes.user && changes.user.newValue === null ? stopTracking() : startTracking(changes.user.newValue._id)
})

function startTracking(id) {
    userId = id
    chrome.tabs.onUpdated.addListener(updatedTabListener)
    chrome.tabs.onActivated.addListener(onActivatedTabListener)
}

function stopTracking() {
    chrome.tabs.onUpdated.removeListener(updatedTabListener)
    chrome.tabs.onActivated.removeListener(onActivatedTabListener)
}

async function updatedTabListener(tabId, tabInfo) {
    const currentTabId = await getCurrentTabId();
    if (currentTabId === tabId) reportUrl(tabInfo.url)
}

async function onActivatedTabListener(activeInfo) {
    const currentTabId = await getCurrentTabId()
    chrome.tabs.get(activeInfo.tabId, tab => { if (currentTabId === activeInfo.tabId) reportUrl(tab.url) })
}

function setExitListeners() {
    chrome.tabs.onRemoved.addListener(handleTabClosing)
    chrome.idle.onStateChanged.addListener(handleIdleState)
}

function getCurrentTabId() {
    return new Promise((resolve, reject) => {
        try {
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => { if (tabs[0]) resolve(tabs[0].id) })
        } catch (error) {
            reject(error)
        }
    })
}

async function reportUrl(url) {
    if (!currentUrl) currentUrl = url
    if (url && !reportingInProgress) {
        if (entryTime) {
            report = new Report()
            report.post()
        }
        currentUrl = url
        entryTime = Date.now()
        setExitListeners()
    }
}

async function handleTabClosing(tabId, changeInfo) {
    const currentTabId = !changeInfo.isWindowClosing && await getCurrentTabId()
    if (!reportingInProgress && (tabId === currentTabId || !currentTabId)) {
        report = new Report()
        report.post()
        chrome.tabs.onRemoved.removeListener(handleTabClosing)
    }
}

function handleIdleState(state) {
    if ((state !== 'active') && !reportingInProgress) {
        report = new Report()
        report.post()
    } else if (state === 'active') {
        entryTime = Date.now()
        reportUrl(currentUrl)
    }
}

class Report {
    constructor() {
        this.timeSpent = Date.now() - entryTime
        this.url = currentUrl.split('/')[2]
        this.time = new Date(new Date() - (new Date().getTimezoneOffset() * 60000)).toISOString().substring(0, 19)
        this.userId = userId
    }
    async post() {
        reportingInProgress = true
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Origin': '*'
        }
        this.timeSpent > 1000 && await fetch('http://localhost:5000/reports', {
            headers: headers,
            method: 'POST',
            body: JSON.stringify(this)
        })
        reportingInProgress = false
    }
}