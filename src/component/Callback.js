import React from 'react';
import { useState } from 'react';
const Callback = ({getcolor}) => {
    const [Activecolor, setActivecolor] = useState(null)
    const handlechange = (e) =>{
        const {value} = e.target;
        setActivecolor(value)
        getcolor(value);
    }
    return (
        <div>
            <input type ="text" 
             id='input'
             aria-label='input'
             className='input'
            value={Activecolor}
            onChange={handlechange}
            placeholder='type color of choice'
           
            />
        </div>
    );
}

export default Callback;
