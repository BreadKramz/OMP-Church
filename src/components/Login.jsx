import { useState } from 'react'

function Login() {
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
    <div className="min-h-screen bg-[#f0ede9] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#2c3e50] mb-2">Login</h2>
          <p className="text-gray-600">Welcome back to Our Mother of Perpetual Help</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#8B4513] text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:bg-[#8B4513]/90 hover:scale-105 hover:shadow-lg"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-[#8B4513] font-semibold hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login