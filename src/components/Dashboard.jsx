import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../lib/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import Chatbot from './Chatbot.jsx'

const logoImage = new URL('../assets/images/Perpetual Church Logo.png', import.meta.url).href

function Dashboard() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showProfileDetails, setShowProfileDetails] = useState(false)
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    phone_number: ''
  })
  const [showCertificatesForm, setShowCertificatesForm] = useState(false)
  const [showServicesForm, setShowServicesForm] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState('')
  const [selectedService, setSelectedService] = useState('')

  const certificates = [
    'Outstanding Service Award',
    'Volunteer Service Certificate',
    'Youth Ministry Service Award',
    'Choir Service Recognition',
    'Ushering Service Certificate',
    'Media Ministry Recognition',
    'Church Leadership Award',
    'Bible Study Participation Certificate',
    'Missionary Service Certificate',
    'Community Outreach Recognition'
  ]

  const services = [
    'Certificate of Baptism',
    'Certificate of Confirmation',
    'Certificate of First Communion',
    'Certificate of Marriage',
    'Certificate of Membership',
    'Certificate of Dedication',
    'Certificate of Appreciation',
    'Certificate of Recognition',
    'Certificate of Participation',
    'Certificate of Service'
  ]

  const getUser = useCallback(async () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const profileRef = doc(db, 'profiles', user.uid)
          const profileSnap = await getDoc(profileRef)

          if (profileSnap.exists()) {
            const data = profileSnap.data()
            setProfile(data)
            if (data.role !== 'user') {
              navigate('/admin-dashboard')
            }
          } else {
            // Profile doesn't exist, create default
            const defaultProfile = {
              id: user.uid,
              first_name: 'User',
              last_name: '',
              email_address: user.email,
              phone_number: '',
              role: 'user',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
            await setDoc(profileRef, defaultProfile)
            setProfile(defaultProfile)
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

  useEffect(() => {
    getUser()
  }, [getUser])

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/login')
  }

  const handleEdit = () => {
    setEditForm({
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone_number: profile.phone_number
    })
    setIsEditing(true)
  }

  const handleSave = async () => {
    try {
      const profileRef = doc(db, 'profiles', profile.id)
      const updatedProfile = {
        ...profile,
        first_name: editForm.first_name,
        last_name: editForm.last_name,
        phone_number: editForm.phone_number,
        updated_at: new Date().toISOString()
      }
      await setDoc(profileRef, updatedProfile)
      setProfile(updatedProfile)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile: ' + error.message)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditForm({
      first_name: '',
      last_name: '',
      phone_number: ''
    })
  }

  const handleFormChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    })
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
              <h1 className="text-2xl font-bold text-[#2c3e50] mb-2">Welcome to Your Dashboard</h1>
              <p className="text-gray-600">Manage your account and stay connected with our community</p>
            </div>

            {profile && (
              <div className="bg-[#f8f5f0] rounded-lg p-4">
                <div className="mb-3">
                  <h2
                    onClick={() => setShowProfileDetails(!showProfileDetails)}
                    className="text-lg font-semibold text-[#2c3e50] cursor-pointer flex items-center justify-between"
                  >
                    Profile Information
                    <i className={`fas fa-chevron-${showProfileDetails ? 'up' : 'down'}`}></i>
                  </h2>
                  {showProfileDetails && (
                    <div className="flex justify-end mt-3">
                      {!isEditing ? (
                        <button
                          onClick={handleEdit}
                          className="bg-[#8B4513] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#8B4513]/90 transition-all"
                        >
                          <i className="fas fa-edit mr-2"></i>
                          Edit Profile
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={handleSave}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-green-700 transition-all"
                          >
                            <i className="fas fa-save mr-2"></i>
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-700 transition-all"
                          >
                            <i className="fas fa-times mr-2"></i>
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {showProfileDetails && (
                  <>
                    {!isEditing ? (
                      <div className="space-y-2">
                        <p><span className="font-medium">Name:</span> {profile.first_name} {profile.last_name}</p>
                        <p><span className="font-medium">Email:</span> {profile.email_address}</p>
                        <p><span className="font-medium">Phone:</span> {profile.phone_number || 'Not provided'}</p>
                        <p><span className="font-medium">Role:</span> {profile.role}</p>
                        <p><span className="font-medium">Member since:</span> {new Date(profile.created_at).toLocaleDateString()}</p>
                      </div>
                    ) : (
                      <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                            <input
                              type="text"
                              name="first_name"
                              value={editForm.first_name}
                              onChange={handleFormChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition-all"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                            <input
                              type="text"
                              name="last_name"
                              value={editForm.last_name}
                              onChange={handleFormChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                          <input
                            type="tel"
                            name="phone_number"
                            value={editForm.phone_number}
                            onChange={handleFormChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent transition-all"
                            placeholder="(035) 123-4567"
                          />
                        </div>
                        <div className="pt-2 border-t border-gray-200">
                          <p className="text-xs text-gray-500">Email and role cannot be changed.</p>
                          <div className="mt-2 space-y-1">
                            <p><span className="font-medium">Email:</span> {profile.email_address}</p>
                            <p><span className="font-medium">Role:</span> {profile.role}</p>
                            <p><span className="font-medium">Member since:</span> {new Date(profile.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </form>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Certificates and Services */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-[#2c3e50] mb-4">Request Certificates</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div
                  className="bg-[#f8f5f0] rounded-lg p-4 border border-[#8B4513]/20 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setShowCertificatesForm(true)}
                >
                  <h3 className="text-lg font-semibold text-[#8B4513] mb-2">Certificates</h3>
                  <p className="text-gray-600 text-sm">Request service and participation certificates</p>
                </div>
                <div
                  className="bg-[#f8f5f0] rounded-lg p-4 border border-[#8B4513]/20 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setShowServicesForm(true)}
                >
                  <h3 className="text-lg font-semibold text-[#8B4513] mb-2">Services</h3>
                  <p className="text-gray-600 text-sm">Request sacramental and membership certificates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Chatbot />

      {/* Certificates Form Modal */}
      {showCertificatesForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4 text-[#2c3e50]">Request Certificate</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert(`Requested: ${selectedCertificate}`); setShowCertificatesForm(false); setSelectedCertificate(''); }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Certificate</label>
              <select
                value={selectedCertificate}
                onChange={(e) => setSelectedCertificate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                required
              >
                <option value="">Choose...</option>
                {certificates.map(cert => (
                  <option key={cert} value={cert}>{cert}</option>
                ))}
              </select>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => { setShowCertificatesForm(false); setSelectedCertificate(''); }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#8B4513]/90 transition-colors"
                >
                  Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Services Form Modal */}
      {showServicesForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4 text-[#2c3e50]">Request Service Certificate</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert(`Requested: ${selectedService}`); setShowServicesForm(false); setSelectedService(''); }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Service Certificate</label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                required
              >
                <option value="">Choose...</option>
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => { setShowServicesForm(false); setSelectedService(''); }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#8B4513]/90 transition-colors"
                >
                  Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

export default Dashboard