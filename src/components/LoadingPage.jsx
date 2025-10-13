import { useEffect, useRef, useState } from 'react'
import useResourceLoader from '../hooks/useResourceLoader'

const LoadingPage = ({ onComplete, duration = 3000 }) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const spaceRef = useRef(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionProgress, setTransitionProgress] = useState(0)
  
  // Use the resource loader hook
  const { loadingProgress, loadingPhase, isComplete } = useResourceLoader()

  // Start transition when loading is complete
  useEffect(() => {
    if (isComplete && loadingProgress >= 100) {
      // Wait a bit before starting transition
      const transitionTimer = setTimeout(() => {
        setIsTransitioning(true)
        
        // Animate transition progress
        const startTime = Date.now()
        const transitionDuration = 1000 // 1 second transition
        
        const animateTransition = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / transitionDuration, 1)
          
          // Ease out cubic for smooth animation
          const easedProgress = 1 - Math.pow(1 - progress, 3)
          setTransitionProgress(easedProgress)
          
          if (progress < 1) {
            requestAnimationFrame(animateTransition)
          } else {
            // Complete the transition
            if (onComplete) {
              onComplete()
            }
          }
        }
        
        requestAnimationFrame(animateTransition)
      }, 500) // Small delay after completion

      return () => clearTimeout(transitionTimer)
    }
  }, [isComplete, loadingProgress, onComplete])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Traveling through space animation class
    class SpaceTravel {
      constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.stars = []
        this.numOfStars = 250
        this.speed = 0.025
        this.warpZ = 12
        this.halfw = 0
        this.halfh = 0
        this.animationId = null
      }

      init() {
        this.setupCanvas()
        this.createStars()
        this.loop()
      }

      setupCanvas() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.canvas.style.width = '100%'
        this.canvas.style.background = 'rgb(0, 0, 0)'
        
        this.halfw = this.canvas.width / 2
        this.halfh = this.canvas.height / 2

        // Fill with black background
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      }

      rnd(num1, num2) {
        return Math.floor(Math.random() * num2 * 2) + num1
      }

      getColor() {
        return `hsla(200,100%, ${this.rnd(50, 100)}%, 1)`
      }

      createStars() {
        this.stars = []
        for (let i = 0; i < this.numOfStars; i++) {
          this.stars.push(new Star(this))
        }
      }

      loop() {
        // Create trailing effect
        this.ctx.setTransform(1, 0, 0, 1, 0, 0)
        this.ctx.fillStyle = 'rgba(0,0,0,0.2)'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        
        this.ctx.translate(this.halfw, this.halfh)
        
        for (let i = 0; i < this.stars.length; i++) {
          this.stars[i].draw()
        }
        
        this.animationId = requestAnimationFrame(this.loop.bind(this))
      }

      destroy() {
        if (this.animationId) {
          cancelAnimationFrame(this.animationId)
        }
      }

      resize() {
        this.destroy()
        this.setupCanvas()
        this.createStars()
        this.loop()
      }
    }

    // Star class for individual stars
    class Star {
      constructor(spaceTravel) {
        this.spaceTravel = spaceTravel
        this.reset()
      }

      reset() {
        this.x = this.spaceTravel.rnd(0 - this.spaceTravel.halfw, this.spaceTravel.halfw)
        this.y = this.spaceTravel.rnd(0 - this.spaceTravel.halfh, this.spaceTravel.halfh)
        this.z = this.spaceTravel.rnd(1, this.spaceTravel.warpZ)
        this.color = this.spaceTravel.getColor()
      }

      draw() {
        // Move star towards camera
        this.z -= this.spaceTravel.speed
        
        // Calculate screen position
        const x = this.x / this.z
        const y = this.y / this.z
        const x2 = this.x / (this.z + this.spaceTravel.speed * 0.50)
        const y2 = this.y / (this.z + this.spaceTravel.speed * 0.50)
        
        // Draw star streak
        this.spaceTravel.ctx.strokeStyle = this.color
        this.spaceTravel.ctx.beginPath()
        this.spaceTravel.ctx.moveTo(x, y)
        this.spaceTravel.ctx.lineTo(x2, y2)
        this.spaceTravel.ctx.stroke()
        
        // Reset star if it goes off screen or too close
        if (x < 0 - this.spaceTravel.halfw || x > this.spaceTravel.halfw || 
            y < 0 - this.spaceTravel.halfh || y > this.spaceTravel.halfh || this.z <= 0) {
          this.reset()
        }
      }
    }

    // Initialize space travel animation
    const spaceTravel = new SpaceTravel(canvas)
    spaceTravel.init()
    spaceRef.current = spaceTravel

    // Cleanup function will be handled by the resource loader effect

    // Handle window resize
    const handleResize = () => {
      if (spaceRef.current) {
        spaceRef.current.resize()
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (spaceRef.current) {
        spaceRef.current.destroy()
      }
    }
  }, [onComplete, duration])

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Space particles canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'rgb(0, 0, 0)' }}
      />
      
      {/* Loading content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* Central icon */}
        <div 
          className="w-48 h-48 md:w-40 md:h-40 flex items-center justify-center transition-all duration-1000 ease-out mb-8"
          style={{
            transform: isTransitioning 
              ? `scale(${1 + transitionProgress * 2}) translateZ(0)` 
              : 'scale(1)',
            opacity: isTransitioning ? 1 - transitionProgress * 0.5 : 1
          }}
        >
          <svg 
            className="w-full h-full" 
            viewBox="0 0 957 842" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="471.5" y="157.05" width="23.9" height="23.9" fill="white"/>
            <rect x="471.5" y="185.54" width="23.9" height="204.55" fill="white"/>
            <rect x="471.5" y="661.05" width="23.9" height="23.9" transform="translate(966.9 1346.01) rotate(180)" fill="white"/>
            <rect x="471.5" y="451.93" width="23.9" height="204.55" transform="translate(966.9 1108.4) rotate(180)" fill="white"/>
            <rect x="691.38" y="409.5" width="23.9" height="23.9" transform="translate(1124.78 -281.88) rotate(90)" fill="white"/>
            <rect x="591.9" y="339.59" width="23.9" height="163.72" transform="translate(1025.3 -182.39) rotate(90)" fill="white"/>
            <rect x="252.51" y="411.1" width="23.9" height="23.9" transform="translate(-158.59 687.51) rotate(-90)" fill="white"/>
            <rect x="354.88" y="341.19" width="23.9" height="163.72" transform="translate(-56.21 789.88) rotate(-90)" fill="white"/>
            <rect x="573.65" y="306.69" width="17.87" height="17.87" transform="translate(354.61 -306.51) rotate(41.43)" fill="white"/>
            <rect x="530.8" y="313.59" width="17.87" height="100.37" transform="translate(375.74 -266.11) rotate(41.43)" fill="white"/>
            <rect x="376.83" y="306.69" width="17.87" height="17.87" transform="translate(883.85 297.03) rotate(138.57)" fill="white"/>
            <rect x="419.69" y="313.59" width="17.87" height="100.37" transform="translate(990.69 352.92) rotate(138.57)" fill="white"/>
            <rect x="374.44" y="518.42" width="17.87" height="17.87" transform="translate(321.9 1176.42) rotate(-138.57)" fill="white"/>
            <rect x="417.3" y="429.02" width="17.87" height="100.37" transform="translate(428.74 1120.53) rotate(-138.57)" fill="white"/>
            <rect x="577.41" y="515.98" width="17.87" height="17.87" transform="translate(-199.88 559.38) rotate(-44.35)" fill="white"/>
            <rect x="532.16" y="428.83" width="17.87" height="100.37" transform="translate(-180.68 514.67) rotate(-44.35)" fill="white"/>
          </svg>
        </div>

        {/* Progress display */}
        <div className="text-center">
          {/* Progress percentage */}
          <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">
            {loadingProgress}%
          </div>
          
          {/* Loading phase text */}
          <div className="text-lg md:text-xl text-gray-300 mb-6 font-light">
            {loadingPhase}
          </div>
          
          {/* Progress bar */}
          <div className="w-80 md:w-96 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Transition overlay - Circle opening effect */}
      {isTransitioning && (
        <div 
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, transparent ${Math.max(0, 20 - transitionProgress * 25)}%, black ${Math.max(0, 25 - transitionProgress * 30)}%)`,
            transition: 'all 0.1s ease-out'
          }}
        />
      )}

      {/* Camera zoom effect overlay */}
      {isTransitioning && (
        <div 
          className="absolute inset-0 z-30 pointer-events-none"
          style={{
            background: 'black',
            clipPath: `circle(${transitionProgress * 150}% at center)`,
            transition: 'clip-path 0.1s ease-out'
          }}
        />
      )}
    </div>
  )
}

export default LoadingPage