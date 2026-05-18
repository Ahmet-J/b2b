// src/components/Footer.jsx
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#0a0a14] pt-20 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#d90429] to-[#ef233c] rounded-2xl flex items-center justify-center shadow-lg shadow-[#d90429]/20"><span className="text-white font-bold text-2xl">D</span></div>
              <div><span className="text-2xl font-bold text-white">DRAGON</span><span className="block text-[10px] text-gray-500 tracking-widest uppercase">Somalia ↔ China Trade</span></div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">The leading B2B platform connecting Somali businesses with verified Chinese manufacturers. Smarter sourcing, better prices, reliable delivery.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Explore</h4>
            <ul className="space-y-2.5 text-gray-500 text-sm">
              <li><Link to="/product" className="hover:text-[#ef233c] transition-all">Products</Link></li>
              <li><Link to="/categories" className="hover:text-[#ef233c] transition-all">Categories</Link></li>
              <li><Link to="/orders" className="hover:text-[#ef233c] transition-all">Orders</Link></li>
              <li><Link to="/inquiry" className="hover:text-[#ef233c] transition-all">Inquiry</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2.5 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-[#ef233c] transition-all">Help Center</a></li>
              <li><a href="#" className="hover:text-[#ef233c] transition-all">WhatsApp Support</a></li>
              <li><a href="#" className="hover:text-[#ef233c] transition-all">FAQs</a></li>
              <li><a href="#" className="hover:text-[#ef233c] transition-all">Report Issue</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2.5 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-[#ef233c] transition-all">About Dragon</a></li>
              <li><a href="#" className="hover:text-[#ef233c] transition-all">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">© 2026 Dragon Trade Hub. Connecting Somalia to the World.</p>
          <div className="flex gap-6 text-xs text-gray-600">
            <a href="#" className="hover:text-[#ef233c] transition-all">Privacy Policy</a>
            <a href="#" className="hover:text-[#ef233c] transition-all">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer