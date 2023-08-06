const ageCalculate = () => {
    const today = new Date();
    const inputdate = new Date(document.getElementById("date-input").value);
    const birthdetails = {
        date: inputdate.getDate(),
        month: inputdate.getMonth() + 1,
        year: inputdate.getFullYear() // Fix: use getFullYear() instead of getDay()
    };
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();
    if (isFutureDate(birthdetails, currentYear, currentMonth, currentDate)) {
        alert("Not born Yet");
        displayresult("-", "-", "-");
        return;
    }
    const { year, month, date } = calculateAge(
        birthdetails,
        currentYear,
        currentMonth,
        currentDate
    );
    displayresult(date, month, year); // Fix: Use the correct variable names
};

const isFutureDate = (birthdetails, currentYear, currentMonth, currentDate) => {
    return (
        birthdetails.year > currentYear ||
        (birthdetails.year === currentYear &&
            (birthdetails.month > currentMonth ||
                (birthdetails.month === currentMonth &&
                    birthdetails.date > currentDate)))
    );
};

const calculateAge = (birthdetails, currentYear, currentMonth, currentDate) => {
    let years = currentYear - birthdetails.year;
    let months = currentMonth - birthdetails.month;
    let days = currentDate - birthdetails.date;

    if (days < 0) {
        const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const daysInLastMonth = getDaysInMonth(lastMonth, currentYear);

        months--;
        days = daysInLastMonth + days; // Add days in last month to calculate the correct difference
    }

    if (months < 0) {
        years--;
        months += 12; // Add 12 months to handle negative months
    }

    return { years, months, days };
};


const getDaysInMonth = (month, year) => { // Fix: Correct function name
    const isLeapYear = year % 4 === 0 && (year % 100 != 0 || year % 400 === 0);
    const getDaysInMonth = [
        31,
        isLeapYear ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];
    return getDaysInMonth[month - 1];
};

const displayresult = (bDate, bMonth, bYear) => {
    document.getElementById("years").textContent = bYear;
    document.getElementById("months").textContent = bMonth;
    document.getElementById("days").textContent = bDate;
};

document.getElementById("cal-age-btn").addEventListener("click", ageCalculate);
