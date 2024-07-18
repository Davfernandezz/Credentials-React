import React from 'react'

export const CInput = ({ type = 'text', name = "", placeholder = "", emitFunction, value, label }) => {
    return (
        <>
            <div>
                <label htmlFor="">{label}</label>
            </div>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={emitFunction} />
        </>
    )
}
