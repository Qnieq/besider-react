const Footer = () => {
    return (
      <footer className="p-5 text-center text-black text-[12px]">
        <nav className="flex justify-center gap-[20px]">
          <a href="#" className="hover:underline">Log In</a>
          <a href="#" className="hover:underline">About Us</a>
          <a href="#" className="hover:underline">Publishers</a>
          <a href="#" className="hover:underline">Sitemap</a>
        </nav>
        <p className="mt-5 mb-2">Powered by</p>
        <div className="inline-flex items-center space-x-2">
          <img src="/news-api-icon.png" className="w-[84px] " />
        </div>
        <p className="mt-4 text-sm">&copy; 2023 Besider. Inspired by Insider</p>
      </footer>
    );
  };
  
  export default Footer;