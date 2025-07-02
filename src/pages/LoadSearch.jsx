import { useEffect, useState } from "react";
import mockLoads from "../data/mockLoad"; // Sample mock data for loads
import LoadCard from "../components/LoadCard"; // Reusable component for displaying a single load

export default function LoadSearch() {
  // Search & suggestion state
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // UI states
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");

  // Simulate loading effect for initial render
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter loads based on search input (origin or destination match)
  const filteredLoads = mockLoads.filter(
    (load) =>
      load.origin.toLowerCase().includes(search.toLowerCase()) ||
      load.destination.toLowerCase().includes(search.toLowerCase())
  );

  // Sort filtered loads based on selected sort option
  let sortedLoads = [...filteredLoads];
  if (sortOption === "date-desc") {
    sortedLoads.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortOption === "date-asc") {
    sortedLoads.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortOption === "weight-desc") {
    sortedLoads.sort((a, b) => parseInt(b.weight) - parseInt(a.weight));
  } else if (sortOption === "weight-asc") {
    sortedLoads.sort((a, b) => parseInt(a.weight) - parseInt(b.weight));
  }

  // Paginate the sorted loads
  const paginatedLoads = sortedLoads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredLoads.length / itemsPerPage);

  // Handle input change + update suggestions for autocomplete
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setCurrentPage(1); // Reset to first page on new search

    if (!value) {
      setSuggestions([]);
      return;
    }

    // Match cities from both origin and destination
    const matches = mockLoads.filter(
      (load) =>
        load.origin.toLowerCase().includes(value.toLowerCase()) ||
        load.destination.toLowerCase().includes(value.toLowerCase())
    );

    // Collect unique matching city names
    const uniqueCities = Array.from(
      new Set([
        ...matches.map((l) => l.origin),
        ...matches.map((l) => l.destination),
      ])
    ).filter((city) => city.toLowerCase().includes(value.toLowerCase()));

    setSuggestions(uniqueCities.slice(0, 5)); // Limit suggestions
  };

  // Keyboard navigation for suggestion list
  const handleSuggestionKey = (e) => {
    if (e.key === "ArrowDown") {
      setActiveSuggestion((prev) =>
        Math.min(prev + 1, suggestions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setActiveSuggestion((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && suggestions[activeSuggestion]) {
      setSearch(suggestions[activeSuggestion]);
      setSuggestions([]);
    }
  };

  // Temporary loading skeleton for UI feedback
  const LoadSkeleton = () => (
    <div className="bg-gray-800 animate-pulse rounded-xl p-5 h-40"></div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4">
      
      <div className="w-full max-w-6xl mx-auto px-4 pb-8">
        {/* Sticky top header with search and sort */}
        <div className="sticky top-0 bg-gray-950 z-30 pb-6 pt-8">
          {/* Page Title */}
          <div className="text-center mb-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-tight">
              📦 Available Loads
            </h1>
            <p className="text-gray-400 mt-2 text-lg">Search and browse freight listings</p>
          </div>

          {/* Search and Sort Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Search Bar with Suggestions */}
            <div className="relative w-full sm:w-2/3">
              <input
                type="text"
                placeholder="Search by origin or destination..."
                value={search}
                onChange={handleSearchChange}
                onKeyDown={handleSuggestionKey}
                className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Auto-suggest dropdown list */}
              {suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 mt-1 bg-gray-600 border border-blue-500 rounded-md max-h-48 overflow-y-auto shadow-xl z-40">
                  {suggestions.map((city, index) => (
                    <li
                      key={index}
                      className={`px-4 py-2 cursor-pointer transition-all duration-150 ${
                        index === activeSuggestion
                          ? "bg-blue-600 text-white"
                          : "hover:bg-blue-500 hover:text-white text-gray-200"
                      }`}
                      onClick={() => {
                        setSearch(city);
                        setSuggestions([]);
                      }}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="w-full sm:w-auto flex justify-center sm:justify-end">
              <div className="flex flex-row items-center gap-2">
                <label className="text-gray-300 whitespace-nowrap">Sort By:</label>
                <select
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="date-desc">Date (Newest)</option>
                  <option value="date-asc">Date (Oldest)</option>
                  <option value="weight-desc">Weight (High to Low)</option>
                  <option value="weight-asc">Weight (Low to High)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Load Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <LoadSkeleton key={i} />) // Show skeleton while loading
            : paginatedLoads.map((load) => (
                <div key={load.id} className="animate-fade-in">
                  <LoadCard load={load} />
                </div>
              ))}
        </div>

        {/* Pagination Buttons */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-md font-semibold ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* No results fallback */}
        {!loading && filteredLoads.length === 0 && (
          <p className="text-gray-400 mt-10 text-center text-lg">
            🚚 No loads found for your search.
          </p>
        )}
      </div>
    </div>
  );
}
