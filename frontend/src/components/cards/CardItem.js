import React from 'react';

const CardItem = ({ card, onViewDetails }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{card.cardTitle}</h2>
      </div>
      <div className="card-body">
        <div className="card-image">
          <img src={card.cardImages} alt={card.cardTitle} />
        </div>
        <div className="card-detail">
          <h3>Annual Fee</h3>
          <p>{card.annualFees}</p>
        </div>
        <div className="card-detail">
          <h3>Interest Rates</h3>
          <p><b>Purchase Interest Rate:</b> {(card.purchaseInterestRate * 100).toFixed(2)}%</p>
          <p><b>Cash Interest Rate:</b> {(card.cashInterestRate * 100).toFixed(2)}%</p>
        </div>
        <div className="card-detail">
          <h3>Value Proposition</h3>
          <p>{card.productValueProp}</p>
        </div>
        <div className="card-detail">
          <h3>Benefits</h3>
          <div className="benefits">
            {card.productBenefits
              .split("*")
              .map((benefit, index) => 
                benefit.trim() ? (
                  <span key={index} className="benefit-tag">{benefit.trim()}</span>
                ) : null
              )
            }
          </div>
        </div>
        <div className="card-footer">
          <button className="details-btn" onClick={() => onViewDetails(card)}>
            View Details
          </button>
          <a className="link-btn" href={card.cardLink}>
            Apply
          </a>
        </div>
      </div>
    </div>
  );
};
export default CardItem;