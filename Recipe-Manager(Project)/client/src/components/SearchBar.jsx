import React, { useState } from 'react';

const SearchBar = ({ onSearch, categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm, filterCategory);
  };
  
  const handleClear = () => {
    setSearchTerm('');
    setFilterCategory('');
    onSearch('', '');
  };
  
  return (
    <form onSubmit={handleSearch} className="bg-gray-900 p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-yellow-400 bg-gray-900 text-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-yellow-200"
            />
            <div className="absolute left-3 top-2.5">
              <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full py-2 px-3 border border-yellow-400 bg-gray-900 text-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="" className="text-black">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category} className="text-black">
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex justify-end mt-4 space-x-2">
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 bg-yellow-200 text-black rounded-lg hover:bg-yellow-300 focus:outline-none"
        >
          Clear
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 focus:outline-none"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;