import React, {useEffect, useRef, useState} from 'react';

const Otp = () => {
    const [otp, setOtp] = useState(new Array(4).fill(""))
    const inputRef = useRef([]);

    useEffect(() => {
        if (inputRef.current[0]) {
            inputRef.current[0].focus();
        }
    }, []);

    const handleInputChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);
        let combinedOtp = newOtp.join("");


        if (value && index < 4 && inputRef.current[index + 1]) {
            inputRef.current[index + 1].focus();
        }

        console.log(combinedOtp);
    }


    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index]) {
            // console.log(inputRef)
            if (inputRef.current[index].value === "" && index > 0 && inputRef.current[index - 1]) {
                inputRef.current[index - 1].focus();
            }
        }
    }

    const handleClick = (index) => {
        inputRef.current[index].setSelectionRange(1, 1);


        if (index > 0 && !otp[index - 1]) {
            inputRef.current[otp.indexOf("")].focus();
        }
    }


    return (
        <div>
            {
                otp.map((val, index) => {
                    return <input
                        type="text"
                        value={val}
                        ref={input => inputRef.current[index] = input}
                        onChange={(e) => handleInputChange(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onClick={() => handleClick(index)}
                        className='input'
                    />
                })
            }
            <button>Submit</button>
        </div>
    )
}

export default Otp;