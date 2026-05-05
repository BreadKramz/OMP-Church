import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'

function Chatbot() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! Welcome to Our Mother of Perpetual Help. How can I help you today?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [user, setUser] = useState(null)
  const [showAgentModal, setShowAgentModal] = useState(false)
  const messagesEndRef = useRef(null)

  const predefinedQuestions = [
    {
      id: 'mass-schedule',
      question: 'What are the Mass schedules?',
      answer: 'Our Mass schedules are:\n\n• Sunday: 6:00 AM, 8:00 AM, 10:00 AM, 4:00 PM\n• Monday-Saturday: 6:00 AM\n• First Friday: 6:00 PM (with adoration)\n\nAll Masses are held at our church in Dumaguete City.'
    },
    {
      id: 'contact',
      question: 'How can I contact the church?',
      answer: 'You can reach us through:\n\n📞 Phone: 225-4763 / 0916-144-9599\n📧 Email: redsdgte@gmail.com\n🌐 Facebook: @omphdumaguete\n\nOffice Hours: Mon-Sun, 8:30AM-12NN & 1:30PM-5PM'
    },
    {
      id: 'about',
      question: 'Tell me about the church',
      answer: 'Our Mother of Perpetual Help Redemptorist Parish has served Dumaguete City since 1974. We are a welcoming community committed to faith, hope, and love, serving God and our neighbors through prayer, sacraments, and service to those in need.'
    },
    {
      id: 'ministries',
      question: 'What ministries are available?',
      answer: 'Our parish offers various ministries:\n\n• Worship Ministry (liturgy, music, sacraments)\n• Education Ministry (religious instruction)\n• Charity Ministry (outreach programs)\n• Youth Ministry (programs for young people)\n\nContact us to get involved!'
    },
    {
      id: 'sacraments',
      question: 'How do I arrange sacraments?',
      answer: 'For sacraments, please contact the parish office:\n\n• Baptism: Contact parish office for scheduling\n• First Communion & Confirmation: Through our education programs\n• Marriage: Contact priest at least 6 months in advance\n• Anointing of the Sick: Available upon request\n\nAll sacraments require proper preparation and documentation.'
    },
    {
      id: 'location',
      question: 'Where is the church located?',
      answer: 'Our Mother of Perpetual Help Redemptorist Parish is located in Dumaguete City, Philippines.\n\n📍 Address: [Church Address]\n🗺️ View on Maps: https://maps.app.goo.gl/2JrDxHW47QVu5911A\n\nWe\'re easily accessible and have parking available.'
    },
    {
      id: 'events',
      question: 'What events are coming up?',
      answer: 'Our parish hosts various events throughout the year:\n\n• Sunday Masses & Feast Day Celebrations\n• Parish Fiesta & Community Meals\n• Bible Study & Youth Programs\n• Charity Events & Outreach Programs\n\nCheck our Facebook page @omphdumaguete for the latest updates!'
    },
    {
      id: 'join',
      question: 'How can I become a member?',
      answer: 'We welcome everyone to join our faith community!\n\n1. Attend our Sunday Masses\n2. Participate in our programs and ministries\n3. Consider the RCIA program for those new to Catholicism\n4. Get involved in our outreach and charity work\n\nContact us to learn more about becoming part of our parish family.'
    },
    {
      id: 'agent',
      question: 'Chat with an agent',
      answer: ''
    }
  ]

  const handleQuestionClick = (questionId) => {
    const question = predefinedQuestions.find(q => q.id === questionId)
    if (!question) return

    if (questionId === 'agent') {
      if (!user) {
        setShowAgentModal(true)
      } else {
        // For authenticated users, show a message that agents are unavailable
        const userMessage = {
          id: messages.length + 1,
          type: 'user',
          content: question.question,
          timestamp: new Date()
        }
        const botMessage = {
          id: messages.length + 2,
          type: 'bot',
          content: 'Our live agents are currently unavailable. Please contact our parish office directly at 225-4763 or email redsdgte@gmail.com for immediate assistance.',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, userMessage, botMessage])
      }
      return
    }

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: question.question,
      timestamp: new Date()
    }

    // Add bot response
    const botMessage = {
      id: messages.length + 2,
      type: 'bot',
      content: question.answer,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage, botMessage])
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userInput = inputMessage.trim().toLowerCase()

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    // Find matching predefined question
    const matchedQuestion = predefinedQuestions.find(q =>
      q.question.toLowerCase().includes(userInput) ||
      userInput.includes(q.question.toLowerCase().replace('?', '').replace('what ', '').replace('how ', '').replace('where ', '').replace('when ', ''))
    )

    let botResponse
    if (matchedQuestion) {
      botResponse = matchedQuestion.answer
    } else {
      // Default response for unrecognized questions
      botResponse = "Thank you for your question! For more detailed information or specific inquiries, please contact our parish office at 225-4763 or email redsdgte@gmail.com. We'd be happy to assist you personally!"
    }

    const botMessage = {
      id: messages.length + 2,
      type: 'bot',
      content: botResponse,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage, botMessage])
    setInputMessage('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
  }

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return unsubscribe
  }, [])

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={toggleChatbot}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#8B4513] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center ${
          isOpen ? 'scale-110' : ''
        }`}
        aria-label="Open chat"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comments'} text-xl`}></i>
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#8B4513] text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <i className="fas fa-church text-sm"></i>
            </div>
            <div>
              <h3 className="font-semibold text-sm">Church Assistant</h3>
              <p className="text-xs text-white/80">Ask me anything!</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-[#f8f5f0]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    message.type === 'user'
                      ? 'bg-[#8B4513] text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="p-3 border-t border-gray-200 bg-white max-h-40 overflow-y-auto">
            <p className="text-xs text-gray-600 mb-2 font-medium">Quick Questions:</p>
            <div className="grid grid-cols-1 gap-1.5">
              {predefinedQuestions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleQuestionClick(q.id)}
                  className="text-left p-2 bg-[#f8f5f0] hover:bg-[#8B4513]/10 rounded-lg text-xs text-gray-700 hover:text-[#8B4513] transition-colors border border-gray-100"
                >
                  {q.question}
                </button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#8B4513]/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Or click on a quick question above</p>
          </div>
        </div>
      )}

      {/* Agent Modal */}
      {showAgentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-[#2c3e50]">Chat with Agent</h3>
            <p className="mb-4 text-gray-700">Sign up first to chat with an agent.</p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowAgentModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => { setShowAgentModal(false); navigate('/signup'); }}
                className="px-4 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#8B4513]/90 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot