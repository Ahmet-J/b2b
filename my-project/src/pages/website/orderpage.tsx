import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store'
import { getallorderfn } from '../../redux/slices/dashboard/orderslices/getallorders'
import { creatingorderfn } from '../../redux/slices/dashboard/orderslices/createorder'
import Header from '../../website components/homes/header'
import Footer from '../../website components/homes/footer'

import { ShoppingCart, Package, Loader2, Clock, CheckCircle2, Truck, Ban, Plus, Minus, Send } from 'lucide-react'
import toast from 'react-hot-toast'

const statusConfig: Record<string, any> = {
  PENDING: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', icon: Clock },
  CONFIRMED: { bg: 'bg-blue-500/10', text: 'text-blue-400', icon: CheckCircle2 },
  PROCESSING: { bg: 'bg-violet-500/10', text: 'text-violet-400', icon: Package },
  SHIPPED: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', icon: Truck },
  DELIVERED: { bg: 'bg-green-500/10', text: 'text-green-400', icon: CheckCircle2 },
  CANCELLED: { bg: 'bg-rose-500/10', text: 'text-rose-400', icon: Ban },
}

const OrdersPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data, isLoading } = useSelector((state: RootState) => state.getallorder)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
    supplierId: '1',
    productId: '1',
    quantity: '10',
    email: '',
    notes: '',
  })

  // Local state for orders - starts empty on every page load/refresh
  const [localOrders, setLocalOrders] = useState<any[]>([])

  // CRITICAL: On page mount/refresh, DO NOT load any existing orders
  // Keep localOrders as empty array
  useEffect(() => {
    // Clear anything from session/local storage
    sessionStorage.removeItem('orders_cache')
    localStorage.removeItem('orders_cache')
    
    // Reset localOrders to empty - NO ORDERS SHOWN ON REFRESH
    setLocalOrders([])
    
    // IMPORTANT: Do NOT call getallorderfn() here or it will restore orders!
    // If you must call it for other reasons, filter out all orders
    // dispatch(getallorderfn()) // <-- COMMENT THIS OUT if you want NO orders on refresh
    
  }, []) // Empty array means this runs ONLY on mount/refresh

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const orderData = {
        orderNumber: formData.orderNumber,
        supplierId: parseInt(formData.supplierId),
        status: 'PENDING',
        totalAmount: parseFloat(formData.quantity) * 10,
        currency: 'USD',
        notes: formData.notes || `Order from ${formData.email}`,
        items: [{
          productId: parseInt(formData.productId),
          quantity: parseInt(formData.quantity),
          unitPrice: 10,
          totalPrice: parseInt(formData.quantity) * 10,
          notes: ''
        }]
      }
      
      await dispatch(creatingorderfn(orderData) as any)
      
      // Create a temporary order object for display (will be lost on refresh)
      const tempOrder = {
        id: Date.now(),
        orderNumber: formData.orderNumber,
        supplierId: parseInt(formData.supplierId),
        status: 'PENDING',
        totalAmount: parseFloat(formData.quantity) * 10,
        currency: 'USD',
        notes: formData.notes || `Order from ${formData.email}`,
        items: [{
          productId: parseInt(formData.productId),
          quantity: parseInt(formData.quantity),
          unitPrice: 10,
          totalPrice: parseInt(formData.quantity) * 10,
          notes: ''
        }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        is_deleted: false
      }
      
      // Add new order to local state (only for current session)
      setLocalOrders(prev => [tempOrder, ...prev])
      
      toast.success('Order placed successfully!')
      setShowForm(false)
      
      // Reset form
      setFormData({
        orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
        supplierId: '1',
        productId: '1',
        quantity: '10',
        email: '',
        notes: '',
      })
      
    } catch {
      toast.error('Failed to place order')
    }
  }

  // Display only local orders (no backend orders)
  const ordersToShow = localOrders
  const activeOrders = ordersToShow.filter((o: any) => !o.is_deleted)

  if (isLoading && localOrders.length === 0) {
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
            📋 Orders
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">
            Place Your <span className="text-gradient-red">Order</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Order products directly from Chinese suppliers with Trade Assurance
          </p>
        </div>
      </section>

      <section className="py-16 mesh-bg-features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Place Order Button */}
          <div className="text-center mb-12">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white font-bold px-8 py-4 rounded-full shadow-2xl shadow-[#d90429]/30 hover:shadow-[#d90429]/50 transition-all duration-500 hover:-translate-y-1"
            >
              <Plus className="w-5 h-5 inline mr-2" />
              {showForm ? 'Cancel' : 'Place New Order'}
            </button>
          </div>

          {/* Order Form */}
          {showForm && (
            <div className="max-w-2xl mx-auto mb-16">
              <div className="glass-card rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">New Order</h2>
                <form onSubmit={handleSubmitOrder} className="space-y-5">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">Order Number</label>
                    <input type="text" value={formData.orderNumber} onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] transition-all text-sm" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">Supplier ID</label>
                      <input type="number" value={formData.supplierId} onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] transition-all text-sm" required />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">Product ID</label>
                      <input type="number" value={formData.productId} onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] transition-all text-sm" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-308">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">Quantity</label>
                      <input type="number" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] transition-all text-sm" required min="1" />
                    </div>
                 
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">Notes</label>
                    <textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] transition-all text-sm resize-none" rows={3}></textarea>
                  </div>
                  <button type="submit" className="w-full bg-[#d90429] hover:bg-[#ef233c] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-[#d90429]/20 text-sm">
                    <Send className="w-4 h-4 inline mr-2" /> Submit Order
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Orders List */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">
              Your Orders ({activeOrders.length})
            </h2>
            
            {activeOrders.length > 0 ? (
              <div className="space-y-4">
                {activeOrders.map((order: any) => {
                  const config = statusConfig[order.status] || statusConfig.PENDING
                  const StatusIcon = config.icon
                  return (
                    <div key={order.id} className="glass-card rounded-2xl p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center`}>
                            <StatusIcon className={`w-6 h-6 ${config.text}`} />
                          </div>
                          <div>
                            <p className="font-bold text-white">{order.orderNumber || `Order #${order.id}`}</p>
                            <p className="text-sm text-gray-400">
                              Supplier #{order.supplierId} | {order.items?.length || 1} items | ${order.totalAmount?.toLocaleString() || 0}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${config.bg} ${config.text} border capitalize`}>
                            {order.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No orders yet</h3>
                <p className="text-gray-400">Place your first order to get started</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default OrdersPage