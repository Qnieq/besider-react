import React, { useState } from 'react';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 h-[72px] text-white p-4 flex items-center justify-between relative">
      <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <h1 className="text-lg font-bold">Besider</h1>
      <div></div>
      {menuOpen && (
        <div
          className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-50"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="bg-white w-3/4 h-full p-4"
            onClick={e => e.stopPropagation()}
          >
            <p className="mb-4 text-gray-800 font-bold">Меню</p>
            <ul>
              <li className="mb-2 text-gray-600">Пункт 1</li>
              <li className="mb-2 text-gray-600">Пункт 2</li>
              <li className="mb-2 text-gray-600">Пункт 3</li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
