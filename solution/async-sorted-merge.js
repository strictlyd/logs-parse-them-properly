'use strict'

const P         = require('bluebird')
const mergeSort = require('mergesort')
const moment    = require('moment')

module.exports = async (logSources, printer) => {
    let logs         = []
    let totalLogs    = 0
    let currentLogs  = []
    let previousLogs = []

    while (true) {
        // Because we can't load all log entries into memory,
        // get the earliest log entry from each log source.
        currentLogs = await getNextLogEntryFromEachLogSourceAsync(logSources)
        currentLogs = currentLogs.concat(previousLogs)

        if (currentLogs.length === 0) {
            break;
        }

        let sortedCurrentLogs  = sortLogEntries(currentLogs)
        let currentEarliestLog = sortedCurrentLogs.splice(0, 1)[0]

        // Loop exit condition when all log sources have been drained
        if (!currentEarliestLog) {
            break;
        }

        printer.print(currentEarliestLog)
    }

    printer.done()
}

async function getNextLogEntryFromEachLogSourceAsync(logSources) {
    return P.map(logSources, (logSource) => logSource.popAsync())
}

function sortLogEntries(logEntries) {
    return mergeSort(sortDateComparator, logEntries)
}

function sortDateComparator(logSourceA, logSourceB) {
    return moment(logSourceA.date).valueOf() - moment(logSourceB.date).valueOf()
}
