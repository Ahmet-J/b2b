import { useState } from 'react'
import { Link } from 'react-router-dom'
import dragon from '../../assets/dragon.png'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Desktop Header */}
      <div className="glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-20 gap-2 sm:gap-4">
            
            {/* Logo - Responsive */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group">
              <div className="relative">
                <img src={dragon} alt="Dragon Logo" className="w-14 h-8 sm:w-20 sm:h-12 object-contain" />
                <div className="absolute -inset-1 bg-[#d90429]/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg sm:text-xl font-bold text-white tracking-tight">DRAGON</span>
                <span className="block text-[8px] sm:text-[10px] text-gray-400 font-medium tracking-widest uppercase">China Trade</span>
              </div>
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              <Link to="/" className="px-2 xl:px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all font-medium text-xs xl:text-sm flex items-center gap-1.5">
                <i className="fas fa-home text-[#d90429] text-[10px] xl:text-xs" /> 
                <span className="hidden xl:inline">Home</span>
              </Link>
              <Link to="/product" className="px-2 xl:px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all font-medium text-xs xl:text-sm flex items-center gap-1.5">
                <i className="fas fa-box-open text-[#d90429] text-[10px] xl:text-xs" /> 
                <span className="hidden xl:inline">Products</span>
              </Link>
              <Link to="/categories" className="px-2 xl:px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all font-medium text-xs xl:text-sm flex items-center gap-1.5">
                <i className="fas fa-table-cells text-[#d90429] text-[10px] xl:text-xs" /> 
                <span className="hidden xl:inline">Categories</span>
              </Link>
              <Link to="/orders" className="px-2 xl:px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all font-medium text-xs xl:text-sm flex items-center gap-1.5">
                <i className="fas fa-clipboard-check text-[#d90429] text-[10px] xl:text-xs" /> 
                <span className="hidden xl:inline">Orders</span>
              </Link>
              <Link to="/inquiry" className="px-2 xl:px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all font-medium text-xs xl:text-sm flex items-center gap-1.5">
                <i className="fas fa-file-signature text-[#d90429] text-[10px] xl:text-xs" /> 
                <span className="hidden xl:inline">Inquiry</span>
              </Link>
            </nav>

            {/* Action Buttons + Mobile Menu Toggle */}
            <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
          


              {/* Cart Button */}
              <Link to="/orders" className="relative w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all group">
                <i className="fa-solid fa-cart-shopping text-gray-300 group-hover:text-[#d90429] transition-all text-sm sm:text-lg" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#d90429] rounded-full flex items-center justify-center text-white text-[8px] sm:text-[9px] font-bold"></span>
              </Link>

              {/* ✅ Mobile Menu Toggle Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all ml-1"
              >
                <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-gray-300 text-sm`} />
              </button>
            </div>
          </div>
        </div>
      </div>


     {/* ✅ Mobile Navigation - ALWAYS VISIBLE */}
<div className="lg:hidden glass border-b border-white/5">
  <div className="flex justify-around px-1 py-2 overflow-x-auto">
    <Link to="/" className="flex flex-col items-center gap-1 text-[#d90429] text-[10px] sm:text-xs font-medium px-2 py-1.5 rounded-lg bg-[#d90429]/10 whitespace-nowrap">
      <i className="fas fa-home text-sm" /> Home
    </Link>
    <Link to="/product" className="flex flex-col items-center gap-1 text-gray-400 text-[10px] sm:text-xs font-medium px-2 py-1.5 rounded-lg hover:text-white transition-all whitespace-nowrap">
      <i className="fas fa-box-open text-sm" /> Products
    </Link>
    <Link to="/categories" className="flex flex-col items-center gap-1 text-gray-400 text-[10px] sm:text-xs font-medium px-2 py-1.5 rounded-lg hover:text-white transition-all whitespace-nowrap">
  <i className="fas fa-table-cells text-sm" /> Categories
</Link>
    <Link to="/orders" className="flex flex-col items-center gap-1 text-gray-400 text-[10px] sm:text-xs font-medium px-2 py-1.5 rounded-lg hover:text-white transition-all whitespace-nowrap">
      <i className="fas fa-clipboard-check text-sm" /> Orders
    </Link>
    <Link to="/inquiry" className="flex flex-col items-center gap-1 text-gray-400 text-[10px] sm:text-xs font-medium px-2 py-1.5 rounded-lg hover:text-white transition-all whitespace-nowrap">
      <i className="fas fa-file-signature text-sm" /> Inquiry
    </Link>
  </div>
</div>
    </header>
  )
}

export default Header