import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="flex items-center gap-4 mb-8">
          <img src={viteLogo} className="h-16 w-16 animate-spin" alt="Vite logo" />
          <span className="text-5xl font-bold text-gray-800 dark:text-white">+</span>
          <img src={reactLogo} className="h-16 w-16" alt="React logo" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Vite + React + Tailwind
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md">
          A fresh React project with Tailwind CSS configured and ready to go!
        </p>
        
        <button
          type="button"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      {/* Cards Section */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Tailwind CSS Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-xl">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fast Development</h3>
            <p className="text-gray-600 dark:text-gray-300">Rapidly build modern websites with utility classes.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-xl">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Responsive Design</h3>
            <p className="text-gray-600 dark:text-gray-300">Built-in responsive utilities for all screen sizes.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-xl">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Dark Mode</h3>
            <p className="text-gray-600 dark:text-gray-300">Seamlessly switch between light and dark themes.</p>
          </div>
        </div>
      </section>

      {/* Alert Banner */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">🎉 Tailwind CSS is Working!</h3>
          <p className="mb-4">Check the cards above - they demonstrate responsive grid, dark mode, and interactive states.</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Utility Classes</span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Dark Mode</span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Responsive</span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Animations</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App