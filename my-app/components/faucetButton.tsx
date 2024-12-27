import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  loading?: boolean
  success?: boolean
}

export function Button({ children, loading, success, ...props }: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors font-semibold"
  const defaultClasses = "bg-gradient-to-r from-purple-700 to-indigo-800 text-white hover:from-purple-600 hover:to-indigo-700 focus:ring-purple-500"
  const loadingClasses = "bg-gray-600 text-white cursor-not-allowed"
  const successClasses = "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"

  const classes = `${baseClasses} ${success ? successClasses : loading ? loadingClasses : defaultClasses}`

  return (
    <button className={classes} disabled={loading} {...props}>
      {loading ? 'Requesting...' : success ? 'Success!' : children}
    </button>
  )
}

