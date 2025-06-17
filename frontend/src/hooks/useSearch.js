import { useState, useEffect, useCallback } from 'react';
import {
  filterCards,
  fetchAutocompleteSuggestions,
  fetchSpellingSuggestions,
  recordSearch,
  fetchWordFrequency,
  fetchSearchHistory,
  clearSearchHistory as apiClearSearchHistory
} from '../services/api';

const useSearch = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [bankFilter, setBankFilter] = useState('');
  const [feeFilter, setFeeFilter] = useState('');
  const [interestFilter, setInterestFilter] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [wordFrequency, setWordFrequency] = useState({ word: '', count: 0 });
  const [searchHistory, setSearchHistory] = useState({});
  const [spellingSuggestions, setSpellingSuggestions] = useState([]);

  // Load cards with filters
  const loadCards = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await filterCards(searchTerm, bankFilter, feeFilter, interestFilter);
      setCards(data);
      
      // If no results and has search term, check for spelling suggestions
      if (data.length === 0 && searchTerm) {
        const suggestions = await fetchSpellingSuggestions(searchTerm);
        setSpellingSuggestions(suggestions);
      } else {
        setSpellingSuggestions([]);
      }
    } catch (err) {
      setError('Failed to load cards. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, bankFilter, feeFilter, interestFilter]);

  // Handle search with recording
  const handleSearch = useCallback(async (suggestion="") => {
    if (!searchTerm.trim()) return;
    
    try {
      // Record search term
      await recordSearch(suggestion);
      
      // Update word frequency display
      const frequency = await fetchWordFrequency(suggestion);
      setWordFrequency(frequency);
      
      // Apply filters and load cards
      await loadCards();
      
      // Refresh history
      await loadSearchHistory();
      
    } catch (err) {
      setError('Search operation failed. Please try again.');
      console.error(err);
    }
  }, [loadCards]);

  // Load search history
  const loadSearchHistory = useCallback(async () => {
    try {
      const history = await fetchSearchHistory();
      setSearchHistory(history);
    } catch (err) {
      console.error('Failed to load search history:', err);
    }
  }, []);

  // Clear search history
  const clearSearchHistory = useCallback(async () => {
    try {
      await apiClearSearchHistory();
      setSearchHistory({});
    } catch (err) {
      console.error('Failed to clear search history:', err);
    }
  }, []);

  // Handle autocomplete
  const handleInputChange = useCallback(async (value) => {
    setSearchTerm(value);
    
    if (value.trim().length > 0) {
      try {
        const data = await fetchAutocompleteSuggestions(value);
        setSuggestions(data);
        
        setShowSuggestions(data.length > 0);
      } catch (err) {
        console.error('Autocomplete error:', err);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, []);

  // Apply suggestion
  const applySuggestion = useCallback(async (suggestion) => {
    // Immediately update the search bar with the selected suggestion.
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    
    try {
      // Fetch and update the word frequency using the suggestion value directly.
      const frequency = await fetchWordFrequency(suggestion);
      setWordFrequency(frequency);
      
      // Optionally record the search if needed.
      await recordSearch(suggestion);
      
      // Load cards using the suggestion value.
      await loadCards(suggestion);
      
      // Refresh search history if desired.
      await loadSearchHistory();
    } catch (err) {
      console.error('Error processing suggestion:', err);
    }
  }, [loadCards, loadSearchHistory]);
  

  // Effect to load cards on filter change
  useEffect(() => {
    loadCards();
  }, [bankFilter, feeFilter, interestFilter, loadCards]);

  // Effect to load search history on mount
  useEffect(() => {
    loadSearchHistory();
  }, [loadSearchHistory]);

  return {
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
  };
};

export default useSearch;