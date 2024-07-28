import React from 'react'
import "./CCard.css"

export const CCard = ({name, description}) => {
    return (
        <div className="card service-card">
          <div className="card-body">
            <h3 className="card-title">{name}</h3>
            <p className="card-text">{description}</p>
          </div>
        </div>
      );
    };
