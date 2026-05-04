import { useState } from 'react'

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    // Handle signup logic here
    console.log('Signup data:', formData)
  }

  return (
    <div className="min-h-screen bg-[#f0ede9] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#2c3e50] mb-2">Create Account</h2>
          <p className="text-gray-600">Join Our Mother of Perpetual Help community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition-all"
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition-all"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition-all"
              placeholder="Create a password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition-all"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#8B4513] text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:bg-[#8B4513]/90 hover:scale-105 hover:shadow-lg"
          >
            Create Account
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-[#8B4513] font-semibold hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup