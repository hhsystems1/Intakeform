import React from 'react'
import IntakeForm from './components/IntakeForm'

function App() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Website Project Intake Form
        </h1>
        <p className="text-white/90 text-center mb-8">
          Help us understand your vision for your new website
        </p>
        <IntakeForm />
      </div>
    </div>
  )
}

export default App
