import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../lib/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const logoImage = new URL('../assets/images/Perpetual Church Logo.png', import.meta.url).href

function AdminDashboard() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const profileRef = doc(db, 'profiles', user.uid)
          const profileSnap = await getDoc(profileRef)

          if (profileSnap.exists()) {
            const data = profileSnap.data()
            if (data.role === 'admin') {
              setProfile(data)
            } else {
              navigate('/dashboard')
            }
          } else {
            navigate('/dashboard')
          }
        } catch (error) {
          console.error('Error accessing profile:', error)
          alert('Error loading profile: ' + error.message)
        }
      } else {
        navigate('/login')
      }
      setLoading(false)
    })
    return unsubscribe
  }, [navigate])

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0ede9] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
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
            <div className="flex-1 flex items-center justify-end relative">
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="hidden lg:flex items-center gap-2 bg-[#8B4513] text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105 mr-4"
              >
                <i className="fas fa-sign-out-alt text-xs"></i>
                Logout
              </button>
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#8B4513]/10 text-[#8B4513] transition-colors"
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
              <button
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="flex items-center gap-3 px-4 py-3 font-medium text-gray-700 hover:bg-[#8B4513]/10 rounded-lg transition-colors w-full text-left"
              >
                <i className="fas fa-sign-out-alt w-5 text-[#8B4513]"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-[#2c3e50] mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage the church community and oversee operations</p>
            </div>

            {profile && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#f8f5f0] rounded-lg p-4">
                  <h2 className="text-lg font-semibold text-[#2c3e50] mb-3">Profile Information</h2>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {profile.first_name} {profile.last_name}</p>
                    <p><span className="font-medium">Email:</span> {profile.email_address}</p>
                    <p><span className="font-medium">Phone:</span> {profile.phone_number}</p>
                    <p><span className="font-medium">Role:</span> {profile.role}</p>
                    <p><span className="font-medium">Member since:</span> {new Date(profile.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="bg-[#f8f5f0] rounded-lg p-4">
                  <h2 className="text-lg font-semibold text-[#2c3e50] mb-3">Admin Actions</h2>
                  <div className="space-y-3">
                    <button className="block w-full bg-[#8B4513] text-white py-2 px-4 rounded-lg font-semibold text-center hover:bg-[#8B4513]/90 transition-all">
                      Manage Users
                    </button>
                    <button className="block w-full bg-[#2c3e50] text-white py-2 px-4 rounded-lg font-semibold text-center hover:bg-[#2c3e50]/90 transition-all">
                      View Reports
                    </button>
                    <button className="block w-full bg-[#34495e] text-white py-2 px-4 rounded-lg font-semibold text-center hover:bg-[#34495e]/90 transition-all">
                      System Settings
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2c3e50] text-white py-4 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white/80 text-xs sm:text-sm tracking-wide">
            &copy; 2026 Our Mother of Perpetual Help Redemptorist Church - Dumaguete. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default AdminDashboard