function getClockAngle(hour, minute){
    let twHr = hour % 12;
    console.log(twHr)
    let hourAngle = (twHr * 30) + (minute*0.5);
    let minAngle = minute*6;

    const angle = Math.abs(hourAngle - minAngle);
    return Math.min(angle, 360-angle);

}

console.log(getClockAngle(3, 15)); // 7.5
console.log(getClockAngle(23, 30)); // 165
console.log(getClockAngle(9, 45)); // 22.5