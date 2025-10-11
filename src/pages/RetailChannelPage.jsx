import { Hero } from '../retail-channel/gsapcountries-main/app/components/hero/hero'
import CardAnimation from '../retail-channel/gsapcountries-main/app/components/card-animation'
import { Countries } from '../retail-channel/gsapcountries-main/app/components'
import '../retail-channel/gsapcountries-main/app/app.css'

// Back button component
const BackButton = () => {
  return (
    <a
      href="/"
      className="fixed top-8 left-8 z-50 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all duration-300 flex items-center gap-2 group"
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        className="transform group-hover:-translate-x-1 transition-transform"
      >
        <path d="M19 12H5M5 12L12 19M5 12L12 5"/>
      </svg>
      Back to Home
    </a>
  )
}

function RetailChannelPage() {
  return (
    <div className="min-h-screen bg-black">
      <BackButton />
      <Hero />
      <CardAnimation />
      <Countries />
    </div>
  )
}

export default RetailChannelPage


