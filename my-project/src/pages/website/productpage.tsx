import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { getallproductfn } from '@/redux/slices/dashboard/productsslice/getallproducts'
import Header from '../../website components/homes/header'
import Footer from '../../website components/homes/footer'

import { Search, Package, ShoppingCart, Loader2, X } from 'lucide-react'

const ProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data, isLoading } = useSelector((state: RootState) => state.getallproduct)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    dispatch(getallproductfn())
  }, [dispatch])

  // Extract products
  const products = Array.isArray(data) ? data : data?.data || data?.products || data?.result || []
  const activeProducts = products.filter((p: any) => !p.is_deleted && p.isActive)

  // Get unique categories from products
  const categories = ['all', ...new Set(activeProducts.map((p: any) => p.category?.name || 'Uncategorized'))]

  // Filter products
  const filteredProducts = activeProducts.filter((product: any) => {
    const matchesCategory = selectedCategory === 'all' || product.category?.name === selectedCategory
    const matchesSearch = !searchQuery.trim() || 
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a14]">
        <Header />
        <div className="flex items-center justify-center py-40">
          <Loader2 className="w-12 h-12 text-[#d90429] animate-spin" />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <Header />
      
      {/* Hero Banner */}
      <section className="relative py-16 lg:py-24 mesh-bg-dark">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#d90429]/8 rounded-full blur-[120px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-[#d90429]/10 text-[#ef233c] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-4 border border-[#d90429]/20">
            📦 Our Products
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">
            All <span className="text-gradient-red">Products</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Browse our complete catalog of products from verified Chinese manufacturers
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 mesh-bg-features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#d90429]"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat: string) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`filter-btn text-xs font-semibold px-5 py-2.5 rounded-full border capitalize ${
                    selectedCategory === cat ? 'active' : ''
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product: any) => (
                <div key={product.id} className="product-card group cursor-pointer">
                  <div className="relative h-56 bg-gradient-to-br from-[#2b2d42]/30 to-[#1a1b2e]/30 flex items-center justify-center p-6 overflow-hidden">
                    {product.images?.[0]?.url ? (
                      <img src={product.images[0].url} className="product-image h-full w-full object-contain" alt={product.name} />
                    ) : (
                      <Package className="w-16 h-16 text-gray-600" />
                    )}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-[#d90429] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">{product.currency || 'USD'} {product.price}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">{product.category?.name || 'General'}</p>
                    <h3 className="text-white font-bold mt-1 text-sm line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-gray-500 mt-2">Min Order: {product.minOrderQty || 1} | Stock: {product.stock || 0}</p>
                    <Link to="/inquiry" className="w-full mt-4 bg-[#d90429] hover:bg-[#ef233c] text-white font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-[#d90429]/20 text-sm flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4 mr-2" /> Request Quote
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
              <p className="text-gray-400">Try a different search or category</p>
            </div>
          )}

          {/* Product Count */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">Showing {filteredProducts.length} of {activeProducts.length} products</p>
          </div>
        </div>
      </section>

      <Footer />
   
    </div>
  )
}

export default ProductsPage