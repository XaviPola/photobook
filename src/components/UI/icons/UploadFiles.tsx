import React from 'react'

const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width='100%' height='100%' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg' fill='white' {...props}>
      <path d='M11.678 20.271C7.275 21.318 4 25.277 4 30C4 35.523 8.477 40 14 40C14.947 40 15.864 39.868 16.733 39.622M36.055 20.271C40.458 21.318 43.732 25.277 43.732 30C43.732 35.523 39.255 40 33.732 40C32.785 40 31.868 39.868 31 39.622M36 20C36 13.373 30.627 8 24 8C17.373 8 12 13.373 12 20M17.065 27.881L24 20.924L31.132 28M24 38V24.462' stroke='black' stroke-width='4' stroke-linecap='round' stroke-linejoin='round' fill='transparent' />
    </svg>
  )
}

export default UploadIcon
