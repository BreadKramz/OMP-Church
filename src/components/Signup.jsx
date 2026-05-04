import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const logoImage = new URL('../assets/images/Perpetual Church Logo.png', import.meta.url).href

function Signup() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          phone: formData.phone
        }
      }
    })
    if (error) {
      alert(error.message)
    } else {
      setShowModal(true)
    }
  }

  return (
    <div className="font-body bg-[#f0ede9] text-gray-900 scroll-smooth">
      {/* Header */}
      <header id="main-header" className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white via-white to-[#f8f5f0] shadow-md border-b border-[#8B4513]/10 transition-transform duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16">
            <div className="flex-1 flex items-center">
              <a href="/" className="inline-flex items-center gap-2 text-[#8B4513] font-medium hover:text-[#8B4513]/80 transition-colors text-sm">
                <i className="fas fa-arrow-left text-xs"></i>
                Back to Home
              </a>
            </div>
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

      <div className="min-h-screen relative py-8 px-4 pt-16">
        <div className="h-full flex items-start justify-center pt-12">
          <div className="max-w-xs w-full bg-white rounded-xl shadow-lg p-4 mx-auto">
        <div className="text-center mb-2">
          <h2 className="text-lg font-bold text-[#2c3e50] mb-1">Create Account</h2>
          <p className="text-gray-600 text-xs">Join Our Mother of Perpetual Help community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition-all"
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition-all"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition-all"
              placeholder="(035) 123-4567"
              pattern="[0-9\s\-\(\)\+]+"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-1.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition-all"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-1.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition-all"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#8B4513] text-white py-1.5 px-3 rounded-lg font-semibold transition-all duration-300 hover:bg-[#8B4513]/90 hover:scale-105 hover:shadow-lg"
          >
            Create Account
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="text-gray-600 text-xs">
            Already have an account?{' '}
            <a href="/login" className="text-[#8B4513] font-semibold hover:underline">
              Sign in
            </a>
          </p>
        </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-4">
              <h3 className="text-lg font-bold text-[#2c3e50] mb-2">Confirm Your Email</h3>
              <p className="text-gray-600 mb-4">Please check your email and click the confirmation link to complete your signup.</p>
              <button
                onClick={() => { setShowModal(false); navigate('/login'); }}
                className="bg-[#8B4513] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#8B4513]/90 transition-all"
              >
                OK
              </button>
            </div>
          </div>
        )}

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

export default Signup