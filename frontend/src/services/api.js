export const fetchCards = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/creditcards");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log(response);

    return await response.json();
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
};

export const filterCards = async (
  searchTerm = "",
  bankFilter = "",
  feeFilter = "",
  interestFilter = ""
) => {
  try {
    let url = "http://localhost:8080/api/creditcards?";
    if (bankFilter) url += `bankName=${bankFilter}&`;
    if (feeFilter) {
      const [minFee, maxFee] = feeFilter.split("-").map(Number);
      url += `minFee=${minFee}&maxFee=${maxFee}&`;
    }
    if (interestFilter) {
      const [minInterest, maxInterest] = interestFilter.split("-").map(Number);
      url += `minInterest=${minInterest}&maxInterest=${maxInterest}&`;
    }
    if (searchTerm) url += `search=${searchTerm}&`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error filtering cards:", error);
    throw error;
  }
};

export const fetchAutocompleteSuggestions = async (prefix) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/creditcards/autocomplete?prefix=${prefix}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching autocomplete suggestions:", error);
    throw error;
  }
};

export const fetchSpellingSuggestions = async (term) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/creditcards/spelling-suggestions?word=${term}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching spelling suggestions:", error);
    throw error;
  }
};

export const recordSearch = async (term) => {
  if (!term.trim()) return;
  try {
    const response = await fetch('http://localhost:8080/api/creditcards/search-history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ term }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    // Get the raw text
    const text = await response.text();
    
    // Return parsed JSON if text exists, else return null (or a default value)
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error('Error recording search:', error);
    throw error;
  }
};


export const fetchWordFrequency = async (term) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/creditcards/word-frequency?word=${encodeURIComponent(
        term
      )}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching word frequency:", error);
    throw error;
  }
};

export const fetchSearchHistory = async (limit = 10) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/creditcards/search-history?limit=${limit}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching search history:", error);
    throw error;
  }
};

export const clearSearchHistory = async () => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/creditcards/search-history",
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Get the raw text
    const text = await response.text();
    
    // Return parsed JSON if text exists, else return null (or a default value)
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("Error clearing search history:", error);
    throw error;
  }
};
