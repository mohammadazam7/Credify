import React from 'react';

const CardDetails = ({ card, onClose }) => {
  // Parse benefits for better display
  const benefitsArray = card.productBenefits
    .split("*")
    .map((benefit) => benefit.trim())
    .filter((benefit) => benefit !== "");

  return (
    <div className="modal" id="card-modal" style={{ display: 'flex' }}>
      <div className="modal-content">
        <span className="close-modal" id="close-modal" onClick={onClose}>&times;</span>
        <div className="modal-header">
          <h2 id="modal-card-title">{card.cardTitle}</h2>
        </div>
        <div id="modal-card-details">
          <div className="card-image" style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img src={card.cardImages} alt={card.cardTitle} style={{ maxWidth: '250px' }} />
          </div>
          <div className="card-detail">
            <h3>Bank</h3>
            <p>{card.bankName}</p>
          </div>
          <div className="card-detail">
            <h3>Annual Fee</h3>
            <p>{card.annualFees}</p>
          </div>
          <div className="card-detail">
            <h3>Interest Rates</h3>
            <p><strong>Purchase Interest Rate:</strong> {(card.purchaseInterestRate * 100).toFixed(2)}%</p>
            <p><strong>Cash Interest Rate:</strong> {(card.cashInterestRate * 100).toFixed(2)}%</p>
          </div>
          <div className="card-detail">
            <h3>Value Proposition</h3>
            <p>{card.productValueProp}</p>
          </div>
          <div className="card-detail">
            <h3>Benefits</h3>
            <ul>
              {benefitsArray.map((benefit, index) => (
                <div key={index} className="benefit-tag" style={{ marginBottom: '10px' }}>
                  {benefit}
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;