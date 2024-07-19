import React from 'react'

export const CCard = ({name, description}) => {
    return (
        <>
            <div className='card'>
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
        </>
    )
}
