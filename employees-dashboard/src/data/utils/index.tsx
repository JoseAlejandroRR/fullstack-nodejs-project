import dayjs from 'dayjs'

export const DateToShortTextFormat = (date: Date): string => {
  const startDate = dayjs(date);
  
  return startDate.format('MMMM D, YYYY')
}

export const DateToFormatTextHuman = (date: Date): string => {
  const startDate = dayjs(date)
  const now = dayjs()

  const years = now.diff(startDate, 'year')
  const months = now.diff(startDate.add(years, 'year'), 'month');
  const days = now.diff(startDate.add(years, 'year').add(months, 'month'), 'day');

  return `${years}y - ${months}m - ${days}d`
}

export const avatarDefaultURL = '/assets/images/user-profile-default.jpg'
