import { useState } from 'react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/redux/store'
import { creatinginquiryfn } from '@/redux/slices/dashboard/inquiries/createinquiry'
import Header from '../../website components/homes/header'
import Footer from '../../website components/homes/footer'

import { MessageSquare, Mail, Package, Hash, Send, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const InquiryPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    productId: '',
    email: '',
    message: '',
    quantity: '1',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const data = {
        productId: parseInt(formData.productId) || 0,
        email: formData.email,
        message: formData.message,
        quantity: parseInt(formData.quantity) || 1,
      }
      
      const result = await dispatch(creatinginquiryfn(data) as any)
      
      if (result.type?.includes('fulfilled')) {
        toast.success('Inquiry submitted successfully! We will contact you soon.')
        setFormData({ productId: '', email: '', message: '', quantity: '1' })
      } else {
        toast.error(result.payload?.message || 'Failed to submit inquiry')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <Header />
      
      {/* Hero Banner */}
      <section className="relative py-16 lg:py-24 mesh-bg-dark">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#d90429]/8 rounded-full blur-[120px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-[#d90429]/10 text-[#ef233c] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-4 border border-[#d90429]/20">
            💬 Request Quote
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">
            Submit an <span className="text-gradient-red">Inquiry</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Tell us what you need — we'll find the best supplier and get you competitive quotes
          </p>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-16 mesh-bg-features">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#d90429]/10 rounded-2xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-[#ef233c]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Send Inquiry</h2>
                <p className="text-gray-400 text-sm">Get quotes within 24 hours</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product ID */}
                <div>
                  <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">
                    <Package className="w-3 h-3 inline mr-1" /> Product ID *
                  </label>
                  <input
                    type="number"
                    value={formData.productId}
                    onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                    placeholder="Enter product ID"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] transition-all text-sm"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">
                    <Mail className="w-3 h-3 inline mr-1" /> Your Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] transition-all text-sm"
                    required
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">
                    <Hash className="w-3 h-3 inline mr-1" /> Quantity
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="Quantity needed"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] transition-all text-sm"
                    min="1"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">
                  <MessageSquare className="w-3 h-3 inline mr-1" /> Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe what you're looking for... (specifications, quantity, budget, etc.)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] transition-all text-sm resize-none"
                  rows={6}
                  required
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#d90429] to-[#ef233c] hover:from-[#ef233c] hover:to-[#d90429] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#d90429]/20 text-sm disabled:opacity-50"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 inline mr-2 animate-spin" /> Submitting...</>
                ) : (
                  <><Send className="w-4 h-4 inline mr-2" /> Submit Inquiry</>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By submitting, you agree to our Terms of Service. We'll respond within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      
    </div>
  )
}

export default InquiryPage