import React from 'react';
import Header from './components/ui/Header';
import NewsList from './components/features/news/NewsList';
import Footer from './components/ui/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-white">
      <Header />
      <NewsList />
      <Footer />
    </div>
  );
};

export default App;
