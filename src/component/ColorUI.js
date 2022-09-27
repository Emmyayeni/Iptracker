import React from 'react';
import { useState } from 'react';
import Callback from './Callback';
const ColorUI = () => {
    const [colourUI, setcolorUI] = useState(null)
    const getcolor = (color) =>{
        setcolorUI(color)
    }
    return (
        <div className='container'>
            <div className='border' style={{background:`${colourUI}`}}></div>
            <Callback getcolor={getcolor} />
        </div>
    );
}

export default ColorUI;
