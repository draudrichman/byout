import { useEffect, useRef, useState } from 'react'

// Mock resource loader hook - replace with your actual implementation
const useResourceLoader = () => {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingPhase, setLoadingPhase] = useState('Initializing Systems')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const phases = [
      { progress: 0, text: 'Initializing Systems' },
      { progress: 25, text: 'Loading Resources' },
      { progress: 50, text: 'Preparing Navigation' },
      { progress: 75, text: 'Final Checks' },
      { progress: 100, text: 'Ready for Departure' }
    ]
    
    let currentPhase = 0
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const next = Math.min(prev + 1, 100)
        
        // Update phase
        if (phases[currentPhase + 1] && next >= phases[currentPhase + 1].progress) {
          currentPhase++
          setLoadingPhase(phases[currentPhase].text)
        }
        
        if (next === 100) {
          setIsComplete(true)
          clearInterval(interval)
        }
        
        return next
      })
    }, 40)

    return () => clearInterval(interval)
  }, [])

  return { loadingProgress, loadingPhase, isComplete }
}

  const LoadingPage = ({ onComplete, duration = 3000 }) => {
  const canvasRef = useRef(null)
  const spaceRef = useRef(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionProgress, setTransitionProgress] = useState(0)
  const [warpSpeed, setWarpSpeed] = useState(1)
  
  const { loadingProgress, loadingPhase, isComplete } = useResourceLoader()

  // Hyper-smooth transition with speed ramping
  useEffect(() => {
    if (isComplete && loadingProgress >= 100) {
      const transitionTimer = setTimeout(() => {
        setIsTransitioning(true)
        
        const startTime = Date.now()
        const transitionDuration = 2500 // 2.5 seconds for cinematic effect
        
        const animateTransition = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / transitionDuration, 1)
          
          // Custom easing: slow start, explosive middle, smooth end
          let easedProgress
          if (progress < 0.3) {
            // Slow anticipation (ease-in)
            easedProgress = Math.pow(progress / 0.3, 2) * 0.1
          } else if (progress < 0.7) {
            // Explosive acceleration (exponential)
            const t = (progress - 0.3) / 0.4
            easedProgress = 0.1 + Math.pow(t, 3) * 0.7
          } else {
            // Smooth deceleration to landing (ease-out)
            const t = (progress - 0.7) / 0.3
            easedProgress = 0.8 + (1 - Math.pow(1 - t, 3)) * 0.2
          }
          
          setTransitionProgress(easedProgress)
          
          // Warp speed effect
          if (progress < 0.3) {
            setWarpSpeed(1 + progress * 10) // Ramp up slowly
          } else if (progress < 0.7) {
            setWarpSpeed(4 + ((progress - 0.3) / 0.4) * 46) // Explosive speed
          } else {
            setWarpSpeed(50 - ((progress - 0.7) / 0.3) * 30) // Deceleration
          }
          
          if (progress < 1) {
            requestAnimationFrame(animateTransition)
          } else {
            setTimeout(() => {
              if (onComplete) onComplete()
            }, 100)
          }
        }
        
        requestAnimationFrame(animateTransition)
      }, 300)

      return () => clearTimeout(transitionTimer)
    }
  }, [isComplete, loadingProgress, onComplete])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    class SpaceTravel {
      constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.stars = []
        this.numOfStars = 300
        this.baseSpeed = 0.025
        this.speed = this.baseSpeed
        this.warpZ = 12
        this.halfw = 0
        this.halfh = 0
        this.animationId = null
        this.targetSpeed = this.baseSpeed
        this.vignette = 0
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

        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      }

      rnd(num1, num2) {
        return Math.floor(Math.random() * num2 * 2) + num1
      }

      getColor(speed) {
        // Start white, then color shift at high speeds to blue/purple
        if (speed < 0.3) {
          return `hsla(0, 0%, ${90 + speed * 33}%, 1)` // White to bright white
        } else {
          // Color shift based on speed - white to blue to purple (warp effect)
          const hue = 240 - (speed - 0.3) * 100 // Blue to purple
          const lightness = 90 - (speed - 0.3) * 40
          return `hsla(${hue}, 100%, ${lightness}%, 1)`
        }
      }

      createStars() {
        this.stars = []
        for (let i = 0; i < this.numOfStars; i++) {
          this.stars.push(new Star(this))
        }
      }

      setSpeed(multiplier) {
        this.targetSpeed = this.baseSpeed * multiplier
        this.vignette = Math.min(multiplier / 50, 0.9)
      }

      loop() {
        // Smooth speed interpolation
        this.speed += (this.targetSpeed - this.speed) * 0.1
        
        // Motion blur trail effect - more blur at higher speeds
        const blurAlpha = Math.max(0.05, 0.3 - (this.speed * 2))
        this.ctx.setTransform(1, 0, 0, 1, 0, 0)
        this.ctx.fillStyle = `rgba(0, 0, 0, ${blurAlpha})`
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        
        this.ctx.translate(this.halfw, this.halfh)
        
        for (let i = 0; i < this.stars.length; i++) {
          this.stars[i].draw()
        }
        
        // Vignette effect at high speeds
        if (this.vignette > 0) {
          this.ctx.setTransform(1, 0, 0, 1, 0, 0)
          const gradient = this.ctx.createRadialGradient(
            this.halfw, this.halfh, this.canvas.width * 0.3,
            this.halfw, this.halfh, this.canvas.width * 0.8
          )
          gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
          gradient.addColorStop(1, `rgba(0, 0, 0, ${this.vignette})`)
          this.ctx.fillStyle = gradient
          this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
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

    class Star {
      constructor(spaceTravel) {
        this.spaceTravel = spaceTravel
        this.reset()
      }

      reset() {
        this.x = this.spaceTravel.rnd(0 - this.spaceTravel.halfw, this.spaceTravel.halfw)
        this.y = this.spaceTravel.rnd(0 - this.spaceTravel.halfh, this.spaceTravel.halfh)
        this.z = this.spaceTravel.rnd(1, this.spaceTravel.warpZ)
      }

      draw() {
        this.z -= this.spaceTravel.speed
        
        const x = this.x / this.z
        const y = this.y / this.z
        
        // Longer streak at higher speeds
        const streakLength = this.spaceTravel.speed * 1.5
        const x2 = this.x / (this.z + streakLength)
        const y2 = this.y / (this.z + streakLength)
        
        // Dynamic color based on speed
        const speedRatio = this.spaceTravel.speed / (this.spaceTravel.baseSpeed * 50)
        const color = this.spaceTravel.getColor(speedRatio)
        
        // Thicker lines at higher speeds
        this.spaceTravel.ctx.lineWidth = 1 + speedRatio * 2
        this.spaceTravel.ctx.strokeStyle = color
        this.spaceTravel.ctx.beginPath()
        this.spaceTravel.ctx.moveTo(x, y)
        this.spaceTravel.ctx.lineTo(x2, y2)
        this.spaceTravel.ctx.stroke()
        
        // Glow effect at high speeds
        if (speedRatio > 0.3) {
          this.spaceTravel.ctx.shadowBlur = speedRatio * 20
          this.spaceTravel.ctx.shadowColor = color
          this.spaceTravel.ctx.beginPath()
          this.spaceTravel.ctx.arc(x, y, speedRatio * 2, 0, Math.PI * 2)
          this.spaceTravel.ctx.fillStyle = color
          this.spaceTravel.ctx.fill()
          this.spaceTravel.ctx.shadowBlur = 0
        }
        
        if (x < 0 - this.spaceTravel.halfw || x > this.spaceTravel.halfw || 
            y < 0 - this.spaceTravel.halfh || y > this.spaceTravel.halfh || this.z <= 0) {
          this.reset()
        }
      }
    }

    const spaceTravel = new SpaceTravel(canvas)
    spaceTravel.init()
    spaceRef.current = spaceTravel

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
  }, [])

  // Update space travel speed based on transition
  useEffect(() => {
    if (spaceRef.current && isTransitioning) {
      spaceRef.current.setSpeed(warpSpeed)
    }
  }, [warpSpeed, isTransitioning])

  // Calculate dynamic values for cinematic effect
  const iconScale = isTransitioning ? 1 + transitionProgress * 3 : 1
  const iconBlur = isTransitioning ? transitionProgress * 15 : 0
  const contentOpacity = isTransitioning ? Math.max(0, 1 - transitionProgress * 2) : 1
  const whiteFlashOpacity = isTransitioning && transitionProgress > 0.7 
    ? (transitionProgress - 0.7) * 3.33 
    : 0

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      {/* Space particles canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          background: 'rgb(0, 0, 0)',
          filter: isTransitioning ? `blur(${transitionProgress * 3}px)` : 'none',
          transform: isTransitioning ? `scale(${1 + transitionProgress * 0.5})` : 'scale(1)',
          transition: 'transform 0.1s ease-out'
        }}
      />
      
      {/* Loading content overlay */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center min-h-screen"
        style={{ opacity: contentOpacity }}
      >
        {/* Central icon */}
        <div 
          className="w-48 h-48 md:w-40 md:h-40 flex items-center justify-center mb-8"
          style={{
            transform: `scale(${iconScale}) translateZ(0)`,
            filter: `blur(${iconBlur}px) brightness(${1 + transitionProgress * 2})`,
            transition: 'filter 0.1s ease-out, transform 0.1s ease-out'
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
          <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">
            {loadingProgress}%
          </div>
          
          <div className="text-lg md:text-xl text-gray-300 mb-6 font-light">
            {loadingPhase}
          </div>
          
          <div className="w-80 md:w-96 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Radial speed lines overlay */}
      {isTransitioning && transitionProgress > 0.2 && (
        <div 
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.05) ${transitionProgress * 100}%)`,
            opacity: Math.min(transitionProgress * 2, 1)
          }}
        />
      )}

      {/* White flash effect (arrival moment) */}
      <div 
        className="absolute inset-0 z-40 pointer-events-none bg-white"
        style={{
          opacity: whiteFlashOpacity,
          transition: 'opacity 0.1s ease-out'
        }}
      />

      {/* Final reveal overlay */}
      {isTransitioning && transitionProgress > 0.85 && (
        <div 
          className="absolute inset-0 z-50 pointer-events-none"
          style={{
            background: 'black',
            opacity: (transitionProgress - 0.85) / 0.15
          }}
        />
      )}
    </div>
  )
}


export default LoadingPage;
