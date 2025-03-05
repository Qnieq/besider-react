import React from 'react';
import Header from './components/ui/Header';
import NewsList from './components/features/news/NewsList';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <NewsList />
    </div>
  );
};

export default App;
