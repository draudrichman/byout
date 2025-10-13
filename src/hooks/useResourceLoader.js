import { useState, useEffect, useCallback } from 'react'

const useResourceLoader = () => {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingPhase, setLoadingPhase] = useState('Initializing...')
  const [isComplete, setIsComplete] = useState(false)

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }

  const loadFont = (fontFamily) => {
    return new Promise((resolve) => {
      if (document.fonts && document.fonts.load) {
        document.fonts.load(`16px ${fontFamily}`).then(() => {
          resolve()
        }).catch(() => {
          // Font loading failed, but continue
          resolve()
        })
      } else {
        // Fallback for browsers without Font Loading API
        setTimeout(resolve, 100)
      }
    })
  }

  const loadResources = useCallback(async () => {
    const phases = [
      { name: 'Initializing...', progress: 5 },
      { name: 'Loading fonts...', progress: 15 },
      { name: 'Loading images...', progress: 40 },
      { name: 'Loading components...', progress: 70 },
      { name: 'Finalizing...', progress: 95 },
      { name: 'Complete', progress: 100 }
    ]

    try {
      // Phase 1: Initialize
      setLoadingPhase(phases[0].name)
      setLoadingProgress(phases[0].progress)
      await new Promise(resolve => setTimeout(resolve, 200))

      // Phase 2: Load fonts
      setLoadingPhase(phases[1].name)
      setLoadingProgress(phases[1].progress)
      
      const fontsToLoad = [
        'Ethnocentric Rg',
        'MFYueHei_Noncommercial-Regular',
        'Inter',
        'system-ui'
      ]
      
      await Promise.allSettled(fontsToLoad.map(font => loadFont(font)))
      
      // Simulate font loading progress
      for (let i = 15; i <= 25; i += 2) {
        setLoadingProgress(i)
        await new Promise(resolve => setTimeout(resolve, 50))
      }

      // Phase 3: Load critical images
      setLoadingPhase(phases[2].name)
      setLoadingProgress(phases[2].progress)
      
      const criticalImages = [
        '/logo.svg',
        '/globe.svg',
        '/prism-logo.webp',
        '/logo-1.webp',
        '/logo-2.webp'
      ]
      
      const imagePromises = criticalImages.map(src => loadImage(src))
      
      // Track image loading progress
      let loadedImages = 0
      const totalImages = imagePromises.length
      
      const updateImageProgress = () => {
        const progress = 25 + (loadedImages / totalImages) * 30
        setLoadingProgress(Math.min(progress, 55))
      }
      
      imagePromises.forEach(promise => {
        promise.then(() => {
          loadedImages++
          updateImageProgress()
        }).catch(() => {
          loadedImages++
          updateImageProgress()
        })
      })
      
      await Promise.allSettled(imagePromises)

      // Phase 4: Load components (simulated)
      setLoadingPhase(phases[3].name)
      setLoadingProgress(phases[3].progress)
      
      // Simulate component loading
      for (let i = 55; i <= 75; i += 5) {
        setLoadingProgress(i)
        await new Promise(resolve => setTimeout(resolve, 100))
      }

      // Phase 5: Finalize
      setLoadingPhase(phases[4].name)
      setLoadingProgress(phases[4].progress)
      
      // Simulate finalization
      for (let i = 75; i <= 95; i += 5) {
        setLoadingProgress(i)
        await new Promise(resolve => setTimeout(resolve, 80))
      }

      // Complete
      setLoadingPhase(phases[5].name)
      setLoadingProgress(phases[5].progress)
      setIsComplete(true)

    } catch (error) {
      console.warn('Resource loading error:', error)
      // Continue even if some resources fail
      setLoadingPhase('Complete')
      setLoadingProgress(100)
      setIsComplete(true)
    }
  }, [])

  useEffect(() => {
    loadResources()
  }, [loadResources])

  return {
    loadingProgress,
    loadingPhase,
    isComplete
  }
}

export default useResourceLoader
