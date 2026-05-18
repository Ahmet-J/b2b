import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden mesh-bg-dark">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-2 h-2 bg-[#d90429]/30 rounded-full top-[15%] left-[10%] animate-float"></div>
        <div className="absolute w-3 h-3 bg-[#d90429]/20 rounded-full top-[30%] right-[20%] animate-float-delayed"></div>
        <div className="absolute w-1.5 h-1.5 bg-[#d90429]/40 rounded-full bottom-[25%] left-[30%] animate-float-slow"></div>
      </div>

      {/* Background Glows */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#d90429]/12 rounded-full blur-[150px] animate-float-slow"></div>
      <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-[#3a3d5c]/25 rounded-full blur-[180px] animate-float-delayed"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="animate-slide-up">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
                <span>🇸🇴</span>
                <span className="text-gray-300 text-sm font-medium">Somalia</span>
              </div>
              <span className="text-gray-500 text-lg">↔️</span>
              <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
                <span>🇨🇳</span>
                <span className="text-gray-300 text-sm font-medium">China</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-display leading-[1.05] mb-6 text-white">
              Trade Between<br />
              <span className="text-gradient-red animate-shimmer">Somalia & China</span><br />
              Made Easy
            </h1>

            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              Dragon B2B connects <span className="text-white font-semibold">Somali entrepreneurs</span> directly with{' '}
              <span className="text-[#ef233c] font-semibold">verified Chinese manufacturers</span>. 
              Source quality products, negotiate best prices, and grow your business — all in one platform.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/dashboard/products" className="group relative bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white font-bold px-8 py-4 rounded-full overflow-hidden shadow-2xl shadow-[#d90429]/30 hover:shadow-[#d90429]/50 transition-all duration-500 hover:-translate-y-1 animate-glow">
                <span className="relative z-10 flex items-center gap-2">
                  <i className="fas fa-rocket"></i> Start Sourcing from China
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#ef233c] to-[#d90429] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
              <button className="glass-card text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-500 flex items-center gap-2">
                <i className="far fa-play-circle text-xl"></i> How It Works
              </button>
            </div>

            <div className="border-t border-white/10 pt-6">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Trusted by Somali Businesses</p>
              <div className="flex gap-6 sm:gap-10">
                <div className="stat-item">
                  <p className="text-3xl sm:text-4xl font-extrabold text-white">1,200+</p>
                  <p className="text-gray-500 text-xs sm:text-sm">Somali Importers</p>
                </div>
                <div className="stat-item" style={{ animationDelay: '0.2s' }}>
                  <p className="text-3xl sm:text-4xl font-extrabold text-white">8,500+</p>
                  <p className="text-gray-500 text-xs sm:text-sm">Chinese Suppliers</p>
                </div>
                <div className="stat-item" style={{ animationDelay: '0.4s' }}>
                  <p className="text-3xl sm:text-4xl font-extrabold text-white">$45M+</p>
                  <p className="text-gray-500 text-xs sm:text-sm">Trade Volume</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:block">
            <div className="glass-card rounded-3xl p-6 animate-float relative z-10">
              <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070&auto=format&fit=crop"
                   alt="Somali Business Trade"
                   className="w-full h-64 object-cover rounded-2xl mb-4" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">Dubai Wholesale Market</p>
                  <p className="text-xs text-gray-400">Direct from Guangzhou factories</p>
                </div>
                <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full">Verified ✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero