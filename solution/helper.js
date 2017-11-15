'use strict'

const P         = require('bluebird')
const mergeSort = require('mergesort')
const moment    = require('moment')

function Helper() { }

Helper.getNextLogEntryFromEachLogSource = (logSources) => {
    return logSources.map(logSource => logSource.pop())
}

Helper.getNextLogEntryFromEachLogSourceAsync = async(logSources) => {
    return P.map(logSources, (logSource) => logSource.popAsync())
}

Helper.sortLogEntries = (logEntries) => {
    return mergeSort(Helper.sortDateComparator, logEntries)
}

Helper.sortDateComparator = (logSourceA, logSourceB) => {
    return moment(logSourceA.date).valueOf() - moment(logSourceB.date).valueOf()
}

module.exports = Helper
