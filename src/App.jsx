import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center" className="flex flex-col gap-6 place-content-center place-items-center flex-grow px-5">
        <div className="hero relative">
          <img src={heroImg} className="base w-[170px] mx-auto" alt="" />
          <img src={reactLogo} className="framework absolute z-1 top-8 h-7 left-0 right-0 mx-auto" alt="React logo" style={{transform: 'perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg) scale(1.4)'}} />
          <img src={viteLogo} className="vite absolute z-0 top-24 h-6 w-auto left-0 right-0 mx-auto" alt="Vite logo" style={{transform: 'perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg) scale(0.8)'}} />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-medium text-gray-900 dark:text-gray-100 mt-8 mb-8 tracking-tight">Get started</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Edit <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">src/App.jsx</code> and save to test <code className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter font-mono text-sm px-4 py-2 rounded bg-purple-100 text-purple-600 hover:border-purple-300 border-2 border-transparent transition-colors dark:bg-purple-900/30 dark:text-purple-300"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps" className="flex border-t border-gray-200 dark:border-gray-700 text-left">
        <div id="docs" className="flex-1 p-8 border-r border-gray-200 dark:border-gray-700 md:border-r-0 md:border-b">
          <svg className="icon mb-4 w-5 h-5" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">Documentation</h2>
          <p className="text-gray-600 dark:text-gray-400">Your questions, answered</p>
          <ul className="list-none p-0 flex gap-2 mt-8">
            <li>
              <a href="https://vite.dev/" target="_blank" className="text-gray-900 dark:text-gray-100 text-sm rounded bg-gray-100 dark:bg-gray-800 px-3 py-2 flex items-center gap-2 no-underline hover:shadow-md transition-shadow">
                <img className="logo h-4" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" className="text-gray-900 dark:text-gray-100 text-sm rounded bg-gray-100 dark:bg-gray-800 px-3 py-2 flex items-center gap-2 no-underline hover:shadow-md transition-shadow">
                <img className="button-icon h-4 w-4" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social" className="flex-1 p-8">
          <svg className="icon mb-4 w-5 h-5" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">Connect with us</h2>
          <p className="text-gray-600 dark:text-gray-400">Join the Vite community</p>
          <ul className="list-none p-0 flex gap-2 mt-8">
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank" className="text-gray-900 dark:text-gray-100 text-sm rounded bg-gray-100 dark:bg-gray-800 px-3 py-2 flex items-center gap-2 no-underline hover:shadow-md transition-shadow">
                <svg className="button-icon h-4 w-4" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank" className="text-gray-900 dark:text-gray-100 text-sm rounded bg-gray-100 dark:bg-gray-800 px-3 py-2 flex items-center gap-2 no-underline hover:shadow-md transition-shadow">
                <svg className="button-icon h-4 w-4" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank" className="text-gray-900 dark:text-gray-100 text-sm rounded bg-gray-100 dark:bg-gray-800 px-3 py-2 flex items-center gap-2 no-underline hover:shadow-md transition-shadow">
                <svg className="button-icon h-4 w-4" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank" className="text-gray-900 dark:text-gray-100 text-sm rounded bg-gray-100 dark:bg-gray-800 px-3 py-2 flex items-center gap-2 no-underline hover:shadow-md transition-shadow">
                <svg className="button-icon h-4 w-4" role="presentation" aria-hidden="true">
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer" className="h-22 border-t border-gray-200 dark:border-gray-700 md:h-12"></section>
    </>
  )
}

export default App