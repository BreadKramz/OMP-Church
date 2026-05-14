import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../lib/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc, collection, getDocs, query, orderBy, onSnapshot, addDoc, serverTimestamp, updateDoc } from 'firebase/firestore'

const logoImage = new URL('../assets/images/Perpetual Church Logo.png', import.meta.url).href

const AdminTypingIndicator = () => (
  <div className="flex justify-end">
    <div className="max-w-[85%] p-3 rounded-2xl text-sm bg-blue-100 text-gray-800 rounded-br-md shadow-sm border border-blue-200">
      <div className="flex items-center gap-1">
        <span className="text-blue-600 font-semibold">Admin is typing</span>
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  </div>
)

function AdminDashboard() {
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
  const [uid, setUid] = useState(null)
  const [allUsers, setAllUsers] = useState([])
  const [viewingUsers, setViewingUsers] = useState(false)
  const [chatList, setChatList] = useState([])
  const [selectedChatId, setSelectedChatId] = useState(null)
  const [selectedChat, setSelectedChat] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [adminMessage, setAdminMessage] = useState('')
  const chatMessagesUnsubRef = useRef(null)
  const [certificateRequests, setCertificateRequests] = useState([])
  const [serviceRequests, setServiceRequests] = useState([])
  const [requestsTab, setRequestsTab] = useState('certificates')
  const [requestFilter, setRequestFilter] = useState('all')
  const [isAdminTyping, setIsAdminTyping] = useState(false)

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
              setUid(user.uid)
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

  useEffect(() => {
    const chatsQuery = query(collection(db, 'chats'), orderBy('updatedAt', 'desc'))
    const unsubscribe = onSnapshot(chatsQuery, (snapshot) => {
      const chats = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setChatList(chats)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    return () => {
      if (chatMessagesUnsubRef.current) {
        chatMessagesUnsubRef.current()
      }
    }
  }, [])

  // Fetch certificate requests
  useEffect(() => {
    const certQuery = query(collection(db, 'certificate_requests'), orderBy('submittedAt', 'desc'))
    const unsubscribe = onSnapshot(certQuery, (snapshot) => {
      const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setCertificateRequests(requests)
    })
    return unsubscribe
  }, [])

  // Fetch service requests
  useEffect(() => {
    const serviceQuery = query(collection(db, 'service_requests'), orderBy('submittedAt', 'desc'))
    const unsubscribe = onSnapshot(serviceQuery, (snapshot) => {
      const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setServiceRequests(requests)
    })
    return unsubscribe
  }, [])

  const selectChat = async (chat) => {
    if (selectedChatId === chat.id) return
    setSelectedChatId(chat.id)
    setSelectedChat(chat)
    setChatMessages([])
    setIsAdminTyping(false)
    // Reset typing for the user
    await setDoc(doc(db, 'chats', chat.id), { typing: false }, { merge: true })
    if (chatMessagesUnsubRef.current) {
      chatMessagesUnsubRef.current()
    }
    const messagesQuery = query(collection(db, 'chats', chat.id, 'messages'), orderBy('createdAt'))
    chatMessagesUnsubRef.current = onSnapshot(messagesQuery, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setChatMessages(messages)
    })
  }

  const handleSendAdminMessage = async () => {
    if (!selectedChatId || !adminMessage.trim()) return

    const content = adminMessage.trim()
    setAdminMessage('')
    setIsAdminTyping(true)

    // Set typing to true for the user
    await setDoc(doc(db, 'chats', selectedChatId), { typing: true }, { merge: true })

    setTimeout(async () => {
      try {
        await addDoc(collection(db, 'chats', selectedChatId, 'messages'), {
          sender: 'admin',
          content,
          createdAt: serverTimestamp()
        })
        await setDoc(
          doc(db, 'chats', selectedChatId),
          {
            lastMessage: content,
            updatedAt: serverTimestamp(),
            typing: false
          },
          { merge: true }
        )
        setIsAdminTyping(false)
      } catch (error) {
        console.error('Error sending admin message:', error)
        alert('Error sending message: ' + error.message)
        setIsAdminTyping(false)
        await setDoc(doc(db, 'chats', selectedChatId), { typing: false }, { merge: true })
      }
    }, 1500)
  }

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return ''
    const date = timestamp.toDate ? timestamp.toDate() : timestamp instanceof Date ? timestamp : new Date(timestamp)
    return date.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
  }

  const handleRequestAction = async (requestId, action, collectionName) => {
    try {
      const requestRef = doc(db, collectionName, requestId)
      await updateDoc(requestRef, {
        status: action,
        processedAt: serverTimestamp(),
        processedBy: uid
      })
      alert(`Request ${action} successfully.`)
    } catch (error) {
      console.error(`Error ${action}ing request:`, error)
      alert(`Error ${action}ing request: ${error.message}`)
    }
  }

  const filteredCertificateRequests = certificateRequests.filter(request => {
    if (requestFilter === 'all') return true
    return request.status === requestFilter
  })

  const filteredServiceRequests = serviceRequests.filter(request => {
    if (requestFilter === 'all') return true
    return request.status === requestFilter
  })

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
      const profileRef = doc(db, 'profiles', uid)
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

  const fetchAllUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'profiles'))
      const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setAllUsers(users)
      setViewingUsers(true)
    } catch (error) {
      console.error('Error fetching users:', error)
      alert('Error fetching users: ' + error.message)
    }
  }

  const handleBackToProfile = () => {
    setViewingUsers(false)
    setAllUsers([])
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
              <div>
                {!viewingUsers ? (
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
                        <div className="flex justify-end gap-2 mt-3">
                          {!isEditing ? (
                            <>
                              <button
                                onClick={handleEdit}
                                className="bg-[#8B4513] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#8B4513]/90 transition-all"
                              >
                                <i className="fas fa-edit mr-2"></i>
                                Edit Profile
                              </button>
                              <button
                                onClick={fetchAllUsers}
                                className="bg-[#2c3e50] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#2c3e50]/90 transition-all"
                              >
                                <i className="fas fa-users mr-2"></i>
                                View All Users
                              </button>
                            </>
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
                ) : (
                  <div className="bg-[#f8f5f0] rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-[#2c3e50]">All Users ({allUsers.length})</h2>
                      <button
                        onClick={handleBackToProfile}
                        className="bg-[#8B4513] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#8B4513]/90 transition-all"
                      >
                        <i className="fas fa-arrow-left mr-2"></i>
                        Back to Profile
                      </button>
                    </div>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {allUsers.map(user => (
                        <div key={user.id} className="bg-white p-3 rounded-lg shadow-sm border">
                          <p><span className="font-medium">Name:</span> {user.first_name} {user.last_name}</p>
                          <p><span className="font-medium">Email:</span> {user.email_address}</p>
                          <p><span className="font-medium">Phone:</span> {user.phone_number || 'Not provided'}</p>
                          <p><span className="font-medium">Role:</span> {user.role}</p>
                          <p><span className="font-medium">Member since:</span> {new Date(user.created_at).toLocaleDateString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-[#2c3e50]">Agent Chat</h2>
              <p className="text-gray-600">View active user conversations and reply directly as the admin.</p>
            </div>
            <div className="grid lg:grid-cols-[280px_1fr] gap-4">
              <div className="bg-[#f8f5f0] rounded-2xl p-4 h-[520px] overflow-y-auto border border-[#8B4513]/10">
                <h3 className="text-sm font-semibold text-[#2c3e50] mb-3">Active Chats</h3>
                {chatList.length === 0 ? (
                  <p className="text-xs text-gray-500">No active chats yet. Users will appear here when they send a message.</p>
                ) : (
                  <div className="space-y-2">
                    {chatList.map((chat) => (
                      <button
                        key={chat.id}
                        onClick={() => selectChat(chat)}
                        className={`w-full text-left p-3 rounded-2xl transition-all border ${selectedChatId === chat.id ? 'border-[#8B4513] bg-white shadow-lg' : 'border-transparent bg-white/80 hover:border-[#8B4513]/50 hover:bg-white'} `}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="text-sm font-semibold text-[#2c3e50] truncate">{chat.name || chat.email}</p>
                          <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B4513]">{chat.id === selectedChatId ? 'Open' : 'New'}</span>
                        </div>
                        <p className="text-xs text-gray-600 truncate">{chat.lastMessage || 'Waiting for user'}</p>
                        <p className="text-[10px] text-gray-500 mt-1">{chat.updatedAt ? new Date(chat.updatedAt.toDate ? chat.updatedAt.toDate() : chat.updatedAt).toLocaleString([], { hour: '2-digit', minute: '2-digit' }) : ''}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-[#f8f5f0] rounded-2xl p-4 h-[520px] flex flex-col border border-[#8B4513]/10">
                {selectedChat ? (
                  <>
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-[#2c3e50]">Conversation with {selectedChat.name || selectedChat.email}</h3>
                      <p className="text-xs text-gray-500">User ID: {selectedChat.id}</p>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-white rounded-2xl border border-gray-100">
                      {chatMessages.length === 0 ? (
                        <p className="text-xs text-gray-500">This conversation is starting. Send the first message.</p>
                      ) : (
                        chatMessages.map((message) => {
                          const isUserMessage = message.sender === 'user'
                          const timestamp = message.createdAt?.toDate ? message.createdAt.toDate() : message.createdAt
                          return (
                            <div key={message.id} className={`rounded-2xl p-3 ${isUserMessage ? 'bg-white border border-gray-200 self-start' : 'bg-[#8B4513] text-white self-end'} max-w-[85%]`}>
                              <p className="text-sm leading-relaxed">{message.content}</p>
                              <p className={`text-[10px] mt-2 ${isUserMessage ? 'text-gray-500' : 'text-white/70'}`}>
                                {timestamp ? timestamp.toLocaleString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                              </p>
                            </div>
                          )
                         })
                       )}
                       {isAdminTyping && <AdminTypingIndicator />}
                     </div>
                    <div className="mt-4">
                      <textarea
                        value={adminMessage}
                        onChange={(e) => setAdminMessage(e.target.value)}
                        rows={3}
                        className="w-full rounded-2xl border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                        placeholder="Type your reply to the user..."
                      />
                      <button
                        onClick={handleSendAdminMessage}
                        className="mt-3 inline-flex items-center justify-center rounded-full bg-[#8B4513] px-4 py-2 text-sm font-semibold text-white hover:bg-[#8B4513]/90 transition-all"
                      >
                        Send Reply
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-center text-gray-500">
                    <p className="text-sm font-semibold">Select a chat from the left to view messages.</p>
                    <p className="text-xs mt-2">You can reply to users directly from here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-[#2c3e50]">Requests Management</h2>
              <p className="text-gray-600">Review and manage certificate and service requests from users</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-6">
              <div className="bg-[#f8f5f0] rounded-lg p-1">
                <button
                  onClick={() => setRequestsTab('certificates')}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    requestsTab === 'certificates'
                      ? 'bg-[#8B4513] text-white'
                      : 'text-gray-700 hover:bg-white'
                  }`}
                >
                  Certificate Requests ({certificateRequests.length})
                </button>
                <button
                  onClick={() => setRequestsTab('services')}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    requestsTab === 'services'
                      ? 'bg-[#8B4513] text-white'
                      : 'text-gray-700 hover:bg-white'
                  }`}
                >
                  Service Requests ({serviceRequests.length})
                </button>
              </div>
            </div>

            {/* Filter */}
            <div className="flex justify-center mb-4">
              <div className="flex gap-2">
                {['all', 'pending', 'approved', 'rejected'].map(status => (
                  <button
                    key={status}
                    onClick={() => setRequestFilter(status)}
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all ${
                      requestFilter === status
                        ? 'bg-[#8B4513] text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Requests List */}
            <div className="max-h-96 overflow-y-auto">
              {requestsTab === 'certificates' ? (
                <div className="space-y-3">
                  {filteredCertificateRequests.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No certificate requests found.</p>
                  ) : (
                    filteredCertificateRequests.map(request => (
                      <div key={request.id} className="bg-[#f8f5f0] rounded-lg p-4 border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-[#2c3e50]">{request.certificateTitle}</h4>
                            <p className="text-sm text-gray-600">{request.userEmail}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            request.status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {request.status}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mb-3">
                          <p><strong>Requirements:</strong> {request.requirements}</p>
                          <p><strong>Duration:</strong> {request.duration}</p>
                          <p><strong>Submitted:</strong> {formatTimestamp(request.submittedAt)}</p>
                        </div>
                        {request.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleRequestAction(request.id, 'approved', 'certificate_requests')}
                              className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-all"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRequestAction(request.id, 'rejected', 'certificate_requests')}
                              className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-all"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredServiceRequests.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No service requests found.</p>
                  ) : (
                    filteredServiceRequests.map(request => (
                      <div key={request.id} className="bg-[#f8f5f0] rounded-lg p-4 border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-[#2c3e50]">{request.serviceTitle}</h4>
                            <p className="text-sm text-gray-600">{request.userEmail}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            request.status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {request.status}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mb-3">
                          <p><strong>Requirements:</strong> {request.requirements}</p>
                          <p><strong>Processing Time:</strong> {request.processingTime}</p>
                          <p><strong>Fee:</strong> {request.fee}</p>
                          <p><strong>Submitted:</strong> {formatTimestamp(request.submittedAt)}</p>
                        </div>
                        {request.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleRequestAction(request.id, 'approved', 'service_requests')}
                              className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-all"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRequestAction(request.id, 'rejected', 'service_requests')}
                              className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-all"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
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