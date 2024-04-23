import React from 'react'
import type { CSSProperties } from 'react'

interface BackgroundProps {
  color: string
}

const Background: React.FC<BackgroundProps> = ({ color }) => {
  const backgroundStyles: CSSProperties = {
    backgroundColor: color,
    opacity: 0.15,
    position: 'absolute',
    boxSizing: 'border-box',
    margin: 0,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    filter: 'blur(7px)'
  }

  return (
    <div style={backgroundStyles} />
  )
}

export default Background
