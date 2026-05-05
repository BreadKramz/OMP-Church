import { useState } from 'react'

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! Welcome to Our Mother of Perpetual Help. How can I help you today?',
      timestamp: new Date()
    }
  ])

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
    }
  ]

  const handleQuestionClick = (questionId) => {
    const question = predefinedQuestions.find(q => q.id === questionId)
    if (!question) return

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

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
  }

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
        <div className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
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
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
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
          </div>

          {/* Quick Questions */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <p className="text-xs text-gray-600 mb-2 font-medium">Quick Questions:</p>
            <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
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
        </div>
      )}
    </>
  )
}

export default Chatbot