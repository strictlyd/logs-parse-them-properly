import test from 'ava'
import Helper from './helper'

test('should sort log entries by chronological order', t => {
    const logEntries = [
        { date: new Date('2017-11-15'), msg: "first" },
        { date: new Date('2017-10-15'), msg: "second" },
        { date: new Date('2017-09-15'), msg: "third" },
    ]

    const expectedRes = [
        { date: new Date('2017-09-15'), msg: "third" },
        { date: new Date('2017-10-15'), msg: "second" },
        { date: new Date('2017-11-15'), msg: "first" },
    ]

    const sortedLogEntries = Helper.sortLogEntries(logEntries)
    t.deepEqual(sortedLogEntries, expectedRes)
})
