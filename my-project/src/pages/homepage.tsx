import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../website components/homes/header'
import Footer from '../website components/homes/footer'

const HomePage = () => {
  return (
    <div className="bg-[#0a0a14] text-white font-sans antialiased">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ProductsShowcase />
      <RFQSection />
      <Footer />

      {/* WhatsApp Button */}
      <a href="https://wa.me/252633354080" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-[60] bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-green-300/40 hover:scale-110 transition-all duration-300 animate-bounce-slow">
        <i className="fab fa-whatsapp text-2xl" />
      </a>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  )
}

// ═══════════ AI ASSISTANT (AF-SOOMAALI) ═══════════
const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Salaam! Waxaan ahay kaaliyaha AI-ga ee Dragon B2B Trade. Sideen ku caawin karaa? Waxaad i weydiin kartaa qiimaha alaabta, rarka, bixinta, iyo wax walba oo kale!", isUser: false }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  // Product database - all products in Somali
  const productsDatabase = [
    // Electronics
    { keywords: ["samsung", "galaxy", "s24", "s24 ultra", "galaxy s24"], name: "Samsung Galaxy S24 Ultra", price: "$1,099", oldPrice: "$1,299", discount: "-15%", supplier: "Shenzhen, China", shipping: "$85" },
    { keywords: ["iphone", "15 pro max", "iphone 15", "apple phone"], name: "iPhone 15 Pro Max 256GB", price: "$1,199", oldPrice: "$1,399", discount: "-14%", supplier: "Guangzhou, China", shipping: "$90" },
    { keywords: ["macbook", "macbook pro", "apple laptop", "m3"], name: "MacBook Pro 16\" M3 Chip", price: "$2,499", oldPrice: "$2,799", discount: "-11%", supplier: "Shanghai, China", shipping: "$120" },
    { keywords: ["dell", "xps", "dell xps", "dell laptop"], name: "Dell XPS 15 Laptop", price: "$1,899", oldPrice: "$2,199", discount: "-14%", supplier: "Beijing, China", shipping: "$100" },
    // Furniture
    { keywords: ["sariir", "bed", "king bed", "sariir weyn"], name: "Sariir Nooca King Size", price: "$450", oldPrice: "$580", discount: "-22%", supplier: "Foshan, China", shipping: "$250" },
    { keywords: ["farshaxan", "sofa", "kursi weyn", "l shape sofa"], name: "Sofa Qaabka L-Shape", price: "$680", oldPrice: "$850", discount: "-20%", supplier: "Foshan, China", shipping: "$300" },
    { keywords: ["kursi", "office chair", "ergonomic chair", "kursi shaqo"], name: "Kursi Shaqo oo Ergonomic ah", price: "$185", oldPrice: "$240", discount: "-23%", supplier: "Foshan, China", shipping: "$80" },
    { keywords: ["miis", "desk", "office desk", "miis shaqo"], name: "Miis Shaqo oo Dhammeystiran", price: "$320", oldPrice: "$400", discount: "-20%", supplier: "Foshan, China", shipping: "$150" },
    // Clothes
    { keywords: ["dirac", "somali dress", "guntiino", "dhar somali"], name: "Dirac Casri ah", price: "$85", oldPrice: "$110", discount: "-23%", supplier: "Guangzhou, China", shipping: "$25" },
    { keywords: ["suit", "wool suit", "kooto", "dhar rag"], name: "Kooto 3-Qaybood ah", price: "$220", oldPrice: "$290", discount: "-24%", supplier: "Shanghai, China", shipping: "$35" },
    { keywords: ["abaya", "summer abaya", "jilbaab"], name: "Abaya Xirasho Casri ah", price: "$55", oldPrice: "$70", discount: "-21%", supplier: "Guangzhou, China", shipping: "$20" },
    { keywords: ["shirt", "cotton shirt", "funaanad"], name: "Funaanad Cotton ah 5-Qaybood", price: "$45", oldPrice: "$60", discount: "-25%", supplier: "Guangzhou, China", shipping: "$15" },
    // Spare Parts
    { keywords: ["brake", "bareeg", "toyota brake", "qaybo baabuur"], name: "Bareeg Toyota (Brake Pads)", price: "$65", oldPrice: "$85", discount: "-24%", supplier: "Guangzhou, China", shipping: "$40" },
    { keywords: ["motorcycle", "chain kit", "silsilad", "motar"], name: "Silsilad Motar (Chain Kit)", price: "$35", oldPrice: "$45", discount: "-22%", supplier: "Guangzhou, China", shipping: "$20" },
    { keywords: ["piston", "engine piston", "matoor"], name: "Piston Matoor (Engine Piston)", price: "$120", oldPrice: "$155", discount: "-23%", supplier: "Shanghai, China", shipping: "$60" },
    // Building Materials
    { keywords: ["sibidh", "cement", "portland cement", "sibidhka"], name: "Sibidhka 50kg", price: "$8.50", oldPrice: "$11", discount: "-23%", supplier: "Shandong, China", shipping: "$0.50 kiilo" },
    { keywords: ["bir", "steel", "rebar", "birta dhismaha"], name: "Birta Dhismaha 12mm", price: "$12", oldPrice: "$15", discount: "-20%", supplier: "Shandong, China", shipping: "$0.80 qayb" },
    { keywords: ["balbal", "tile", "floor tile", "safka dhismaha"], name: "Balbalada Dhismaha 60x60cm", price: "$15", oldPrice: "$19", discount: "-21%", supplier: "Guangdong, China", shipping: "$2 mitir laba jibaaran" },
  ]

  const getCategoryResponse = (q: string): string | null => {
    if (q.includes("albaab") || q.includes("furniture") || q.includes("guri") || q.includes("qalab guri")) {
      return "🛋️ **Qalabka Guriga ee Shiinaha (Foshan)**\n\n• Sariir King Size: $450 (Waxay ahayd $580)\n• Sofa Qaabka L-Shape: $680 (Waxay ahayd $850)\n• Kursi Shaqo Ergonomic ah: $185 (Waxay ahayd $240)\n• Miis Shaqo Dhammeystiran: $320 (Waxay ahayd $400)\n\n📍 Dhammaan alaabta guriga waxay ka yimaadaan Foshan, Shiinaha (Caasimada alaabta guriga)\n🚢 Waxaan u rarnaa Dekedda Muqdisho\n📦 Dalab qiimo weyn (container 20ft/40ft) nala soo xiriir."
    }
    if (q.includes("elect") || q.includes("talefoon") || q.includes("laptop") || q.includes("mobile")) {
      return "📱 **Electronics-ka Shiinaha**\n\n• Samsung Galaxy S24 Ultra: $1,099\n• iPhone 15 Pro Max: $1,199\n• MacBook Pro 16\": $2,499\n• Dell XPS 15: $1,899\n\n✅ Dhammaan alaabtu leedahay 1-sano damaanad\n🚢 Diyaarad ayaa lagu soo rari karaa (7-14 maalmood)\n📦 Qiimo jaban marka la iibsado tiro badan."
    }
    if (q.includes("dhar") || q.includes("clothes") || q.includes("fashion") || q.includes("guntiino")) {
      return "👗 **Dharka & Fashion-ka Shiinaha**\n\n• Dirac Casri ah: $85\n• Kooto 3-Qaybood ah: $220\n• Abaya Xirasho Casri ah: $55\n• Funaanad Cotton ah 5-Qaybood: $45\n\n📍 Waxay ka yimaadaan degmada fashion-ka Guangzhou\n🚢 Rar degdeg ah ayaa diyaar ah\n📦 Waxaad iibsataa 10 qayb iyo wixii ka badan, qiimo jaban ayaad heleysaa."
    }
    if (q.includes("baabuur") || q.includes("auto parts") || q.includes("qaybo") || q.includes("motar")) {
      return "🔧 **Qaybaha Baabuurta ee Shiinaha**\n\n• Bareeg Toyota: $65\n• Piston Matoor: $120\n• Silsilad Motar: $35\n\n📍 Qaybo asal ah iyo kuwa OEM ah\n🚢 Diyaarad ayaa lagu soo rari karaa haddii aad degdeg u baahan tahay\n✅ 6 bilood damaanad."
    }
    if (q.includes("dhisme") || q.includes("building") || q.includes("construction") || q.includes("qalab dhisme")) {
      return "🏗️ **Qalabka Dhismaha ee Shiinaha**\n\n• Sibidhka 50kg: $8.50/beg (Waxay ahayd $11)\n• Birta Dhismaha 12mm: $12/qayb (Waxay ahayd $15)\n• Balbalada Dhismaha: $15/m² (Waxay ahayd $19)\n\n🚢 Waxaan u rarnaa Dekedda Muqdisho\n📦 Waxaan heli karaa container qiimo jaban (20ft/40ft)\n✅ Alaab tayo leh oo la hubiyay."
    }
    return null
  }

  const getAIResponse = (question: string): string => {
    const q = question.toLowerCase()
    
    // Check for product-specific questions
    for (const product of productsDatabase) {
      for (const keyword of product.keywords) {
        if (q.includes(keyword)) {
          return `📱 **${product.name}**\n\n💰 Qiimaha: ${product.price} (Waxay ahayd ${product.oldPrice} ${product.discount})\n📍 Alaabtu waxay ka timaadaa: ${product.supplier}\n🚢 Rarka Soomaaliya: ${product.shipping}\n\n✅ Waxaan kaa ilaalinayaa alaabtaada (Trade Assurance). Haddii aad rabto tiro badan oo qiimo jaban, fadlan nala soo xiriir!`
        }
      }
    }
    
    // Category response
    const categoryResponse = getCategoryResponse(q)
    if (categoryResponse) return categoryResponse
    
    // Price questions
    if ((q.includes("qiimo") || q.includes("price") || q.includes("imisa") || q.includes("kac") || q.includes("qadar") || q.includes("dollar")) && 
        (q.includes("product") || q.includes("alaab") || q.includes("iibso") || q.includes("weydii"))) {
      return "Si aad u hesho qiimaha saxda ah, fadlan magaca alaabta sheeg. Tusaale:\n\n• 'Samsung Galaxy S24 Ultra qiimo'\n• 'iPhone 15 Pro Max imisa'\n• 'Sariir King Size qiimo'\n• 'Sibidhka imisa'\n\nWaxaad sidoo kale booqan kartaa bogga alaabta ama soo buuxin kartaa foomka RFQ si aad u hesho qiimo jaban markaad tiro badan iibsato."
    }
    
    // Order questions
    if (q.includes("order") || q.includes("dalbo") || q.includes("iibso") || q.includes("amaro")) {
      return "📋 **Sida Dalabka Loogu Sameeyo**\n\n1. Tag bogga alaabta 'Products'\n2. Soo raadi alaabta aad u baahan tahay\n3. Dhagsii badhanka 'RFQ'\n4. Buuxi foomka macluumaadkaaga\n5. Kooxdeennu waxay kula soo xiriiri doontaa 24 saacadood gudahood\n\n✅ Adeeg bidhaan, lacag lagama qaadinayo!"
    }
    
    // Shipping questions
    if (q.includes("rar") || q.includes("shipping") || q.includes("delivery") || q.includes("soo rar") || q.includes("gaarsi")) {
      return "🚢 **Rarka Soomaaliya**\n\n✈️ Diyaarad: 7-14 maalmood\n🚢 Doon: 30-45 maalmood\n📍 Waxaan u geynayaa: Muqdisho, Hargeysa, Garoowe, Kismaayo\n\n✅ Waxaan qabanaa:\n• Rukhsadda kastamka\n• Gaarsi albaabka\n• Caymiska alaabta\n\n📦 Waxaan heli karaa container qiimo jaban haddii aad iibsato tiro badan."
    }
    
    // Payment questions
    if (q.includes("bixin") || q.includes("payment") || q.includes("lacag") || q.includes("bixi")) {
      return "💳 **Hababka Bixinta**\n\nWaxaan aqbalnaa:\n• Bankiga (Wareejin)\n• Kaadhka Credit-ka (Visa, Mastercard)\n• PayPal\n\n✅ Dhammaan bixinnada waxaa ilaalinayaa 'Trade Assurance'\n🔒 Waxaad sii daysaa lacagta marka aad hubiso in alaabtu tayo leedahay\n💰 Lacago qarsoon ama dheeri ah ma jiraan"
    }
    
    // Trade Assurance questions
    if (q.includes("ilaali") || q.includes("assurance") || q.includes("protect") || q.includes("safe") || q.includes("damaanad")) {
      return "🛡️ **Trade Assurance - Ilaalinta Alaabtaada**\n\n100% ilaalin dhammaan iibsadayaasha Soomaaliyeed:\n\n✓ Ilaalinta tayada - Haddii alaabtu qalad tahay, waxaan kuu celinayaa lacagta\n✓ Ilaalinta rarka - Haddii ay soo daahdo, waxaan kuu celinayaa lacagta\n✓ Ilaalinta lacagta - Lacagtaadu waa ammaan\n\n✅ Waa bilaash dhammaan dalabaadka Dragon B2B\n⭐ Waxaa isticmaala 1,200+ ganacsade Soomaali"
    }
    
    // Supplier questions
    if (q.includes("shiin") || q.includes("supplier") || q.includes("manufacturer") || q.includes("factory") || q.includes("warshad")) {
      return "🏭 **Alaab-qeybiyeyaasha Shiinaha ee la Hubiyay**\n\nDhammaan alaab-qeybiyeyaashu waxay soo mareen:\n\n✓ Kormeer warshad\n✓ Hubinta shatiga ganacsiga\n✓ Hubinta tayada alaabta\n✓ Khibrad u dhoofinta Afrika\n\n📍 Waxaan la shaqeynaa 8,500+ alaab-qeybiye kuwaas oo ka kala yimid:\n• Guangzhou\n• Shenzhen\n• Shanghai\n• Foshan\n• Shandong\n\n✅ 100% la hubiyay, dhexdhexaadiye ma jiro!"
    }
    
    // Greeting questions
    if (q.includes("salaam") || q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("assalamu") || q.includes("maalin")) {
      return "👋 Walaalo, Salaam! Ku soo dhawoow Dragon B2B Trade!\n\nWaxaan ahay kaaliyaha AI-ga. Waxaad i weydiin kartaa:\n\n• Qiimaha alaabta (tusaale: 'Samsung S24 Ultra qiimo')\n• Rarka Soomaaliya\n• Hababka bixinta\n• Sida dalabka loo sameeyo\n• Ilaalinta alaabta (Trade Assurance)\n• Alaab-qeybiyeyaasha Shiinaha\n\nSideen ku caawin karaa?"
    }
    
    // Help/Questions
    if (q.includes("caaw") || q.includes("help") || q.includes("maxaan") || q.includes("weedhi")) {
      return "🤖 **Sideen Ku Caawin Karaa**\n\nWaxaad i weydiin kartaa:\n\n💰 Qiimaha alaabta (sheeg magaca alaabta)\n🚢 Rarka Soomaaliya (qiimaha iyo waqtiga)\n💳 Hababka bixinta iyo ammaanka\n📋 Sida dalabka loo sameeyo\n🛡️ Ilaalinta alaabta (Trade Assurance)\n🏭 Alaab-qeybiyeyaasha Shiinaha\n📦 Qiimo jaban marka la iibsado tiro badan\n\nIsku day inaad weydiiso: 'Samsung S24 Ultra qiimo' ama 'Rarka Muqdisho'"
    }
    
    // About company
    if (q.includes("shirkad") || q.includes("about") || q.includes("company") || q.includes("wuu ya") || q.includes("waxaan tahay")) {
      return "🐉 **Dragon B2B Trade**\n\nWaxaan nahay shirkadda ugu horreysa ee B2B ee isku xirta ganacsatada Soomaaliyeed iyo alaab-qeybiyeyaasha Shiinaha si toos ah.\n\n📊 Waxaan soo gaadhay:\n• 1,200+ ganacsade Soomaali\n• 8,500+ alaab-qeybiye Shiinees\n• $45M+ ganacsi\n\n🇸🇴 Waxaan kugula hadalnaa Af-Soomaali\n✅ Adeeg bilaash ah\n🛡️ 100% ilaalin alaabta\n\nSideen kaa caawin karaa maanta?"
    }
    
    // Default response
    return "Waad ku mahadsan tahay su'aashaada! Waxaan kaaliye ahaan kaa caawin karaa:\n\n💰 **Qiimaha alaabta** - Weydii alaab gaar ah (tusaale: 'Samsung S24 Ultra qiimo')\n🚢 **Rarka** - Qiimaha iyo waqtiga rarka Soomaaliya\n💳 **Bixinta** - Hababka lacag bixinta iyo ammaankooda\n📋 **Dalabka** - Sida dalabka loo sameeyo\n🛡️ **Ilaalinta** - Sida alaabtaada looga ilaalinayo\n🏭 **Alaab-qeybiye** - Sida loo hubiyo inay la isku halayn karo\n\nWaxaad rabtaa inaan kaa caawiyo?\n\nTusaale: 'Samsung S24 Ultra qiimo' ama 'Rarka Muqdisho imisa'"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = { text: inputValue, isUser: true }
    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    setTimeout(() => {
      const response = getAIResponse(inputValue)
      setMessages(prev => [...prev, { text: response, isUser: false }])
      setIsTyping(false)
    }, 600)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
    setTimeout(() => {
      handleSendMessage()
    }, 100)
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[60] bg-gradient-to-r from-violet-500 to-purple-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-violet-500/40 hover:scale-110 transition-all duration-300 animate-bounce-slow"
      >
        {isOpen ? (
          <i className="fas fa-times text-2xl" />
        ) : (
          <i className="fas fa-robot text-2xl" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[60] w-[90vw] sm:w-[400px] h-[600px] bg-[#1a1c2e] rounded-2xl shadow-2xl shadow-black/50 border border-white/10 flex flex-col overflow-hidden animate-slide-up">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 to-purple-700 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <i className="fas fa-robot text-white text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white">Kaaliye AI</h3>
                <p className="text-xs text-white/70">Online • Ku hadla Soomaali</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
                <i className="fas fa-times" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0a0a14]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${msg.isUser ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white' : 'bg-[#2b2d42] text-gray-200'}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#2b2d42] rounded-2xl px-4 py-2.5">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions */}
          {messages.length < 3 && (
            <div className="px-4 py-2 border-t border-white/10 bg-[#1a1c2e]">
              <p className="text-[10px] text-gray-400 mb-2">Isku day inaad weydiiso:</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => handleQuickQuestion("Samsung S24 Ultra qiimo")} className="text-[10px] bg-white/10 hover:bg-white/20 text-gray-300 px-2.5 py-1 rounded-full transition-all">
                  S24 Ultra qiimo
                </button>
                <button onClick={() => handleQuickQuestion("Rarka Muqdisho imisa")} className="text-[10px] bg-white/10 hover:bg-white/20 text-gray-300 px-2.5 py-1 rounded-full transition-all">
                  Rarka Muqdisho
                </button>
                <button onClick={() => handleQuickQuestion("Sidee dalab loo sameeyaa?")} className="text-[10px] bg-white/10 hover:bg-white/20 text-gray-300 px-2.5 py-1 rounded-full transition-all">
                  Sidee dalab loo sameeyaa?
                </button>
                <button onClick={() => handleQuickQuestion("Hababka bixinta")} className="text-[10px] bg-white/10 hover:bg-white/20 text-gray-300 px-2.5 py-1 rounded-full transition-all">
                  Hababka bixinta
                </button>
                <button onClick={() => handleQuickQuestion("Qalabka guriga qiimo")} className="text-[10px] bg-white/10 hover:bg-white/20 text-gray-300 px-2.5 py-1 rounded-full transition-all">
                  Qalabka guriga
                </button>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-[#1a1c2e]">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Su'aal weydii... (tusaale: Samsung S24 Ultra qiimo)"
                className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-violet-500 transition-all"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white w-10 h-10 rounded-xl flex items-center justify-center transition-all"
              >
                <i className="fas fa-paper-plane text-sm" />
              </button>
            </div>
            <p className="text-[9px] text-gray-500 text-center mt-2">
              💡 Tusaale: "Samsung S24 Ultra qiimo" ama "Rarka Muqdisho imisa"
            </p>
          </div>
        </div>
      )}
    </>
  )
}

// ═══════════ HERO SECTION ═══════════
const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden mesh-bg-dark">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-2 h-2 bg-[#d90429]/30 rounded-full top-[15%] left-[10%] animate-float" />
      <div className="absolute w-3 h-3 bg-[#d90429]/20 rounded-full top-[30%] right-[20%] animate-float-delayed" />
      <div className="absolute w-1.5 h-1.5 bg-[#d90429]/40 rounded-full bottom-[25%] left-[30%] animate-float-slow" />
    </div>
    <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#d90429]/12 rounded-full blur-[150px] animate-float-slow" />
    <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-[#3a3d5c]/25 rounded-full blur-[180px] animate-float-delayed" />
    <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div className="animate-slide-up text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="glass rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2">
              <span>🇸🇴</span><span className="text-gray-300 text-xs sm:text-sm font-medium">Soomaaliya</span>
            </div>
            <span className="text-gray-500 text-base sm:text-lg">↔️</span>
            <div className="glass rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2">
              <span>🇨🇳</span><span className="text-gray-300 text-xs sm:text-sm font-medium">Shiinaha</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-display leading-[1.05] mb-4 sm:mb-6 text-white">
            Ganacsiga U Dhexeeya<br /><span className="text-gradient-red animate-shimmer">Soomaaliya & Shiinaha</span><br />Si Fudud
          </h1>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
            Dragon B2B waxay isku xirtaa <span className="text-white font-semibold">ganacsatada Soomaaliyeed</span> si toos ah <span className="text-[#ef233c] font-semibold">warshadaha Shiinaha ee la hubiyay</span>. Soo alo alaab tayo leh, ka ganacsi qiimo fiican, oo ballaadhi ganacsigaaga — dhamaantood meel qud ah.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12">
            <Link to="/product" className="group relative bg-gradient-to-r from-[#d90429] to-[#ef233c] text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full overflow-hidden shadow-2xl shadow-[#d90429]/30 hover:shadow-[#d90429]/50 transition-all duration-500 hover:-translate-y-1 animate-glow text-sm sm:text-base">
              <span className="relative z-10 flex items-center gap-2"><i className="fas fa-rocket" /> Bilow Ganacsiga Shiinaha</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#ef233c] to-[#d90429] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            <button className="glass-card text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-white/10 transition-all duration-500 flex items-center gap-2 text-sm sm:text-base">
              <i className="far fa-play-circle text-lg sm:text-xl" /> Sidee U Shaqeysaa
            </button>
          </div>
          <div className="border-t border-white/10 pt-4 sm:pt-6">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">Waxaa isticmaala ganacsatada Soomaaliyeed</p>
            <div className="flex gap-4 sm:gap-10 justify-center lg:justify-start">
              <StatItem value="1,200+" label="Ganacsade Soomaali" />
              <StatItem value="8,500+" label="Alaab-qeybiye Shiinees" delay="0.2s" />
              <StatItem value="$45M+" label="Qadarka Ganacsiga" delay="0.4s" />
            </div>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="glass-card rounded-3xl p-4 sm:p-6 animate-float relative z-10">
            <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070&auto=format&fit=crop" alt="Trade" className="w-full h-48 sm:h-64 object-cover rounded-2xl mb-3 sm:mb-4" />
            <div className="flex items-center justify-between">
              <div><p className="text-xs sm:text-sm font-bold text-white">Suuqa Jumlada Dubai</p><p className="text-[10px] sm:text-xs text-gray-400">Si toos ah warshadaha Guangzhou</p></div>
              <span className="bg-green-500/20 text-green-400 text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full">La hubiyay ✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const StatItem = ({ value, label, delay }: { value: string; label: string; delay?: string }) => (
  <div className="stat-item" style={delay ? { animationDelay: delay } : undefined}>
    <p className="text-2xl sm:text-4xl font-extrabold text-white">{value}</p>
    <p className="text-gray-500 text-[10px] sm:text-xs">{label}</p>
  </div>
)

// ═══════════ FEATURES SECTION ═══════════
const FeaturesSection = () => (
  <section className="relative py-12 lg:py-28 mesh-bg-features">
    <div className="absolute top-20 right-10 w-72 h-72 bg-[#d90429]/5 rounded-full blur-[100px]" />
    <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#3a3d5c]/10 rounded-full blur-[120px]" />
    <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-16 animate-slide-up">
        <div className="inline-flex items-center gap-2 glass rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6">
          <div className="w-2 h-2 rounded-full bg-[#d90429] animate-ping-slow" />
          <span className="text-gray-300 text-[10px] sm:text-sm font-medium tracking-wider uppercase">⚡ Sababta Ganacsatada Soomaaliyeed U Doorbidaan Dragon</span>
        </div>
        <h2 className="text-2xl sm:text-5xl font-extrabold text-white mb-2 sm:mb-4">Wax kasta oo <span className="text-gradient-red">aad uga baahan tahay</span> kor u qaadista</h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-lg">Xalal B2B oo dhammeystiran oo isku xira soo-dejisayaasha Soomaaliyeed iyo warshadaha Shiinaha ee la kalsoonaan karo</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-8">
        <FeatureCard icon="fa-shield-halved" title="Ilaalinta Alaabta" desc="100% ilaalin lacagta." delay="0s" />
        <FeatureCard icon="fa-ship" title="Rarka Soomaaliya" desc="Diyaarad & doon oo la isku halayn karo." delay="0.1s" />
        <FeatureCard icon="fa-language" title="Taageero Soomaali" desc="Wakiilo Soomaali ku hadla 24/7." delay="0.2s" />
        <FeatureCard icon="fa-tags" title="Qiimaha Warshadda" desc="Ilaa 40% ku badbaadi." delay="0.3s" />
        <FeatureCard icon="fa-certificate" title="Alaab-qeybiye la Hubiyay" desc="Kormeer warshad iyo hubinta tayada." delay="0.4s" />
        <FeatureCard icon="fa-arrow-rotate-left" title="Soo Celinta Fudud" desc="30-maalmood soo celinta dhib la'aan." delay="0.5s" />
      </div>
    </div>
  </section>
)

const FeatureCard = ({ icon, title, desc, delay }: any) => (
  <div className="glass-card rounded-2xl sm:rounded-3xl p-3 sm:p-6 lg:p-8 cursor-pointer animate-scale-in" style={{ animationDelay: delay }}>
    <div className="w-10 h-10 sm:w-14 sm:h-14 bg-[#d90429]/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-5 text-lg sm:text-2xl text-[#ef233c]">
      <i className={`fas ${icon}`} />
    </div>
    <h3 className="text-sm sm:text-xl font-bold text-white mb-1 sm:mb-3">{title}</h3>
    <p className="text-gray-400 text-[10px] sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">{desc}</p>
  </div>
)

// ═══════════ HOW IT WORKS SECTION ═══════════
const HowItWorksSection = () => (
  <section className="relative py-12 lg:py-28 bg-[#0a0a14]">
    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(217,4,41,0.03) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(43,45,66,0.1) 0%, transparent 50%)' }} />
    <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-16 animate-slide-up">
        <span className="inline-block bg-[#d90429]/10 text-[#ef233c] text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full uppercase tracking-wider mb-3 sm:mb-4 border border-[#d90429]/20">📋 Hab Fudud</span>
        <h2 className="text-2xl sm:text-5xl font-extrabold text-white mb-2 sm:mb-4">Sidee U <span className="text-gradient-red">Shaqeeyaa</span></h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
        <StepCard step="1" icon="fa-search" title="Raadi Alaabta" desc="Booqo kumanaan alaabood." delay="0.1s" />
        <StepCard step="2" icon="fa-handshake" title="Ganacsi & Dalbo" desc="Hel qiimo tartan." delay="0.2s" />
        <StepCard step="3" icon="fa-boxes-stacked" title="U Soo Rar Soomaaliya" desc="Adigoon dhib lahayn." delay="0.3s" />
      </div>
    </div>
  </section>
)

const StepCard = ({ step, icon, title, desc, delay }: any) => (
  <div className="text-center animate-slide-up glass-card rounded-2xl sm:rounded-3xl p-3 sm:p-6 lg:p-8" style={{ animationDelay: delay }}>
    <div className="w-10 h-10 sm:w-16 sm:h-16 bg-[#d90429]/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-4 text-[#ef233c] text-lg sm:text-2xl border border-[#d90429]/20">
      <i className={`fas ${icon}`} />
    </div>
    <div className="bg-[#d90429]/15 text-[#ef233c] text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block mb-1 sm:mb-3">Tallaabo {step}</div>
    <h3 className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2">{title}</h3>
    <p className="text-gray-400 text-[10px] sm:text-sm">{desc}</p>
  </div>
)

// ═══════════ PRODUCTS SHOWCASE ═══════════
const ProductsShowcase = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const allProducts = [
    { id: 1, category: 'furniture', subcategory: 'Beds', title: 'Luxury King Size Bed Frame', price: '$450', oldPrice: '$580', discount: '-22%', image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 2, category: 'furniture', subcategory: 'Sofas', title: 'Modern L-Shape Corner Sofa Set', price: '$680', oldPrice: '$850', discount: '-20%', image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 3, category: 'furniture', subcategory: 'Chairs', title: 'Ergonomic Office Chair Premium', price: '$185', oldPrice: '$240', discount: '-23%', image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 4, category: 'furniture', subcategory: 'Office', title: 'Complete Office Desk Setup', price: '$320', oldPrice: '$400', discount: '-20%', image: 'https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 5, category: 'electronics', subcategory: 'Laptops', title: 'MacBook Pro 16" M3 Chip 2024', price: '$2,499', oldPrice: '$2,799', discount: '-11%', image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400' },
    { id: 6, category: 'electronics', subcategory: 'Mobile', title: 'iPhone 15 Pro Max 256GB', price: '$1,199', oldPrice: '$1,399', discount: '-14%', image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 7, category: 'electronics', subcategory: 'Laptops', title: 'Dell XPS 15 Laptop i9 32GB', price: '$1,899', oldPrice: '$2,199', discount: '-14%', image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400' },
    { id: 8, category: 'electronics', subcategory: 'Mobile', title: 'Samsung Galaxy S24 Ultra', price: '$1,099', oldPrice: '$1,299', discount: '-15%', image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 9, category: 'clothes', subcategory: 'Women', title: 'Elegant Somali Dirac Dress', price: '$85', oldPrice: '$110', discount: '-23%', image: 'https://images.pexels.com/photos/994234/pexels-photo-994234.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 10, category: 'clothes', subcategory: 'Men', title: 'Premium Wool Suit 3-Piece', price: '$220', oldPrice: '$290', discount: '-24%', image: 'https://images.pexels.com/photos/2979334/pexels-photo-2979334.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 11, category: 'clothes', subcategory: 'Women', title: 'Summer Abaya Collection', price: '$55', oldPrice: '$70', discount: '-21%', image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 12, category: 'clothes', subcategory: 'Men', title: 'Casual Cotton Shirts 5-Pack', price: '$45', oldPrice: '$60', discount: '-25%', image: 'https://images.pexels.com/photos/769733/pexels-photo-769733.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 13, category: 'spareparts', subcategory: 'Auto Parts', title: 'Toyota Genuine Brake Pads Set', price: '$65', oldPrice: '$85', discount: '-24%', image: 'https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 14, category: 'spareparts', subcategory: 'Motorcycle', title: 'Motorcycle Chain Kit Set', price: '$35', oldPrice: '$45', discount: '-22%', image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 15, category: 'spareparts', subcategory: 'Engine', title: 'Diesel Engine Piston Set', price: '$120', oldPrice: '$155', discount: '-23%', image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 16, category: 'building', subcategory: 'Cement', title: 'Portland Cement 50kg Bag', price: '$8.50', oldPrice: '$11', discount: '-23%', image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 17, category: 'building', subcategory: 'Steel', title: 'Reinforcement Steel Bars 12mm', price: '$12', oldPrice: '$15', discount: '-20%', image: 'https://images.pexels.com/photos/162568/automobile-automotive-car-chrome-162568.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 18, category: 'building', subcategory: 'Tiles', title: 'Ceramic Floor Tiles 60x60cm', price: '$15', oldPrice: '$19', discount: '-21%', image: 'https://images.pexels.com/photos/3095695/pexels-photo-3095695.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ]

  const categories = ['all', 'furniture', 'electronics', 'clothes', 'spareparts', 'building']
  const filteredProducts = activeFilter === 'all' ? allProducts : allProducts.filter(p => p.category === activeFilter)

  return (
    <section className="relative py-12 lg:py-28 mesh-bg-features">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-12 gap-4 sm:gap-6">
          <div className="animate-slide-up text-center sm:text-left">
            <span className="inline-block bg-[#d90429]/10 text-[#ef233c] text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full uppercase tracking-wider mb-2 sm:mb-4 border border-[#d90429]/20">🔥 Caanka Ku Ah Muqdisho</span>
            <h2 className="text-2xl sm:text-5xl font-extrabold text-white">Alaabaha <span className="text-gradient-red">Caanka Ah</span></h2>
          </div>
          <div className="flex gap-1.5 sm:gap-2 animate-slide-up flex-wrap justify-center">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)}
                className={`text-[10px] sm:text-xs font-semibold px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full border capitalize transition-all ${activeFilter === cat ? 'bg-[#d90429] text-white border-[#d90429]' : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'}`}>
                {cat === 'all' ? 'Dhammaan' : cat === 'spareparts' ? 'Qaybo Baabuur' : cat === 'building' ? 'Dhismo' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-10"><p className="text-gray-400 text-sm">Alaab lama helin</p></div>
        )}

        <div className="text-center mt-8 sm:mt-10">
          <Link to="/product" className="glass-card text-white font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-white/10 transition-all duration-500 flex items-center gap-2 mx-auto text-sm sm:text-base">
            Alaabta Oo Dhan ({allProducts.length}) <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  )
}

const ProductCard = ({ category, subcategory, title, price, oldPrice, discount, image }: any) => (
  <div className="product-card group cursor-pointer">
    <div className="relative h-28 sm:h-44 lg:h-56 bg-gradient-to-br from-[#2b2d42]/30 to-[#1a1b2e]/30 flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-hidden">
      <div className="absolute top-2 left-2 z-10 flex gap-1">
        <span className="bg-[#d90429] text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full badge-glow">{discount}</span>
        <span className="bg-white/10 text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full hidden sm:inline">{subcategory}</span>
      </div>
      <button className="absolute top-2 right-2 z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#d90429]/50">
        <i className="far fa-heart text-white text-[10px] sm:text-sm" />
      </button>
      <img src={image} className="product-image h-full w-full object-cover" alt={title} loading="lazy" />
    </div>
    <div className="p-2 sm:p-3 lg:p-5">
      <p className="text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-wider font-medium">{category}</p>
      <h3 className="text-white font-bold mt-0.5 sm:mt-1 text-[11px] sm:text-sm line-clamp-2">{title}</h3>
      <div className="flex items-baseline gap-1 sm:gap-2 mt-1 sm:mt-2">
        <span className="text-base sm:text-xl lg:text-2xl font-extrabold text-white">{price}</span>
        <span className="text-[10px] sm:text-sm text-gray-500 line-through">{oldPrice}</span>
      </div>
      <Link to="/inquiry" className="w-full mt-2 sm:mt-4 bg-[#d90429] hover:bg-[#ef233c] text-white font-bold py-1.5 sm:py-2 lg:py-2.5 rounded-xl transition-all shadow-lg shadow-[#d90429]/20 text-[10px] sm:text-sm flex items-center justify-center">
        <i className="fas fa-cart-shopping mr-1 sm:mr-2 text-[10px]" /> Dalab
      </Link>
    </div>
  </div>
)

// ═══════════ RFQ SECTION ═══════════
const RFQSection = () => (
  <section className="relative py-12 lg:py-28 overflow-hidden bg-gradient-to-br from-[#2b2d42] to-[#1a1b2e]">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d90429]/10 rounded-full blur-[150px]" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#d90429]/5 rounded-full blur-[100px]" />
    <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="animate-slide-right text-center lg:text-left">
          <span className="inline-block glass rounded-full text-white text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 uppercase tracking-wider mb-3 sm:mb-4">🇸🇴 Iibsadayaasha Soomaaliyeed</span>
          <h2 className="text-2xl sm:text-5xl font-extrabold mb-3 sm:mb-4 text-white">Hel Qiimo <span className="text-gradient-red">24 Saac</span> Gudaheed</h2>
          <p className="text-gray-300 text-sm sm:text-lg mb-6 sm:mb-8">Noo sheeg waxa aad u baahan tahay — kooxdeennu Shiinaha waxay kuu heli doontaa alaab-qeybiyaha ugu fiican oo kugula xaajoon doonto qiimaha. Adeeg bidhaan.</p>
          <div className="space-y-2 sm:space-y-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3 glass rounded-xl px-3 sm:px-4 py-2 sm:py-3"><i className="fas fa-check-circle text-[#ef233c] text-sm" /><span className="text-gray-200 text-xs sm:text-sm">Adeeg RFQ oo bilaash ah — lacag qarsoon ma jirto</span></div>
            <div className="flex items-center gap-2 sm:gap-3 glass rounded-xl px-3 sm:px-4 py-2 sm:py-3"><i className="fas fa-check-circle text-[#ef233c] text-sm" /><span className="text-gray-200 text-xs sm:text-sm">Wakiil Soomaali ku hadla ayaa laguugu talagalay</span></div>
            <div className="flex items-center gap-2 sm:gap-3 glass rounded-xl px-3 sm:px-4 py-2 sm:py-3"><i className="fas fa-check-circle text-[#ef233c] text-sm" /><span className="text-gray-200 text-xs sm:text-sm">Ilaalin buuxda oo alaabtaada laguugu damaanad qaaday</span></div>
          </div>
        </div>
        <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-8 animate-slide-up">
          <h3 className="text-lg sm:text-2xl font-bold text-white mb-1">RFQ Degdeg ah</h3>
          <p className="text-gray-400 mb-4 sm:mb-6 text-xs sm:text-sm">Hal foom, qiimo badan oo ka yimid warshadaha Shiinaha</p>
          <form className="space-y-3 sm:space-y-5">
            <div><label className="block text-[10px] sm:text-xs text-gray-400 mb-1 sm:mb-1.5 uppercase tracking-wider font-semibold">Alaabta Aad U Baahan Tahay</label><input type="text" placeholder="Tusaale: Biyo Dhalo Bir Ah" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] transition-all text-xs sm:text-sm" /></div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div><label className="block text-[10px] sm:text-xs text-gray-400 mb-1 sm:mb-1.5 uppercase tracking-wider font-semibold">Tirada</label><input type="text" placeholder="Tusaale: 500 qayb" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] transition-all text-xs sm:text-sm" /></div>
              <div><label className="block text-[10px] sm:text-xs text-gray-400 mb-1 sm:mb-1.5 uppercase tracking-wider font-semibold">Email-kaaga</label><input type="email" placeholder="ahmed@company.so" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#d90429] transition-all text-xs sm:text-sm" /></div>
            </div>
            <Link to="/inquiry" className="w-full bg-[#d90429] hover:bg-[#ef233c] text-white font-bold py-2.5 sm:py-3.5 rounded-xl transition-all shadow-lg shadow-[#d90429]/20 text-xs sm:text-sm flex items-center justify-center"><i className="fas fa-paper-plane mr-2" /> Hel Qiimo Bilaash Ah</Link>
          </form>
        </div>
      </div>
    </div>
  </section>
)

export default HomePage