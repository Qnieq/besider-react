import React, { useState, useEffect, useCallback } from 'react';
import MonthNews from './MonthNews';

interface Month {
    year: number;
    month: number;
}

const NewsList: React.FC = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // месяцы от 0 до 11
    const [months, setMonths] = useState<Month[]>([{ year: currentYear, month: currentMonth }]);

    const handleScroll = useCallback(() => {
        const nearBottom =
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
        if (nearBottom) {
            setMonths(prev => {
                const last = prev[prev.length - 1];
                let newYear = last.year;
                let newMonth = last.month - 1;
                if (newMonth < 1) {
                    newMonth = 12;
                    newYear = last.year - 1;
                }
                // Если такого месяца ещё нет в списке, добавляем его
                const exists = prev.find(m => m.year === newYear && m.month === newMonth);
                if (!exists) {
                    return [...prev, { year: newYear, month: newMonth }];
                }
                return prev;
            });
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <div className="p-4">
            {months.map((m, index) => (
                <MonthNews
                    key={`${m.year}-${m.month}`}
                    year={m.year}
                    month={m.month}
                    // Только для текущего месяца включаем автообновление (polling)
                    polling={index === 0}
                />
            ))}
        </div>
    );
};

export default NewsList;
