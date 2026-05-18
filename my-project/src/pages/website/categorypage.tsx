import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { getallcategoriesfn } from '@/redux/slices/dashboard/categoryslices/getallcategories'
import Header from '../../website components/homes/header'
import Footer from '../../website components/homes/footer'

import { Layers, Loader2, Package, ChevronRight } from 'lucide-react'

const CategoriesPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data, isLoading } = useSelector((state: RootState) => state.getallcategory)

  useEffect(() => {
    dispatch(getallcategoriesfn())
  }, [dispatch])

  const categories = Array.isArray(data) ? data : data?.data || data?.categories || data?.result || []
  const activeCategories = categories.filter((c: any) => !c.is_deleted)

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
            📁 Browse Categories
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">
            Product <span className="text-gradient-red">Categories</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explore our wide range of product categories from Chinese suppliers
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 mesh-bg-features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCategories.map((category: any) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.slug || category.id}`}
                  className="glass-card rounded-3xl p-8 cursor-pointer group"
                >
                  <div className="w-16 h-16 bg-[#d90429]/10 rounded-2xl flex items-center justify-center mb-5 text-2xl text-[#ef233c] group-hover:bg-[#d90429]/20 transition-all">
                    {category.images?.[0]?.url ? (
                      <img src={category.images[0].url} className="w-10 h-10 object-cover rounded-lg" alt={category.name} />
                    ) : (
                      <Layers className="w-8 h-8" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#ef233c] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                    {category.description || 'Browse products in this category'}
                  </p>
                  <div className="flex items-center gap-2 text-[#ef233c] text-sm font-semibold">
                    View Products <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Layers className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No categories yet</h3>
              <p className="text-gray-400">Check back soon for product categories</p>
            </div>
          )}

          {/* Category Count */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">{activeCategories.length} categories available</p>
          </div>
        </div>
      </section>

      <Footer />
     
    </div>
  )
}

export default CategoriesPage