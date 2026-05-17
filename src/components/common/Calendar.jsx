import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate || new Date()));

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let d = 1; d <= totalDays; d++) {
    const currentDayDate = new Date(year, month, d);
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isSelected = selectedDate === dateStr;
    const isPast = currentDayDate < today;

    days.push(
      <button
        key={d}
        type="button"
        disabled={isPast}
        onClick={() => onDateSelect(dateStr)}
        className={`h-10 w-10 flex items-center justify-center rounded-full text-sm transition-all
          ${isPast ? 'text-gray-600 cursor-not-allowed' : 'text-textWhite hover:bg-primary/20 hover:text-primary cursor-pointer'}
          ${isSelected ? 'bg-primary text-bgDark font-bold scale-110 shadow-[0_0_15px_rgba(34,197,94,0.4)]' : ''}
        `}
      >
        {d}
      </button>
    );
  }

  return (
    <div className="bg-bgDark border border-borderColor rounded-2xl p-4 w-full select-none">
      <div className="flex justify-between items-center mb-4 px-2">
        <h4 className="text-textWhite font-bold text-lg">
          {monthNames[month]} {year}
        </h4>
        <div className="flex gap-2">
          <button 
            onClick={handlePrevMonth}
            className="p-1.5 hover:bg-gray-800 rounded-lg text-textGray hover:text-primary transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={handleNextMonth}
            className="p-1.5 hover:bg-gray-800 rounded-lg text-textGray hover:text-primary transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="h-10 w-10 flex items-center justify-center text-xs font-bold text-textGray uppercase">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
    </div>
  );
};

export default Calendar;
