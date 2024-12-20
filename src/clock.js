import React, { useState, useEffect, useRef } from 'react';

function Clock() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const secondsRef = useRef(null);
  const minutesRef = useRef(null);
  const hourRef = useRef(null);
  const minuteRef = useRef(null);

  const getTime = () => {
    const date = new Date();
    const s = date.getSeconds();
    const m = date.getMinutes();
    const h = date.getHours();

    setTime({
      hours: h,
      minutes: m,
      seconds: s
    });

    if (secondsRef.current && minutesRef.current) {
      secondsRef.current.style.setProperty('--dRotate', `${6 * s}deg`);
      minutesRef.current.style.setProperty('--dRotate', `${6 * m}deg`);
    }

    if (s === 0) {
      secondsRef.current.classList.add('stop-anim');
    } else {
      secondsRef.current.classList.remove('stop-anim');
    }

    if (m === 0) {
      minutesRef.current.classList.add('stop-anim');
    } else {
      minutesRef.current.classList.remove('stop-anim');
    }
  };

  useEffect(() => {
    for (let s = 0; s < 60; s++) {
      const mSpikeEl = document.createElement('i');
      const sSpikeEl = document.createElement('i');
      mSpikeEl.className = 'spike';
      sSpikeEl.className = 'spike';
      mSpikeEl.style.setProperty('--rotate', `${6 * s}deg`);
      sSpikeEl.style.setProperty('--rotate', `${6 * s}deg`);
      mSpikeEl.setAttribute('data-i', s);
      sSpikeEl.setAttribute('data-i', s);

      secondsRef.current.appendChild(sSpikeEl);
      minutesRef.current.appendChild(mSpikeEl);
    }

    const intervalId = setInterval(getTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    getTime();
  }, []);

  return (
    <div className="clock-container">
      <div className="clock">
        <div className="hour" ref={hourRef}>{time.hours}</div>
        <div className="minute" ref={minuteRef}>{time.minutes}</div>
        <div className="minutes" ref={minutesRef}></div>
        <div className="seconds" ref={secondsRef}></div>
      </div>
    </div>
  );
}

export default Clock;