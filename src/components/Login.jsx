import { useState } from 'react'

const logoImage = new URL('../assets/images/Perpetual Church Logo.png', import.meta.url).href

function Login() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login data:', formData)
  }

  return (
    <div className="font-body bg-[#f0ede9] text-gray-900 scroll-smooth">
      {/* Header */}
      <header id="main-header" className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white via-white to-[#f8f5f0] shadow-md border-b border-[#8B4513]/10 transition-transform duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16">
            <div className="flex-1"></div>
            {/* Logo & Branding */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#8B4513] to-[#A0522D] rounded-full flex items-center justify-center text-white shadow-lg overflow-hidden border-2 border-[#FFD700]/30">
                <img src={logoImage} alt="Church Logo" className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="min-w-0 hidden sm:block">
                <h1 className="text-sm md:text-base font-serif text-[#8B4513] font-black leading-tight italic">Our Mother of Perpetual Help</h1>
                <p className="text-xs text-gray-600 italic hidden md:block">Redemptorist Parish • Dumaguete City</p>
              </div>
            </div>
            <div className="flex-1 relative">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden absolute right-0 flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#8B4513]/10 text-[#8B4513] transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <i className={mobileMenuOpen ? "fas fa-times text-xl" : "fas fa-bars text-xl"}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-gradient-to-b from-white to-[#f8f5f0] border-t border-[#8B4513]/10 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              <a href="/" className="flex items-center gap-3 px-4 py-3 font-medium text-gray-700 hover:bg-[#8B4513]/10 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                <i className="fas fa-home w-5 text-[#8B4513]"></i>
                <span>Home</span>
              </a>
              <a href="/#about" className="flex items-center gap-3 px-4 py-3 font-medium text-gray-700 hover:bg-[#8B4513]/10 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                <i className="fas fa-church w-5 text-[#8B4513]"></i>
                <span>About Us</span>
              </a>
              <a href="/#ministries" className="flex items-center gap-3 px-4 py-3 font-medium text-gray-700 hover:bg-[#8B4513]/10 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                <i className="fas fa-hands-helping w-5 text-[#8B4513]"></i>
                <span>Ministries</span>
              </a>
              <a href="/#events" className="flex items-center gap-3 px-4 py-3 font-medium text-gray-700 hover:bg-[#8B4513]/10 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                <i className="fas fa-calendar-alt w-5 text-[#8B4513]"></i>
                <span>Events</span>
              </a>
              <a href="/#services" className="flex items-center gap-3 px-4 py-3 font-medium text-gray-700 hover:bg-[#8B4513]/10 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                <i className="fas fa-certificate w-5 text-[#8B4513]"></i>
                <span>Services</span>
              </a>
              <a href="/#contact" className="flex items-center gap-3 px-4 py-3 font-medium text-gray-700 hover:bg-[#8B4513]/10 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                <i className="fas fa-envelope w-5 text-[#8B4513]"></i>
                <span>Contact Us</span>
              </a>
              <div className="border-t border-[#8B4513]/10 my-2"></div>
              <a href="/signup" className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white px-4 py-3 rounded-lg font-semibold text-sm transition-all hover:shadow-lg">
                <i className="fas fa-user-plus text-xs"></i>
                <span>Sign Up</span>
              </a>
            </div>
          </div>
        )}
      </header>

      <div className="min-h-screen relative py-12 px-4 pt-20">
        <div className="h-full flex items-start justify-center pt-12">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-4 mx-auto">
        <div className="mb-4">
          <a href="/" className="inline-flex items-center gap-2 text-[#8B4513] font-medium hover:text-[#8B4513]/80 transition-colors text-sm">
            <i className="fas fa-arrow-left text-xs"></i>
            Back to Home
          </a>
        </div>
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold text-[#2c3e50] mb-1">Login</h2>
          <p className="text-gray-600 text-xs">Welcome back to Our Mother of Perpetual Help</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition-all"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#8B4513] text-white py-1.5 px-4 rounded-lg font-semibold transition-all duration-300 hover:bg-[#8B4513]/90 hover:scale-105 hover:shadow-lg"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="text-gray-600 text-xs">
            Don't have an account?{' '}
            <a href="/signup" className="text-[#8B4513] font-semibold hover:underline">
              Sign up
            </a>
          </p>
        </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-0 left-0 right-0 bg-[#2c3e50] text-white py-4 shadow-inner">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-white/80 text-xs sm:text-sm tracking-wide">
              &copy; 2026 Our Mother of Perpetual Help Redemptorist Church - Dumaguete. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Login