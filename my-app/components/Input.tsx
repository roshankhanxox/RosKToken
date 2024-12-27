import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function Input({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm text-gray-300">{label}</label>
      <input
        className="px-3 py-2 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 border border-gray-700"
        {...props}
      />
    </div>
  )
}



