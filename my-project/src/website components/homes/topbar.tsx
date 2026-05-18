const TopBar = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#2b2d42] via-[#1a1b2e] to-[#2b2d42] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=40 height=40 xmlns=http://www.w3.org/2000/svg%3E%3Ccircle cx=20 cy=20 r=1 fill=white/%3E%3C/svg%3E')",
          backgroundSize: '20px 20px'
        }}>
      </div>
      <div className="relative flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-2.5 text-xs sm:text-sm gap-1.5 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-gray-300">🌍 Linking Somali entrepreneurs with Chinese suppliers</span>
          </span>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <a href="tel:+252610000000" className="hover:text-white transition-all">
            <i className="fas fa-phone-alt text-[#ef233c] mr-1"></i> +252 63 xxxxxxx
          </a>
          <span className="hidden sm:block">|</span>
          <a href="mailto:info@dragontrade.so" className="hover:text-white transition-all">
            <i className="fas fa-envelope text-[#ef233c] mr-1"></i> info@dragontrade.so
          </a>
        </div>
      </div>
    </div>
  )
}

export default TopBar