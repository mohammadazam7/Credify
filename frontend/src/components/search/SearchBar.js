import React, { useEffect, useRef } from 'react';

const SearchBar = ({ 
  searchTerm, 
  setSearchTerm, 
  handleSearch, 
  suggestions, 
  showSuggestions, 
  setShowSuggestions, 
  handleInputChange 
}) => {
  const dropdownRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    handleSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container">
      <input
        type="text"
        id="search-input"
        value={searchTerm}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search for cards by name, bank, or benefits..."
      />
      <button id="search-btn" onClick={handleSearch}>
        Search
      </button>
      
      {showSuggestions && (
        <div 
          className="search-history-dropdown" 
          style={{ display: 'block' }}
          ref={dropdownRef}
        >
          {suggestions.map((suggestion, index) => (
            <div 
              key={index} 
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;