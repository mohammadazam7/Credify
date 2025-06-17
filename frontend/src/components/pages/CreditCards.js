import React from 'react';
import Header from '../layout/Header';
import SearchBar from '../search/SearchBar';
import SearchHistory from '../search/searchHistory';
import CardList from '../cards/CardList';
import useSearch from '../../hooks/useSearch';

const CreditCards = () => {
  const {
    cards,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    bankFilter,
    setBankFilter,
    feeFilter,
    setFeeFilter,
    interestFilter,
    setInterestFilter,
    handleSearch,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    handleInputChange,
    applySuggestion,
    wordFrequency,
    searchHistory,
    clearSearchHistory,
    spellingSuggestions
  } = useSearch();

  return (
    <div className="credit-cards-page">
      <Header 
        title="Credit Card Comparison" 
        subTitle="Find the perfect credit card for your lifestyle and needs"
      />
      
      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        handleInputChange={handleInputChange}
      />
      
      <SearchHistory 
        searchHistory={searchHistory}
        clearSearchHistory={clearSearchHistory}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        wordFrequency={wordFrequency}
      />
      
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="bank-filter">Bank</label>
          <select 
            id="bank-filter"
            value={bankFilter}
            onChange={(e) => setBankFilter(e.target.value)}
          >
            <option value="">All Banks</option>
            <option value="CIBC">CIBC</option>
            <option value="RBC">RBC</option>
            <option value="TD">TD</option>
            <option value="BMO">BMO</option>
            <option value="Scotia">Scotia</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="fee-filter">Annual Fee</label>
          <select 
            id="fee-filter"
            value={feeFilter}
            onChange={(e) => setFeeFilter(e.target.value)}
          >
            <option value="">All Fees</option>
            <option value="0-0">No Annual Fee</option>
            <option value="1-100">$1 - $100</option>
            <option value="101-200">$101 - $200</option>
            <option value="201-100000">$201+</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="interest-filter">Purchase Interest Rate</label>
          <select 
            id="interest-filter"
            value={interestFilter}
            onChange={(e) => setInterestFilter(e.target.value)}
          >
            <option value="">All Rates</option>
            <option value="0-0">0% - 0%</option>
            <option value="1-10">1% - 10%</option>
            <option value="11-20">11% - 20%</option>
            <option value="20-100">20%+</option>
          </select>
        </div>
      </div>
      
      <CardList 
        cards={cards}
        loading={loading}
        error={error}
        spellingSuggestions={spellingSuggestions}
        applySuggestion={applySuggestion}
      />
    </div>
  );
};

export default CreditCards;