import { useState } from 'react'
import './App.css'

const logoImage = new URL('./assets/images/Perpetual Church Logo.png', import.meta.url).href
const heroImage = new URL('./assets/images/Perpetual Church.png', import.meta.url).href
const ourLadyImage = new URL('./assets/images/Mother-of-Perpetual-Help.png', import.meta.url).href
const ministryImage = new URL('./assets/images/Ministry.png', import.meta.url).href
const churchInsideImage = new URL('./assets/images/Perpetual Church Inside.png', import.meta.url).href
const priestImages = {
  'Fr. Gaspe': new URL('./assets/images/Fr._Gaspe.png', import.meta.url).href,
  'Fr. James': new URL('./assets/images/Fr._James.png', import.meta.url).href,
  'Fr. Eliodoro': new URL('./assets/images/Fr._Eliodoro.png', import.meta.url).href,
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="font-body bg-gray-50 text-gray-900 scroll-smooth">
      {/* Header */}
      <header id="main-header" className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white via-white to-[#f8f5f0] shadow-md border-b border-[#8B4513]/10 transition-transform duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
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

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <a href="#home" className="relative px-3 py-2 text-sm font-medium text-gray-700 transition-colors group">
                Home
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#8B4513] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
              <a href="#about" className="relative px-3 py-2 text-sm font-medium text-gray-700 transition-colors group">
                About
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#8B4513] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
              <a href="#ministries" className="relative px-3 py-2 text-sm font-medium text-gray-700 transition-colors group">
                Ministries
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#8B4513] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
              <a href="#events" className="relative px-3 py-2 text-sm font-medium text-gray-700 transition-colors group">
                Events
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#8B4513] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
              <a href="#services" className="relative px-3 py-2 text-sm font-medium text-gray-700 transition-colors group">
                Services
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#8B4513] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
              <a href="#contact" className="relative px-3 py-2 text-sm font-medium text-gray-700 transition-colors group">
                Contact
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#8B4513] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
            </nav>

            {/* Desktop CTA Button */}
            <div className="hidden lg:flex items-center gap-2">
              <a href="/register" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <i className="fas fa-user-plus text-xs"></i>
                <span>Sign Up</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#8B4513]/10 text-[#8B4513] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className={`fas fa-${mobileMenuOpen ? 'times' : 'bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-gradient-to-b from-white to-[#f8f5f0] border-t border-[#8B4513]/10 shadow-lg animate-in slide-in-from-top-2">
            <div className="px-4 py-4 space-y-2">
              <a href="#home" className="flex items-center gap-3 px-4 py-3 font-medium text-gray-700 hover:bg-[#8B4513]/10 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                <i className="fas fa-home w-5 text-[#8B4513]"></i>
                <span>Home</span>
              </a>
              <a href="#about" className="flex items-center gap-3 px-4 py-3 font-medium text-gray-700 hover:bg-[#8B4513]/10 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                <i className="fas fa-church w-5 text-[#8B4513]"></i>
                <span>About Us</span>
              </a>
              <a href="#ministries" className="flex items-center gap-3 px-4 py-3 font-medium text-gray-700 hover:bg-[#8B4513]/10 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                <i className="fas fa-hands-helping w-5 text-[#8B4513]"></i>
                <span>Ministries</span>
              </a>
              <a href="#events" className="flex items-center gap-3 px-4 py-3 font-medium text-gray-700 hover:bg-[#8B4513]/10 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                <i className="fas fa-calendar-alt w-5 text-[#8B4513]"></i>
                <span>Events</span>
              </a>
              <a href="#services" className="flex items-center gap-3 px-4 py-3 font-medium text-gray-700 hover:bg-[#8B4513]/10 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                <i className="fas fa-certificate w-5 text-[#8B4513]"></i>
                <span>Services</span>
              </a>
              <a href="#contact" className="flex items-center gap-3 px-4 py-3 font-medium text-gray-700 hover:bg-[#8B4513]/10 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                <i className="fas fa-envelope w-5 text-[#8B4513]"></i>
                <span>Contact Us</span>
              </a>
              <div className="border-t border-[#8B4513]/10 my-2"></div>
              <a href="/register" className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white px-4 py-3 rounded-lg font-semibold text-sm transition-all hover:shadow-lg">
                <i className="fas fa-user-plus text-xs"></i>
                <span>Sign Up</span>
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="relative">

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-4">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Our Mother of Perpetual Help Redemptorist Church" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/70 via-black/50 to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-12 left-10 w-28 h-28 bg-[#8B4513]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-16 right-10 w-40 h-40 bg-[#FFD700]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-20 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-8 text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80 border border-white/15">
                <span>Redemptorist Parish</span>
                <span className="text-[#FFD700]">•</span>
                <span>Since 1974</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight leading-tight drop-shadow-2xl text-[#8B4513]">
                Our Mother of Perpetual Help
              </h1>
              <p className="max-w-2xl text-base sm:text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-lg">
                A welcoming parish in Dumaguete City, inviting every family to grow closer to Christ through prayer, service, and sacramental life.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#about" className="inline-flex items-center justify-center rounded-full bg-[#8B4513] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-[#8B4513]/90">
                  Learn More
                </a>
                <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#2c3e50] shadow-sm transition hover:bg-gray-100">
                  Contact Us
                </a>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-3xl bg-white/10 border border-white/15 p-5 text-white shadow-xl backdrop-blur-md">
                <h3 className="text-sm uppercase tracking-[0.3em] text-white/70 mb-2">Worship</h3>
                <p className="text-sm text-white/90">Daily Masses, devotions, and communal prayer in a warm parish family.</p>
              </div>
              <div className="rounded-3xl bg-white/10 border border-white/15 p-5 text-white shadow-xl backdrop-blur-md">
                <h3 className="text-sm uppercase tracking-[0.3em] text-white/70 mb-2">Sacraments</h3>
                <p className="text-sm text-white/90">Support for Baptism, Eucharist, Confirmation, marriage, and healing ministries.</p>
              </div>
              <div className="rounded-3xl bg-white/10 border border-white/15 p-5 text-white shadow-xl backdrop-blur-md">
                <h3 className="text-sm uppercase tracking-[0.3em] text-white/70 mb-2">Community</h3>
                <p className="text-sm text-white/90">Youth groups, charity outreach, and fellowship for every generation.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      </section>

      {/* About */}      {/* About */}
      <section id="about" className="py-8 md:py-10 bg-gradient-to-br from-white via-[#f8f5f0] to-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#8B4513]/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#2c3e50]/5 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-3 border-2 border-[#8B4513]/20 shadow-sm">
              <i className="fas fa-church text-[#8B4513] text-sm"></i>
              <span className="text-[#8B4513] font-bold text-xs uppercase tracking-widest">About Our Parish</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-[#2c3e50] mb-3 leading-tight">Our Sacred Story</h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">For nearly five decades, Our Mother of Perpetual Help has been a beacon of faith, serving the Dumaguete City community.</p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            {/* Image Section */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/20 to-transparent z-10"></div>
              <img src={ourLadyImage} alt="Our Lady of Perpetual Help" className="w-full h-72 object-cover" />
            </div>

            {/* Content Section */}
            <div className="space-y-4">
              {/* Founded Card */}
              <div className="bg-gradient-to-br from-[#8B4513]/10 to-[#8B4513]/5 rounded-xl p-4 border border-[#8B4513]/20 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8B4513] to-[#A0522D] flex items-center justify-center text-white flex-shrink-0 shadow-md">
                    <i className="fas fa-cross text-sm"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#2c3e50] mb-1">A Legacy of Faith</h3>
                    <p className="text-xs text-gray-700 leading-relaxed">Founded in 1974 by the Redemptorist Fathers, serving our community for 50+ years with faith and compassion.</p>
                  </div>
                </div>
              </div>

              {/* Mission Statement */}
              <div className="bg-gradient-to-r from-white via-[#fbf3e8] to-white rounded-xl p-4 border-2 border-[#8B4513]/20 shadow-md relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFD700]/10 rounded-full blur-2xl"></div>
                <div className="relative">
                  <i className="fas fa-quote-left text-2xl text-[#8B4513]/20 mb-1"></i>
                  <p className="text-xs text-[#2c3e50] font-serif italic leading-relaxed">
                    A community of faith, hope, and love, serving God and our neighbors with compassion and dedication.
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-3 shadow-md border border-gray-100 text-center">
                  <p className="text-lg font-black text-[#8B4513]">50+</p>
                  <p className="text-xs text-gray-600 font-semibold">Years of Service</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-md border border-gray-100 text-center">
                  <p className="text-lg font-black text-[#8B4513]">1974</p>
                  <p className="text-xs text-gray-600 font-semibold">Year Founded</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ministries */}
      <section id="ministries" className="py-4 bg-gradient-to-br from-secondary/5 via-white to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-40 h-40 border-2 border-primary/30 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-28 h-28 border-2 border-secondary/30 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 border-2 border-accent/30 rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-3 border-2 border-[#8B4513]/20 shadow-sm">
              <i className="fas fa-hands-helping text-[#8B4513] text-sm"></i>
              <span className="text-[#8B4513] font-bold text-xs uppercase tracking-widest">Our Ministries</span>
            </div>
            <h2 className="text-xl md:text-2xl font-display font-bold text-[#2c3e50] mb-2">Serve with Love & Purpose</h2>
            <p className="text-sm text-gray-600 max-w-xl mx-auto">Discover meaningful ways to serve God, support our community, and grow in faith together</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 items-center mb-4">
            <div className="space-y-3">
              <div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-[#2c3e50] mb-2">Make a Difference</h3>
                <p className="text-sm text-gray-700 mb-2 leading-relaxed">
                  Our ministries provide opportunities for every parishioner to use their unique gifts and talents in service to God and our community.
                </p>
              </div>

              <div className="bg-gradient-to-r from-secondary/10 via-primary/10 to-accent/10 rounded-lg p-3 border border-secondary/20">
                <p className="text-gray-700 italic text-sm leading-relaxed font-medium text-center">
                  "For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do." - Ephesians 2:10
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 p-2 bg-white rounded-lg shadow border border-gray-100">
                  <div className="w-6 h-6 bg-[#8B4513]/10 rounded-full flex items-center justify-center">
                    <i className="fas fa-users text-[#8B4513] text-xs"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-xs">Community Impact</h4>
                    <p className="text-gray-600 text-xs">Serving 2,000+ people annually</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white rounded-lg shadow border border-gray-100">
                  <div className="w-6 h-6 bg-[#2c3e50]/10 rounded-full flex items-center justify-center">
                    <i className="fas fa-heart text-[#2c3e50] text-xs"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-xs">Spiritual Growth</h4>
                    <p className="text-gray-600 text-xs">Faith through prayer & study</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white border-2 border-white transform hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-primary/20"></div>
                <img src={ministryImage} alt="Community Service and Ministry Work" className="w-full h-48 lg:h-64 object-cover relative z-10" />

                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-secondary/20">
                  <i className="fas fa-hands-helping text-[#2c3e50] text-lg"></i>
                </div>
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-[#2c3e50]/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                  <i className="fas fa-star text-white text-xs"></i>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl md:text-2xl font-display font-bold mb-2 text-shadow">Start Serving Today</h3>
                  <p className="text-sm md:text-base opacity-95 font-medium mb-3">Step into a ministry that matches your gifts.</p>
                  <a href="#contact" className="inline-flex items-center gap-2 bg-[#8B4513] text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-[#8B4513]/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <i className="fas fa-envelope"></i>
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: 'fa-pray', title: 'Worship Ministry', desc: 'Liturgy, music, and sacrament preparation.', status: 'Active' },
              { icon: 'fa-graduation-cap', title: 'Education Ministry', desc: 'Religious education and faith formation.', status: 'Growing' },
              { icon: 'fa-hands-helping', title: 'Charity Ministry', desc: 'Outreach programs and support for those in need.', status: 'Essential' },
              { icon: 'fa-users', title: 'Youth Ministry', desc: 'Programs for young people to grow in faith.', status: 'Vibrant' },
            ].map((item, i) => (
              <div key={i} className="group bg-white rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className={`w-12 h-12 ${i === 0 ? 'bg-[#8B4513]' : i === 1 ? 'bg-[#2c3e50]' : i === 2 ? 'bg-[#34495e]' : 'bg-green-600'} rounded-full flex items-center justify-center text-white text-lg mx-auto mb-3 shadow-lg`}>
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h4 className="text-base font-display font-bold text-[#2c3e50] mb-2">{item.title}</h4>
                <p className="text-gray-600 text-xs leading-relaxed mb-3">{item.desc}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                  i === 0 ? 'bg-[#8B4513]/10 text-[#8B4513]' :
                  i === 1 ? 'bg-[#2c3e50]/10 text-[#2c3e50]' :
                  i === 2 ? 'bg-[#34495e]/10 text-[#34495e]' :
                  'bg-green-100 text-green-700'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="relative pt-4 pb-3 overflow-hidden">
        <div className="absolute inset-0">
          <img src={churchInsideImage} alt="Church Interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#8B4513]/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2c3e50]/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#34495e]/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

         <div className="relative z-10 max-w-6xl mx-auto px-4">
           <div className="text-center mb-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-3 border-2 border-[#8B4513]/20 shadow-sm">
                <i className="fas fa-calendar-alt text-[#8B4513] text-sm"></i>
                <span className="text-[#8B4513] font-bold text-xs uppercase tracking-widest">Events</span>
              </div>
               <h2 className="text-xl md:text-2xl font-display font-bold text-white mb-1 drop-shadow-lg">Faith-Filled Events & Celebrations</h2>
              <p className="text-sm text-white/90 max-w-xl mx-auto drop-shadow">Celebrating faith, community, and fellowship together</p>
           </div>

          <div className="grid lg:grid-cols-2 gap-4 items-center mb-4">
           <div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-3 drop-shadow-lg">Come Together in Faith</h3>
              <p className="text-sm text-white/90 mb-3 leading-relaxed drop-shadow-md">
               Our parish events bring our community together for worship, celebration, learning, and service. From solemn liturgies to joyful gatherings, there's always something happening.
             </p>
             <div className="bg-white/10 backdrop-blur-sm border-l-4 border-[#F5DEB3] p-2 rounded-r-lg mb-2">
                <p className="text-white italic text-xs leading-relaxed">
                 "For where two or three gather in my name, there am I with them." - Matthew 18:20
               </p>
             </div>
             <div className="grid grid-cols-2 gap-2">
               <div className="flex items-center gap-2">
                 <div className="w-6 h-6 bg-[#8B4513]/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                   <i className="fas fa-calendar-check text-[#F5DEB3] text-xs"></i>
                 </div>
                 <div>
                    <h4 className="font-semibold text-white text-xs drop-shadow-md">Regular Celebrations</h4>
                    <p className="text-white/80 text-xs">Weekly masses & feasts</p>
                 </div>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-6 h-6 bg-[#8B4513]/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                   <i className="fas fa-users text-[#F5DEB3] text-xs"></i>
                 </div>
                 <div>
                    <h4 className="font-semibold text-white text-xs drop-shadow-md">Community Building</h4>
                    <p className="text-white/80 text-xs">Fellowship gatherings</p>
                 </div>
               </div>
             </div>
           </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { num: '50+', label: 'Events/Year', bgColor: 'bg-[#8B4513]/80', textColor: 'text-white' },
                { num: '2,000+', label: 'Participants', bgColor: 'bg-[#2c3e50]/80', textColor: 'text-white' },
                { num: '12', label: 'Programs', bgColor: 'bg-[#CD853F]/80', textColor: 'text-white' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className={`w-12 h-12 ${stat.bgColor} backdrop-blur-sm rounded-full flex items-center justify-center text-white text-lg mx-auto mb-2 shadow-lg`}>
                    <i className={`fas ${i === 0 ? 'fa-calendar-alt' : i === 1 ? 'fa-users' : 'fa-star'}`}></i>
                  </div>
                  <div className={`text-lg font-bold ${stat.textColor} mb-1 drop-shadow-lg`}>{stat.num}</div>
                  <div className={`font-medium text-xs ${stat.textColor}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

           <div className="grid md:grid-cols-3 gap-4">
             {[
               { title: 'Liturgical Celebrations', desc: 'Solemn masses, feast days, and special liturgical celebrations.', items: ['Sunday Masses', 'Feast Day Celebrations', 'Sacramental Events'], bgColor: 'bg-[#F5DEB3]/15', borderColor: 'border-[#8B4513]/30', iconBg: 'bg-[#8B4513]', checkColor: 'text-[#8B4513]' },
               { title: 'Community Gatherings', desc: 'Fellowship activities, social events, and community meals.', items: ['Parish Fiesta', 'Community Potlucks', 'Fellowship Events'], bgColor: 'bg-[#F5DEB3]/10', borderColor: 'border-[#2c3e50]/30', iconBg: 'bg-[#2c3e50]', checkColor: 'text-[#2c3e50]' },
               { title: 'Educational Programs', desc: 'Learning opportunities, workshops, and faith formation sessions.', items: ['Bible Study Groups', 'Youth Programs', 'Adult Education'], bgColor: 'bg-[#F5DEB3]/12', borderColor: 'border-[#CD853F]/30', iconBg: 'bg-[#CD853F]', checkColor: 'text-[#CD853F]' },
             ].map((event, i) => (
               <div key={i} className={`${event.bgColor} backdrop-blur-md rounded-xl p-4 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border ${event.borderColor} hover:bg-opacity-20`}>
                 <div className={`w-12 h-12 ${event.iconBg} backdrop-blur-sm rounded-full flex items-center justify-center text-white text-lg mx-auto mb-3 shadow-lg`}>
                   <i className={`fas ${i === 0 ? 'fa-pray' : i === 1 ? 'fa-users' : 'fa-graduation-cap'}`}></i>
                 </div>
                 <h4 className="text-base font-display font-bold text-white mb-2 drop-shadow-lg">{event.title}</h4>
                 <p className="text-white/90 text-sm leading-relaxed mb-3 drop-shadow-md">{event.desc}</p>
                 <ul className="text-left space-y-1 text-xs text-white/80">
                   {event.items.map((item, j) => (
                     <li key={j} className="flex items-center gap-1">
                       <i className={`fas fa-check ${event.checkColor} text-xs`}></i>
                       <span>{item}</span>
                     </li>
                   ))}
                 </ul>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-6 bg-gradient-to-br from-secondary/5 via-white to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-40 h-40 border-2 border-primary/30 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-28 h-28 border-2 border-secondary/30 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 border-2 border-accent/30 rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-3 border-2 border-[#8B4513]/20 shadow-sm">
              <i className="fas fa-cross text-[#8B4513] text-sm"></i>
              <span className="text-[#8B4513] font-bold text-xs uppercase tracking-widest">Sacramental Services</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-[#2c3e50] mb-2">Sacred Sacraments & Official Documents</h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">Graced sacraments, official church documents, and spiritual support for every stage of parish life.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="w-9 h-9 rounded-full bg-[#8B4513]/10 flex items-center justify-center text-[#8B4513] text-sm">
                    <i className="fas fa-church"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#2c3e50]">Sacred Rites</h4>
                    <p className="text-xs text-gray-500">7 sacraments</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="w-9 h-9 rounded-full bg-[#2c3e50]/10 flex items-center justify-center text-[#2c3e50] text-sm">
                    <i className="fas fa-file-alt"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#2c3e50]">Official Documents</h4>
                    <p className="text-xs text-gray-500">Certified records</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="w-9 h-9 rounded-full bg-[#34495e]/10 flex items-center justify-center text-[#34495e] text-sm">
                    <i className="fas fa-users"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#34495e]">Community Support</h4>
                    <p className="text-xs text-gray-500">Spiritual guidance</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="w-9 h-9 rounded-full bg-green-600/10 flex items-center justify-center text-green-600 text-sm">
                    <i className="fas fa-heart"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#2c3e50]">Faith Journey</h4>
                    <p className="text-xs text-gray-500">Lifelong commitment</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: 'Baptism', desc: 'Welcoming new members into the Christian faith.', status: 'Sacred', icon: 'fa-water' },
                  { title: 'Confirmation', desc: 'Strengthening faith through the Holy Spirit.', status: 'Essential', icon: 'fa-dove' },
                  { title: 'Eucharist', desc: 'Life in the Body & Blood of Christ.', status: 'Central', icon: 'fa-bread-slice' },
                ].map((service, i) => (
                  <div key={i} className="bg-white rounded-2xl p-3 text-center border border-gray-100 shadow-sm">
                    <div className={`w-11 h-11 mx-auto mb-3 rounded-full flex items-center justify-center text-white ${i === 0 ? 'bg-[#8B4513]' : i === 1 ? 'bg-[#2c3e50]' : i === 2 ? 'bg-[#34495e]' : i === 3 ? 'bg-green-600' : i === 4 ? 'bg-purple-600' : 'bg-blue-600'}`}>
                      <i className={`fas ${service.icon} text-sm`}></i>
                    </div>
                    <h4 className="text-sm font-semibold text-[#2c3e50] mb-1">{service.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">{service.desc}</p>
                    <span className={`inline-flex px-2 py-1 rounded-full text-[11px] font-semibold ${
                      service.status === 'Sacred' ? 'bg-[#8B4513]/10 text-[#8B4513]' :
                      service.status === 'Essential' ? 'bg-[#2c3e50]/10 text-[#2c3e50]' :
                      service.status === 'Central' ? 'bg-[#34495e]/10 text-[#34495e]' :
                      service.status === 'Beautiful' ? 'bg-pink-100 text-pink-700' :
                      service.status === 'Comforting' ? 'bg-purple-100 text-purple-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>{service.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[2rem] border border-white/20 bg-white/95 p-6 shadow-xl">
                <div className="text-xs uppercase tracking-[0.25em] text-[#8B4513] font-semibold mb-3">Receive God's Grace</div>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">Our parish offers sacramental guidance and official church support in one compact service section.</p>
                <div className="rounded-3xl bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#CD853F] p-4 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] mb-2">Scripture</p>
                  <p className="text-sm leading-relaxed">"Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit."</p>
                </div>
                <a href="/register" className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#8B4513] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#8B4513]/90">Sign Up Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="pt-4 pb-3 bg-gradient-to-br from-gray-50 via-white to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border border-primary/20 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-secondary/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-accent/20 rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-3 border-2 border-[#8B4513]/20 shadow-sm">
              <i className="fas fa-envelope text-[#8B4513] text-sm"></i>
              <span className="text-[#8B4513] font-bold text-xs uppercase tracking-widest">Contact Us</span>
            </div>
            <h2 className="text-xl md:text-2xl font-display font-bold text-[#2c3e50] mb-1 leading-tight">Connect With Our Community</h2>
            <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">Reach out to us - we're here to support your spiritual journey and welcome you into our loving community.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {[
              { icon: 'fa-phone', title: 'Call Us', content: '225-4763 / 0916-144-9599' },
              { icon: 'fa-envelope', title: 'Email Us', content: 'redsdgte@gmail.com', subtitle: '24hr response' },
              { icon: 'fa-clock', title: 'Office Hours', content: 'Mon-Sun: 8:30AM-12NN, 1:30PM-5PM' },
              { icon: 'fa-share-alt', title: 'Follow Us', content: 'Stay connected' },
            ].map((contact, i) => (
              <div key={i} className="bg-white rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className={`w-10 h-10 ${i === 0 ? 'bg-[#2c3e50]' : i === 1 ? 'bg-[#34495e]' : i === 2 ? 'bg-green-600' : 'bg-purple-600'} rounded-full flex items-center justify-center text-white text-sm mx-auto mb-2 shadow-lg`}>
                  <i className={`fas ${contact.icon} text-sm`}></i>
                </div>
                <h3 className="text-sm font-display font-bold text-[#2c3e50] mb-1 text-center">{contact.title}</h3>
                <div className="text-center text-gray-600 text-xs">
                  {i === 3 ? (
                    <div className="flex justify-center gap-2 mt-1">
                      <a href="https://www.facebook.com/omphdumaguete" target="_blank" rel="noopener noreferrer" className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs hover:bg-blue-700 transition-colors">
                        <i className="fab fa-facebook-f text-xs"></i>
                      </a>
                    </div>
                  ) : (
                    <>
                      <p className={`text-xs font-bold ${i === 1 ? 'text-[#34495e]' : ''}`}>{contact.content}</p>
                      {contact.subtitle && <p className="text-xs text-gray-500 mt-1">{contact.subtitle}</p>}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 shadow-lg border border-gray-100">
              <div className="text-center mb-2">
                <h3 className="text-sm font-display font-bold text-[#2c3e50] mb-1">Send Us a Message</h3>
                <p className="text-gray-600 text-xs">Have a question or need spiritual guidance? We're here to help.</p>
              </div>
              <form className="space-y-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input type="text" className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-primary focus:border-transparent transition-all" placeholder="Your full name" maxLength="100" pattern="[A-Za-z\s]+" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                  <input type="email" className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-primary focus:border-transparent transition-all" placeholder="your.email@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-primary focus:border-transparent transition-all" placeholder="(035) 123-4567" pattern="[0-9\s\-\(\)\+]+" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Subject *</label>
                  <select className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-primary focus:border-transparent transition-all">
                    <option value="">Select a subject</option>
                    <option>Sacramental Services</option>
                    <option>Ministry Opportunities</option>
                    <option>Event Information</option>
                    <option>Spiritual Guidance</option>
                    <option>General Inquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Message *</label>
                  <textarea rows="2" className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-primary focus:border-transparent transition-all resize-none" placeholder="Share your thoughts, questions, or prayer requests..." maxLength="500"></textarea>
                  <div className="text-xs text-gray-400 mt-1">Maximum 500 characters</div>
                </div>
                <div className="text-center">
                  <button type="submit" className="bg-[#8B4513] text-white px-3 py-1.5 rounded-full font-bold text-xs hover:bg-[#8B4513]/90 transition-all duration-300 shadow hover:shadow-md transform hover:-translate-y-0.5 inline-flex items-center gap-1">
                    <i className="fas fa-paper-plane text-xs"></i>
                    Send Message
                  </button>
                  <p className="text-xs text-gray-500 mt-1">We respect your privacy and will respond within 24 hours.</p>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-xl p-3 shadow-lg border border-gray-100 overflow-hidden">
              <h3 className="text-sm font-display font-bold text-[#2c3e50] mb-2 text-center">Find Us on the Map</h3>
              <div className="aspect-video rounded-lg overflow-hidden">
<iframe
  src="https://maps.google.com/maps?q=Our%20Mother%20of%20Perpetual%20Help%20Redemptorist%20Church%20Dumaguete%20City&t=&z=15&ie=UTF8&iwloc=&output=embed"
  width="100%"
  height="100%"
  style={{border: 0}}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
></iframe>
              </div>
              <div className="text-center mt-2">
                <a href="https://maps.app.goo.gl/2JrDxHW47QVu5911A" target="_blank" className="inline-flex items-center gap-1 text-[#8B4513] font-medium hover:text-[#8B4513]/80 transition-colors text-xs">
                  <i className="fas fa-external-link-alt"></i>
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#2c3e50] text-white py-4 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white/80 text-xs sm:text-sm tracking-wide">
            &copy; 2025 Our Mother of Perpetual Help Redemptorist Church - Dumaguete. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
