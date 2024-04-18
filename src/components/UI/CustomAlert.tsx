import React, { useState, useEffect } from 'react'
import type { CSSProperties } from 'react'

interface CustomAlertProps {
  open: boolean
  title: string
  message: string
  onClose: () => void
  timeout: number
  parentId: string
}

const CustomAlert: React.FC<CustomAlertProps> = ({ open, title, message, onClose, timeout, parentId }) => {
  const [position, setPosition] = useState({ top: '50%', left: '50%' })
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      const parentRect: DOMRect = document.getElementById(parentId).getBoundingClientRect()

      setPosition({
        top: `${parentRect.top + parentRect.height / 2}px`,
        left: `${parentRect.left + parentRect.width / 2}px`
      })
    }

    if (open) {
      setIsVisible(true)
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose()
      }, timeout * 0.7)
      return () => clearTimeout(timer)
    }
  }, [open])

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose()
      }, timeout)
      return () => clearTimeout(timer)
    }
  }, [open, onClose, timeout])

  if (!open) return null

  const inlineContainerStyles: CSSProperties = {
    maxWidth: '75vh',
    width: 'auto',
    height: 'auto',
    position: 'relative',
    top: position.top,
    left: position.left,
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    zIndex: '1001',
    display: 'inline-block',
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out 0.1s'
  }

  const inlineBGStyles: CSSProperties = {
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    position: 'absolute',
    background: 'rgba(50,50,50,0.9)',
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out'
  }

  return (
    <div style={inlineBGStyles}>
      <div style={inlineContainerStyles}>
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default CustomAlert
