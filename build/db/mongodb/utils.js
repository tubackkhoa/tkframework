const DATE_REGEXP = /\d{4}-\d{2}-\d{2}/

export const isDate = (date) => 
  (new Date(date).toString() !== 'Invalid Date') && !isNaN(new Date(date))

export const isTimestamp = (string) => 
  string.length > 18 && !isNaN((new Date(string)).getTime())

export const isDateString = (string) => 
  string.match(DATE_REGEXP)
