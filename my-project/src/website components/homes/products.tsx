import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Same products data (yaa ama Context/store isticmaal haddii aad leedahay)
const ALL_PRODUCTS = [
  { id: 'prod-1', category: 'Electronics', title: 'Premium ANC Wireless Earbuds BT5.3', price: '$18.50', oldPrice: '$24.90', discount: '-25%', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop' },
  { id: 'prod-2', category: 'Electronics', title: 'Stainless Steel Smart Watch 4G',       price: '$29.90', oldPrice: '$44.00', discount: '-32%', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop' },
  { id: 'prod-3', category: 'Fashion',     title: 'Genuine Leather Travel Bag 25L',        price: '$22.80', oldPrice: '$38.00', discount: '-40%', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop' },
  { id: 'prod-4', category: 'Fashion',     title: 'Premium Cotton T-Shirts Bulk Pack',     price: '$4.50',  oldPrice: '$5.30',  discount: '-15%', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop' },
  { id: 'prod-5', category: 'Furniture',   title: 'Modern L-Shape Sofa Set Imported',      price: '$185.00',oldPrice: '$230.00',discount: '-20%', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop' },
  { id: 'prod-6', category: 'Furniture',   title: 'Elegant Dining Table Set 6 Chairs',     price: '$320.00',oldPrice: '$390.00',discount: '-18%', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1965&auto=format&fit=crop' },
]

const Wishlist = () => {
  const [wishlistIds, setWishlistIds] = useState([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dragon_wishlist')
      setWishlistIds(saved ? JSON.parse(saved) : [])
    } catch {
      setWishlistIds([])
    }
  }, [])

  const wishlistProducts = ALL_PRODUCTS.filter(p => wishlistIds.includes(p.id))

  const removeFromWishlist = (id) => {
    const updated = wishlistIds.filter(wId => wId !== id)
    setWishlistIds(updated)
    localStorage.setItem('dragon_wishlist', JSON.stringify(updated))
  }

  const clearAll = () => {
    setWishlistIds([])
    localStorage.setItem('dragon_wishlist', JSON.stringify([]))
  }

  return (
    <section className="relative py-20 lg:py-28 mesh-bg-features min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
          <div>
            <Link to="/" className="text-gray-400 hover:text-white text-sm flex items-center gap-2 mb-4 transition-all">
              <i className="fas fa-arrow-left"></i> Back
            </Link>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              My <span className="text-gradient-red">Wishlist</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          {wishlistProducts.length > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-gray-400 hover:text-[#d90429] border border-white/10 hover:border-[#d90429]/40 px-4 py-2 rounded-full transition-all"
            >
              <i className="fas fa-trash-alt mr-2"></i> Clear All
            </button>
          )}
        </div>

        {/* Empty state */}
        {wishlistProducts.length === 0 ? (
          <div className="glass-card rounded-3xl p-16 text-center">
            <div className="w-20 h-20 bg-[#d90429]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="far fa-heart text-[#d90429] text-3xl"></i>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Wishlist Empty</h3>
            <p className="text-gray-400 text-sm mb-8">
              Wali product uma darin wishlist-kaaga. Dib u noqo oo mid dooro!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#d90429] hover:bg-[#ef233c] text-white font-bold px-6 py-3 rounded-full transition-all"
            >
              <i className="fas fa-arrow-left"></i> Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProducts.map(product => (
              <WishlistCard
                key={product.id}
                product={product}
                onRemove={() => removeFromWishlist(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

const WishlistCard = ({ product, onRemove }) => {
  const { title, category, price, oldPrice, discount, image } = product

  return (
    <div className="product-card group cursor-pointer">
      <div className="relative h-56 bg-gradient-to-br from-[#2b2d42]/30 to-[#1a1b2e]/30 flex items-center justify-center p-6 overflow-hidden">
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-[#d90429] text-white text-[10px] font-bold px-2.5 py-1 rounded-full badge-glow">
            {discount}
          </span>
        </div>
        {/* Remove button */}
        <button
          onClick={onRemove}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#d90429] flex items-center justify-center transition-all duration-300 hover:scale-110"
          title="Remove from wishlist"
        >
          <i className="fas fa-heart text-white text-sm"></i>
        </button>
        <img src={image} className="product-image h-full w-full object-contain" alt={title} />
      </div>
      <div className="p-5">
        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">{category}</p>
        <h3 className="text-white font-bold mt-1 text-sm">{title}</h3>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-extrabold text-white">{price}</span>
          <span className="text-sm text-gray-500 line-through">{oldPrice}</span>
        </div>
        <Link
          to="/dashboard/inquiries"
          className="w-full mt-4 bg-[#d90429] hover:bg-[#ef233c] text-white font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-[#d90429]/20 text-sm flex items-center justify-center"
        >
          <i className="fas fa-cart-shopping mr-2"></i> RFQ
        </Link>
      </div>
    </div>
  )
}

export default Wishlist