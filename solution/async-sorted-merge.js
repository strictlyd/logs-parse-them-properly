'use strict'

const Helper = require('./helper')

module.exports = async (logSources, printer) => {
    let logs         = []
    let totalLogs    = 0
    let currentLogs  = []
    let previousLogs = []

    while (true) {
        // Because we can't load all log entries into memory,
        // get the earliest log entry from each log source.
        currentLogs = await Helper.getNextLogEntryFromEachLogSourceAsync(logSources)
        currentLogs = currentLogs.concat(previousLogs)

        if (currentLogs.length === 0) {
            break;
        }

        let sortedCurrentLogs  = Helper.sortLogEntries(currentLogs)
        let currentEarliestLog = sortedCurrentLogs.splice(0, 1)[0]

        // Loop exit condition when all log sources have been drained
        if (!currentEarliestLog) {
            break;
        }

        printer.print(currentEarliestLog)
    }

    printer.done()
}
