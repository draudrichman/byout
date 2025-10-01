'use client'

import { useState, useEffect, useRef } from 'react'

const DecryptedText = ({
  text,
  className = '',
  decryptSpeed = 50
}) => {
  const [displayText, setDisplayText] = useState(text)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

  const encryptText = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    let iteration = 0
    
    intervalRef.current = setInterval(() => {
      setDisplayText(() => 
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) {
              return text[index]
            }
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join('')
      )
      
      if (iteration >= text.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        setDisplayText(text)
        setIsAnimating(false)
      }
      
      iteration += 1 / 3
    }, decryptSpeed)
  }

  const resetText = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsAnimating(false)
    setDisplayText(text)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className={`font-mono tracking-wide cursor-pointer select-none ${className}`}
      onMouseEnter={encryptText}
      onMouseLeave={resetText}
    >
      {displayText}
    </div>
  )
}

export default DecryptedText
