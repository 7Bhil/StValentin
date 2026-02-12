import { useState } from 'react'
import Intro from './components/Intro'
import HeartGame from './components/HeartGame'
import Proposal from './components/Proposal'

function App() {
  const [step, setStep] = useState('intro')

  return (
    <main className="w-full h-screen overflow-hidden relative">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-red-50 to-pink-100 opacity-50" />
      
      <div className="relative z-10 w-full h-full">
        {step === 'intro' && (
          <Intro onOpen={() => setStep('game')} />
        )}
        
        {step === 'game' && (
          <HeartGame onComplete={() => setStep('proposal')} />
        )}
        
        {step === 'proposal' && (
          <Proposal />
        )}
      </div>
    </main>
  )
}

export default App
