export const formatDate = (date: Date): string => {
  const pad = (n: number) => n.toString().padStart(2, '0');

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  const day = date.getDate();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const month = monthNames[date.getMonth()];
  const currentMonth = monthNames[new Date().getMonth()];
  const monthFormatted = month === currentMonth ? '' : `, ${month}`;

  const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const dayName = weekdays[date.getDay()];

  const getOrdinal = (n: number) => {
    const s=["th","st","nd","rd"], v=n%100;
    return n + (s[(v-20)%10]||s[v]||s[0]);
  };

  return `${hours}:${minutes} on ${dayName} ${getOrdinal(day)}${monthFormatted}`;
};