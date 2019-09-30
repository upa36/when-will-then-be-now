function filterLogsByEnv(logs, env) {
  const filteredLogs = []

  logs.forEach((log) => {
    if (log.environment === env) {
      filteredLogs.push(log)
    }
  })

  return filteredLogs
}

function filterLogsOnDate(logs, dateFilter) {
  const filteredLogs = []
  const parsedDateFilter = new Date(dateFilter)
  const parsedDateFilterwoffset = new Date(parsedDateFilter.getTime() + Math.abs(parsedDateFilter.getTimezoneOffset() * 60000))

  logs.forEach((log) => {
    const timestampDate = new Date(log.timestamp)
    const timestampDatewoffset = new Date(timestampDate.getTime() + Math.abs(timestampDate.getTimezoneOffset() * 60000))
    if (parsedDateFilterwoffset.toDateString() === timestampDatewoffset.toDateString()) {
      filteredLogs.push(log)
    }
  })

  return filteredLogs
}

function filterLogs(logs, env, dateFilter) {
  const envLogs = filterLogsByEnv(logs, env)

  if (dateFilter) {
    return filterLogsOnDate(envLogs, dateFilter)
  } else {
    return envLogs
  }
}

module.exports = filterLogs
