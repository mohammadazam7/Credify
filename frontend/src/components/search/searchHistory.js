import React from 'react';

const SearchHistory = ({ 
  searchHistory, 
  clearSearchHistory, 
  setSearchTerm, 
  handleSearch,
  wordFrequency 
}) => {
  const handleHistoryItemClick = (term) => {
    setSearchTerm(term);
    handleSearch();
  };

  return (
    <>
      {wordFrequency.word && (
        <div className="search-frequency" style={{ display: 'block' }}>
          The word "<span id="frequency-word">{wordFrequency.word}</span>" appears
          <span id="frequency-count"> {wordFrequency.count}</span> times
        </div>
      )}
      
      <div className="search-history-panel" id="search-history-panel">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h3 className="search-history-title">Frequently Searched Terms</h3>
          <button className="clear-history-btn" onClick={clearSearchHistory}>
            Clear History
          </button>
        </div>
        <div className="search-history-items" id="search-history-items">
          {Object.keys(searchHistory).length > 0 ? (
            Object.entries(searchHistory).map(([term, count], index) => (
              <div 
                key={index} 
                className="search-history-item"
                onClick={() => handleHistoryItemClick(term)}
              >
                {term}
                <span className="search-history-count">{count}</span>
              </div>
            ))
          ) : (
            <p>No search history yet</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchHistory;