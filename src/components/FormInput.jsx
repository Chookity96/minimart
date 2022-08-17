import React, { useState } from 'react'

function FormInput(props) {
    const [focused, setFocused] = useState(false)
    const { label, errorMessage, onChange, id, ...inputProps } = props
    const handleFocus = (e) => {
        setFocused(true)
    }
    return (
        <div className='forminput'>
            <label>{label}</label><br />
            <input {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()}
            onFocus={() => inputProps.name === "price" && setFocused(true)}/>
            <br />
            <span>{errorMessage}</span>
        </div>
    )
}

export default FormInput