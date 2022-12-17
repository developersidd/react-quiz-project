import React from 'react';

const Checkbox = ({className,text, ...rest}) => {
    return (
        <label className={className} style={{margin: "15px"}}>
            <input type="checkbox" {...rest} />
            <span> {text}</span>
        </label>
    )
}

export default Checkbox;