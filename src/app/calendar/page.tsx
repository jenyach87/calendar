// "use client"
// import {
//   format,
//   subWeeks,
//   addWeeks,
//   startOfWeek,
//   addDays,
//   isSameDay,
//   lastDayOfWeek,
//   getWeek
// } from "date-fns";
// import { Button } from "@nextui-org/react";
// import Link from "next/link";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { ICalendarWeekProps } from "./ICalendarWeekProps";
// import { useState } from "react";
// import styles from './Calendar.module.css';

// const Calendar: React.FC<ICalendarWeekProps> = () => {
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());

//   const changeWeekHandle = (btnType: any) => {
//     if (btnType === "prev") {
//       const newDate = subWeeks(currentMonth, 1);
//       setCurrentMonth(newDate);
//       setCurrentWeek(getWeek(newDate));
//     }
//     if (btnType === "next") {
//       const newDate = addWeeks(currentMonth, 1);
//       setCurrentMonth(newDate);
//       setCurrentWeek(getWeek(newDate));
//     }
//   };

//   const renderHeader = () => {
//     const dateFormat = "MMMM";
//     return (
//       <div className="flex justify-center">
//         <span>{format(currentMonth, dateFormat)}</span>
//       </div>
//     );
//   };

//   const renderCells = () => {
//     const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
//     const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
//     const dateFormat = "d";
//     const dayFormat = "EE";
//     const rows = [];
//     let days = [];
//     let day = startDate;

//     while (day <= endDate) {
//       for (let i = 0; i < 7; i++) {
//         const formattedDate = format(day, dateFormat);
//         const formattedDay = format(day, dayFormat);
//         const cloneDay = day;

//         days.push(
//           <div
//             className={`${styles.cell} ${isSameDay(day, new Date()) ? styles.today : ''} ${isSameDay(day, selectedDate) ? styles.selected : ''}`}
//             key={day.toString()}
//             onClick={() => setSelectedDate(cloneDay)}
//           >
//             <div className={styles.day}>{formattedDay}</div>
//             <div className={styles.date}>{formattedDate}</div>
//           </div>
//         );

//         day = addDays(day, 1);
//       }

//       rows.push(<div className={styles.daysCell} key={day.toString()}>{days}</div>);
//       days = [];
//     }

//     return (
//       <div className="flex justify-around w-full ">
//         <div className="flex justify-center items-end pb-0.5" onClick={() => changeWeekHandle("prev")}>
//           <FaChevronLeft className="mr-2" />
//         </div>
//         <div className="flex justify-around w-full">{rows}</div>
//         <div className="flex justify-center items-end pb-0.5" onClick={() => changeWeekHandle("next")}>
//           <FaChevronRight className="ml-2" />
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className={styles.calendar}>
//       <div className="mb-2 font-semibold text-base mt-2">{renderHeader()}</div>
//       <div className={styles.links}>
//         <Link href='/calendar' className={styles.link}>Week</Link>
//         <Link href='/calendarFull' className={styles.linkDis}>Month</Link>
//       </div>
//       <div className={styles.content}>{renderCells()}</div>
//       <Button className={styles.selectBtn}>Select payment method</Button>
//     </div>
//   );
// };

// export default Calendar;

"use client";
import {
  format,
  subWeeks,
  addWeeks,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek
} from "date-fns";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import styles from './Calendar.module.css';

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const changeWeekHandle = (btnType: any) => {
    if (btnType === "prev") {
      const newDate = subWeeks(currentMonth, 1);
      setCurrentMonth(newDate);
      setCurrentWeek(getWeek(newDate));
    }
    if (btnType === "next") {
      const newDate = addWeeks(currentMonth, 1);
      setCurrentMonth(newDate);
      setCurrentWeek(getWeek(newDate));
    }
  };

  const renderHeader = () => {
    const dateFormat = "MMMM";
    return (
      <div className="flex justify-center">
        <span>{format(currentMonth, dateFormat)}</span>
      </div>
    );
  };

  const renderDays = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className={styles.day} key={i}>
          {format(addDays(startDate, i), 'EE')}
        </div>
      );
    }
    return <div className={styles.daysRow}>{days}</div>;
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, dateFormat);
        const cloneDay = day;

        days.push(
          <div
            className={`${styles.cell} ${isSameDay(day, new Date()) ? styles.today : ''} ${isSameDay(day, selectedDate) ? styles.selected : ''}`}
            key={day.toString()}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <div className={styles.date}>{formattedDate}</div>
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(<div className={styles.daysCell} key={day.toString()}>{days}</div>);
      days = [];
    }

    return (
      <div className="flex justify-around w-full ">
        <div className="flex justify-center items-end pb-0.5" onClick={() => changeWeekHandle("prev")}>
          <FaChevronLeft className="mr-2" />
        </div>
        <div className="flex justify-around w-full">{rows}</div>
        <div className="flex justify-center items-end pb-0.5" onClick={() => changeWeekHandle("next")}>
          <FaChevronRight className="ml-2" />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.calendar}>
      <div className="mb-2 font-semibold text-base mt-2">{renderHeader()}</div>
      <div className={styles.links}>
        <Link href='/calendar' className={styles.link}>Week</Link>
        <Link href='/calendarFull' className={styles.linkDis}>Month</Link>
      </div>
      <div className={styles.content}>
        <div className={styles.renderdays}>{renderDays()}</div>
        {renderCells()}
      </div>
      <Button className={styles.selectBtn}>Select payment method</Button>
    </div>
  );
};

export default Calendar;


