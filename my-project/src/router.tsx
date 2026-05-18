import { createBrowserRouter, Outlet } from "react-router-dom"
import Loginpage from "./pages/homepage"


// ═══════════════ WEBSITE (Public) ═══════════════
import HomePage from "./pages/homepage"
import WebsiteProducts from "../src/pages/website/productpage"
import WebsiteCategories from "../src/pages/website/categorypage"
import WebsiteOrders from "../src/pages/website/orderpage"
import WebsiteInquiry from "../src/pages/website/inquirypage"


const Router = () => {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default Router

export const router = createBrowserRouter([
    // ═══════════════════════════════════════
    // 🌐 PUBLIC WEBSITE (Customers)
    // ═══════════════════════════════════════
    {
        path: '/',
        element: <Router />,
        children: [
            {
                index: true,
                element: <HomePage />           // 🏠 Homepage
            },
            {
                path: 'product',
                element: <WebsiteProducts />    // 📦 View all products (public)
            },
            {
                path: 'categories',
                element: <WebsiteCategories />  // 📁 View all categories (public)
            },
            {
                path: 'orders',
                element: <WebsiteOrders />      // 📋 View/Create orders (public)
            },
            {
                path: 'inquiry',
                element: <WebsiteInquiry />     // 💬 Submit inquiry (public)
            },
            {
                path: 'login',
                element: <Loginpage />          // 🔐 Admin login
            },
        ]
    }
])