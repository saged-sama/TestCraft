import React, { useState, useEffect } from 'react';

const Countdown = ({ endTime }) => {
    const calculateTimeLeft = () => {
        const difference = new Date(endTime) - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div>
            {timeLeft.days > 0 && <span>{timeLeft.days} days </span>}
            {timeLeft.hours > 0 && <span>{timeLeft.hours} hours </span>}
            {timeLeft.minutes > 0 && <span>{timeLeft.minutes} minutes </span>}
            {timeLeft.seconds > 0 && <span>{timeLeft.seconds} seconds </span>}
            {Object.keys(timeLeft).length === 0 && <span>Countdown Over</span>}
        </div>
    );
};

export default Countdown;
