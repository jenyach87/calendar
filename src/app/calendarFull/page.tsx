"use client";
import React, { useState } from 'react';
import styles from '../calendarFull/CalendarFull.module.css';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isSameYear } from 'date-fns';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from 'next/link';
import { Button } from '@nextui-org/react';

const CalendarFull = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    if (!(isSameMonth(currentMonth, new Date()) && isSameYear(currentMonth, new Date()))) {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
  };

  const onDateClick = (day: React.SetStateAction<Date>) => {
    setSelectedDate(day);
  };

  const customContent = (
    <div className={styles.links}>
      <Link href='/calendar' className={styles.linkDis}>Week</Link>
      <Link href='/calendarFull' className={styles.link}>Month</Link>
    </div>
  );

  const renderHeader = () => {
    const isCurrentMonth = isSameMonth(currentMonth, new Date()) && isSameYear(currentMonth, new Date());
    return (
      <div className={styles.header}>
        <div className={styles.monthLabel}>
          <FaChevronLeft
            onClick={prevMonth}
            className={`mr-2 h-4 cursor-pointer ${isCurrentMonth ? styles.disabledChevron : ''}`}
          />
          <span className='font-semibold text-base'>{format(currentMonth, 'MMMM')}</span>
          <FaChevronRight onClick={nextMonth} className="ml-2 h-4 cursor-pointer" />
        </div>
        {customContent}
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className={styles.day} key={i}>
          {format(addDays(startDate, i), 'eeeeee')}
        </div>
      );
    }
    return <div className={styles.daysRow}>{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const dateFormat = 'd';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        if (isSameMonth(day, monthStart)) {
          days.push(
            <div
              className={`${styles.cell} ${isSameDay(day, selectedDate) ? styles.selected : ''}`}
              key={day.toISOString()}
              onClick={() => onDateClick(cloneDay)}
            >
              <span className={styles.number}>{formattedDate}</span>
            </div>
          );
        } else {
          days.push(
            <div className={`${styles.cell} ${styles.hidden}`} key={day.toISOString()}>
              <div className={styles.number}><span className={styles.cellItem}>{formattedDate}</span></div>
            </div>
          );
        }
        day = addDays(day, 1);
      }
      rows.push(
        <div className={styles.row} key={day.toISOString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className={styles.body}>{rows}</div>;
  };

  return (
    <div className={styles.calendar}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      <Button className={styles.selectBtn}>Select payment method</Button>
    </div>
  );
};

export default CalendarFull;

