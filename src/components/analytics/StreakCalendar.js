import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from 'date-fns';
import './Analytics.css';

const StreakCalendar = ({ dailyActivity }) => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get the day of week for the first day (0 = Sunday)
  const startDay = monthStart.getDay();

  // Create empty cells for days before the month starts
  const emptyDays = Array(startDay).fill(null);

  const getActivityLevel = (date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const activity = dailyActivity[dateKey];

    if (!activity) return 0;

    const timeSpent = activity.timeSpent || 0;
    if (timeSpent >= 1800) return 4; // 30+ minutes
    if (timeSpent >= 900) return 3;  // 15-30 minutes
    if (timeSpent >= 300) return 2;  // 5-15 minutes
    if (timeSpent > 0) return 1;     // Any activity
    return 0;
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="streak-calendar">
      <div className="calendar-header">
        <span className="calendar-month">{format(today, 'MMMM yyyy')}</span>
      </div>

      <div className="calendar-weekdays">
        {weekDays.map(day => (
          <span key={day} className="weekday">{day}</span>
        ))}
      </div>

      <div className="calendar-grid">
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="calendar-day empty" />
        ))}

        {days.map(day => {
          const level = getActivityLevel(day);
          const isCurrentDay = isToday(day);
          const dateKey = format(day, 'yyyy-MM-dd');
          const activity = dailyActivity[dateKey];

          return (
            <div
              key={dateKey}
              className={`calendar-day level-${level} ${isCurrentDay ? 'today' : ''}`}
              title={activity
                ? `${format(day, 'MMM d')}: ${Math.floor((activity.timeSpent || 0) / 60)} min`
                : format(day, 'MMM d')}
            >
              <span className="day-number">{format(day, 'd')}</span>
            </div>
          );
        })}
      </div>

      <div className="calendar-legend">
        <span className="legend-label">Less</span>
        <div className="legend-items">
          <div className="legend-item level-0" />
          <div className="legend-item level-1" />
          <div className="legend-item level-2" />
          <div className="legend-item level-3" />
          <div className="legend-item level-4" />
        </div>
        <span className="legend-label">More</span>
      </div>
    </div>
  );
};

export default StreakCalendar;
