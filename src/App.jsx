import React, { useState } from 'react'
import IntakeForm from './components/IntakeForm'

function App() {
  const [logoError, setLogoError] = useState(false)

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-hhs-blue via-hhs-blue-dark to-blue-900">
      <div className="max-w-4xl mx-auto">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          {!logoError && (
            <img
              src="/assets/hhs-logo.png"
              alt="Helping Hand Systems"
              className="mx-auto mb-4 h-32 w-auto drop-shadow-lg"
              onError={(e) => {
                // Try fallback to SVG placeholder
                if (e.target.src.includes('.png')) {
                  e.target.src = '/assets/hhs-logo-placeholder.svg'
                } else {
                  setLogoError(true)
                }
              }}
            />
          )}
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-md">
            Helping Hand Systems
          </h1>
          <h2 className="text-2xl font-semibold text-white/90 mb-2">
            Website Project Intake Form
          </h2>
          <p className="text-white/80 text-lg">
            Help us understand your vision for your new website
          </p>
        </div>
        <IntakeForm />
      </div>
    </div>
  )
}

export default App
