const Features = () => {
  return (
    <section className="relative py-20 lg:py-28 mesh-bg-features">
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#d90429]/5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#3a3d5c]/10 rounded-full blur-[120px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#d90429] animate-ping-slow"></div>
            <span className="text-gray-300 text-xs sm:text-sm font-medium tracking-wider uppercase">
              ⚡ Why Somali Businesses Choose Dragon
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
            Everything <span className="text-gradient-red">You Need</span> to Scale
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            End-to-end B2B solutions connecting Somali importers with trusted Chinese manufacturers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Feature 1 */}
          <div className="glass-card rounded-3xl p-8 cursor-pointer animate-scale-in">
            <div className="w-14 h-14 bg-[#d90429]/10 rounded-2xl flex items-center justify-center mb-5 text-2xl text-[#ef233c]">
              <i className="fas fa-shield-halved"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Trade Assurance</h3>
            <p className="text-gray-400 text-sm leading-relaxed">100% payment protection. Your money is secure until you confirm delivery and product quality.</p>
          </div>

          {/* Feature 2 */}
          <div className="glass-card rounded-3xl p-8 cursor-pointer animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="w-14 h-14 bg-[#d90429]/10 rounded-2xl flex items-center justify-center mb-5 text-2xl text-[#ef233c]">
              <i className="fas fa-ship"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Somalia Shipping</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Reliable sea & air freight from China to Mogadishu, Hargeisa, Bosaso & all major Somali ports.</p>
          </div>

          {/* Feature 3 */}
          <div className="glass-card rounded-3xl p-8 cursor-pointer animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-14 h-14 bg-[#d90429]/10 rounded-2xl flex items-center justify-center mb-5 text-2xl text-[#ef233c]">
              <i className="fas fa-language"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Somali Support</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Dedicated Somali-speaking agents available 24/7. Communicate easily — no language barriers.</p>
          </div>

          {/* Feature 4 */}
          <div className="glass-card rounded-3xl p-8 cursor-pointer animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="w-14 h-14 bg-[#d90429]/10 rounded-2xl flex items-center justify-center mb-5 text-2xl text-[#ef233c]">
              <i className="fas fa-tags"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Factory Prices</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Direct from Chinese factories — no middlemen, save up to 40% compared to local wholesalers.</p>
          </div>

          {/* Feature 5 */}
          <div className="glass-card rounded-3xl p-8 cursor-pointer animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <div className="w-14 h-14 bg-[#d90429]/10 rounded-2xl flex items-center justify-center mb-5 text-2xl text-[#ef233c]">
              <i className="fas fa-certificate"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Verified Suppliers</h3>
            <p className="text-gray-400 text-sm leading-relaxed">All Chinese factories undergo rigorous verification including factory audits & quality checks.</p>
          </div>

          {/* Feature 6 */}
          <div className="glass-card rounded-3xl p-8 cursor-pointer animate-scale-in" style={{ animationDelay: '0.5s' }}>
            <div className="w-14 h-14 bg-[#d90429]/10 rounded-2xl flex items-center justify-center mb-5 text-2xl text-[#ef233c]">
              <i className="fas fa-arrow-rotate-left"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Easy Returns</h3>
            <p className="text-gray-400 text-sm leading-relaxed">30-day hassle-free return policy. If products don't meet specs, we'll make it right.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features