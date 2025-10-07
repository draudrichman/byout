import { useEffect, useRef, useState } from 'react'

const LoadingPage = ({ onComplete, duration = 3000 }) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const spaceRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Space particles animation class
    class Space {
      constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.particles = []
        this.ratio = window.innerHeight < 400 ? 0.6 : 1
        this.r = 120
        this.counter = 0
      }

      init() {
        this.createElement()
        this.loop()
      }

      createElement() {
        const scale = this.ratio
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.canvas.style.width = '100%'
        this.canvas.style.background = 'rgb(0, 0, 0)'
        this.ctx.transform(scale, 0, 0, -scale, this.canvas.width / 2, this.canvas.height / 2)
        
        for (let i = 0; i < 450; i++) {
          this.createParticle()
        }
      }

      createParticle() {
        this.particles.push({
          color: Math.random() > 0.5 ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.4)",
          radius: Math.random() * 5,
          x: Math.cos(Math.random() * 7 + Math.PI) * this.r,
          y: Math.sin(Math.random() * 7 + Math.PI) * this.r,
          ring: Math.random() * this.r * 3,
          move: ((Math.random() * 4) + 1) / 500,
          random: Math.random() * 7
        })
      }

      moveParticle(p) {
        p.ring = Math.max(p.ring - 1, this.r)
        p.random += p.move
        p.x = Math.cos(p.random + Math.PI) * p.ring
        p.y = Math.sin(p.random + Math.PI) * p.ring
      }

      resetParticle(p) {
        p.ring = Math.random() * this.r * 3
        p.radius = Math.random() * 5
      }

      disappear(p) {
        if (p.radius < 0.8) {
          this.resetParticle(p)
        }
        p.radius *= 0.994
      }

      draw(p) {
        this.ctx.beginPath()
        this.ctx.fillStyle = p.color
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        this.ctx.fill()
      }

      loop() {
        this.ctx.clearRect(-this.canvas.width, -this.canvas.height, this.canvas.width * 2, this.canvas.height * 2)
        if (this.counter < this.particles.length) {
          this.counter++
        }
        
        // Uncomment for glow effect (slower performance)
        // this.ctx.shadowBlur = 20
        // this.ctx.shadowColor = "#fff"
        
        for (let i = 0; i < this.counter; i++) {
          this.disappear(this.particles[i])
          this.moveParticle(this.particles[i])
          this.draw(this.particles[i])
        }
        
        this.animationId = requestAnimationFrame(this.loop.bind(this))
      }

      destroy() {
        if (this.animationId) {
          cancelAnimationFrame(this.animationId)
        }
      }
    }

    // Initialize space animation
    const space = new Space(canvas)
    space.init()
    spaceRef.current = space

    // Auto-complete after duration
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete()
      }
    }, duration)

    // Handle window resize
    const handleResize = () => {
      space.destroy()
      const newSpace = new Space(canvas)
      newSpace.init()
      spaceRef.current = newSpace
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer)
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
      
      {/* Loading content overlay - Just the icon */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        {/* Central icon */}
        <div className="w-48 h-48 md:w-40 md:h-40 flex items-center justify-center">
          <svg 
            className="w-full h-full " 
            viewBox="0 0 957 842" 
            xmlns="http://www.w3.org/2000/svg"
            // style={{ animationDuration: '3s' }}
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
      </div>
    </div>
  )
}

export default LoadingPage