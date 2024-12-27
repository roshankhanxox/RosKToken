import React from 'react'

interface GlowingTextProps {
  children: React.ReactNode
  className?: string
}

export function GlowingText({ children, className = '' }: GlowingTextProps) {
  return (
    <h2 className={`text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse ${className}`}>
      {children}
    </h2>
  )
}

