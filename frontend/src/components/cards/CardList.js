import React, { useState } from 'react';
import CardItem from './CardItem';
import CardDetails from './CardDetails';

const CardList = ({ cards, loading, error, spellingSuggestions, applySuggestion }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleViewDetails = (card) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  if (loading) {
    return (
      <div className="loader" style={{ display: 'flex' }}>
        <div className="loader-spinner"></div>
        <p>Loading cards...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  }

  if (spellingSuggestions && spellingSuggestions.length > 0) {
    return (
      <div className="spelling-suggestion">
        <p>No cards found. Did you mean:</p>
        <ul>
          {spellingSuggestions.map((suggestion, index) => (
            <li key={index}>
              <a href="#" onClick={() => applySuggestion(suggestion)}>
                {suggestion}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <p>No cards match your search criteria. Please try different filters.</p>
    );
  }

  return (
    <>
      <div className="cards-container" id="cards-container">
        {cards.map((card) => (
          <CardItem 
            key={card.id} 
            card={card} 
            onViewDetails={handleViewDetails} 
          />
        ))}
      </div>
      {selectedCard && (
        <CardDetails 
          card={selectedCard} 
          onClose={handleCloseModal} 
        />
      )}
    </>
  );
};

export default CardList;