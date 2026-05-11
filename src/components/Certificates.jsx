import { useState } from 'react'

const logoImage = new URL('../assets/images/Perpetual Church Logo.png', import.meta.url).href

function Certificates() {
  const [selectedCertificate, setSelectedCertificate] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const certificates = [
    {
      id: 'outstanding-service',
      title: 'Outstanding Service Award',
      description: 'Recognizes exceptional dedication and service to the parish community.',
      requirements: 'Minimum 2 years of active service, nomination by ministry leader.',
      duration: 'Lifetime recognition'
    },
    {
      id: 'volunteer-service',
      title: 'Volunteer Service Certificate',
      description: 'Awarded to volunteers who contribute significantly to parish activities.',
      requirements: '100+ hours of volunteer work annually.',
      duration: 'Annual renewal'
    },
    {
      id: 'youth-ministry',
      title: 'Youth Ministry Service Award',
      description: 'Honors youth leaders and participants in youth programs.',
      requirements: 'Active involvement in youth activities for 1+ year.',
      duration: 'Annual'
    },
    {
      id: 'choir-service',
      title: 'Choir Service Recognition',
      description: 'For dedicated members of the parish choir and music ministry.',
      requirements: 'Regular participation in liturgical music.',
      duration: 'Lifetime'
    },
    {
      id: 'ushering-service',
      title: 'Ushering Service Certificate',
      description: 'Recognizes ushers who ensure smooth worship services.',
      requirements: 'Consistent ushering duties for 6+ months.',
      duration: 'Annual'
    },
    {
      id: 'media-ministry',
      title: 'Media Ministry Recognition',
      description: 'For those involved in audio-visual and media support.',
      requirements: 'Technical support for parish events.',
      duration: 'Annual'
    },
    {
      id: 'church-leadership',
      title: 'Church Leadership Award',
      description: 'For elected or appointed leaders in parish governance.',
      requirements: 'Holding leadership position for 1+ year.',
      duration: 'Term-based'
    },
    {
      id: 'bible-study',
      title: 'Bible Study Participation Certificate',
      description: 'For active participants in Bible study groups.',
      requirements: 'Regular attendance in study sessions.',
      duration: 'Annual'
    },
    {
      id: 'missionary-service',
      title: 'Missionary Service Certificate',
      description: 'Recognizes participation in missionary work and outreach.',
      requirements: 'Involvement in outreach programs.',
      duration: 'Project-based'
    },
    {
      id: 'community-outreach',
      title: 'Community Outreach Recognition',
      description: 'For volunteers in community service and charity work.',
      requirements: 'Participation in charity initiatives.',
      duration: 'Annual'
    }
  ]

  const handleRequest = () => {
    if (!selectedCertificate) {
      alert('Please select a certificate to request.')
      return
    }
    alert(`Request submitted for: ${certificates.find(c => c.id === selectedCertificate).title}`)
    setSelectedCertificate('')
  }

  return (
    <div className="font-body bg-[#f0ede9] text-gray-900 scroll-smooth">
      {/* Header */}
      <header id="main-header" className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white via-white to-[#f8f5f0] shadow-md border-b border-[#8B4513]/10 transition-transform duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16">
            <div className="flex-1 flex items-center">
              <a href="/dashboard" className="inline-flex items-center gap-2 text-[#8B4513] font-medium hover:text-[#8B4513]/80 transition-colors text-sm">
                <i className="fas fa-arrow-left text-xs"></i>
                Back to Dashboard
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
              <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 font-medium text-gray-700 hover:bg-[#8B4513]/10 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                <i className="fas fa-tachometer-alt w-5 text-[#8B4513]"></i>
                <span>Dashboard</span>
              </a>
              <a href="/" className="flex items-center gap-3 px-4 py-3 font-medium text-gray-700 hover:bg-[#8B4513]/10 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                <i className="fas fa-home w-5 text-[#8B4513]"></i>
                <span>Home</span>
              </a>
            </div>
          </div>
        )}
      </header>

      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-[#2c3e50] mb-2">Request Certificates</h1>
              <p className="text-gray-600">Select a certificate to learn more and submit your request</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {certificates.map(cert => (
                <div
                  key={cert.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedCertificate === cert.id
                      ? 'border-[#8B4513] bg-[#8B4513]/5'
                      : 'border-gray-200 bg-gray-50 hover:border-[#8B4513]/50'
                  }`}
                  onClick={() => setSelectedCertificate(cert.id)}
                >
                  <h3 className="text-lg font-semibold text-[#2c3e50] mb-2">{cert.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{cert.description}</p>
                  <div className="text-xs text-gray-500">
                    <p><strong>Requirements:</strong> {cert.requirements}</p>
                    <p><strong>Duration:</strong> {cert.duration}</p>
                  </div>
                </div>
              ))}
            </div>

            {selectedCertificate && (
              <div className="text-center">
                <button
                  onClick={handleRequest}
                  className="bg-[#8B4513] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#8B4513]/90 transition-all"
                >
                  Request {certificates.find(c => c.id === selectedCertificate).title}
                </button>
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

export default Certificates