import { useState, useEffect, useRef } from 'react';
import api from '../utils/api';
import { useAuth } from '../utils/Auth';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  slug: string;
  description: string;
}

export default function SearchBar() {

  const navigate = useNavigate();
  const { isLogin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // click mouse outside to close search menu
  const searchContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen && searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // open drop down menu
  useEffect(() => {
    if (!searchQuery.trim()) {
     return;
    }
    console.log('now in search bar is:', searchQuery);
    const timer = setTimeout(async() => {
      if(isLogin){
        if(searchQuery.length >=3 ){
          const response = await api.get('/forums/search',{
            params:{q:searchQuery}
          });
          console.log('searching:', searchQuery);
          setResults(response.data);
          setIsDropdownOpen(true);
        }
      }
      else{
        alert('Please login.')
      }
    }, 2000);
  return () => clearTimeout(timer);
  }, [searchQuery, isLogin, navigate]);
  
  // submit btn clicked
  const handleSearchSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if(isLogin){
        const response = await api.get('/forums/search',{
            params:{q:searchQuery}
        });
        if(response.data == ""){
          alert(searchQuery + 'not found');
        }
        else{
          setIsDropdownOpen(false);
          navigate(`/?q=${searchQuery.trim()}`);
        }
      }
      else{
        alert('Please Login.')
      }
      console.log('submit clicked with:', searchQuery);
    }
  };

  const handleSelectResult = (item: SearchResult) => {
    setSearchQuery(item.slug);
    navigate(`/?q=${item.slug}`);
    setIsDropdownOpen(false);
  };

  return (
    // binding searchContainerRef to div
    <div ref={searchContainerRef} style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
      {/* search bar */}
      <form onSubmit={handleSearchSubmit} style={{ display: 'flex', width: '100%' }}>
      <span style={{ 
              width: '10px',
              padding: '18px 20px', 
              borderRadius: '20px 0 0 20px',
              border: 'none', 
              backgroundColor: '#DCDCDC',
              outline: 'none',
              fontSize: '14px'
            }} >🔍</span>
      <input 
          type="text" 
          placeholder="Search fourm..." 
          value={searchQuery}
          onChange={(e) => {
            const value = e.target.value;
            setSearchQuery(value); 
            
            // if search bar cleared, close dropdown menu
            if (!value.trim()) {
              setResults([]);
              setIsDropdownOpen(false);
            }
          }}
          onFocus={() => searchQuery.trim() && results.length > 0 && setIsDropdownOpen(true)}
          style={{ 
              flex: 2,
              padding: '18px 26px', 
              border: 'none', 
              backgroundColor: '#DCDCDC',
              outline: 'none',
              fontSize: '14px'
            }} 
        />
        <button 
          type="submit" 
          style={{ 
              padding: '8px 20px', 
              borderRadius: '0 20px 20px 0',
              border: 'none', 
              backgroundColor: '#66ccff', 
              color: '#282c34',
              cursor: 'pointer', 
              fontWeight: 'bold' 
            }}
        >
          Search
        </button>
      </form>

      {/* dropdown menu */}
      {isDropdownOpen && results.length > 0 && (
        <ul style={{ 
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '8px', 
          backgroundColor: 'white', color: 'black', borderRadius: '12px', 
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)', listStyle: 'none', 
          padding: '8px 0', margin: '8px 0 0 0', zIndex: 1000, overflow: 'hidden'
        }}>
          {results.map((item) => (
            <li 
              key={item.id} 
              onClick={() => handleSelectResult(item)}
              style={{ padding: '12px 20px', cursor: 'pointer', fontSize: '1rem' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {item.slug}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}