import React from 'react'

const Footer = () => {
    const currentYear =new Date().getFullYear();
  return (
    <>
    <footer className="fixed bottom-0 left-0 w-full bg-gray-200 text-center py-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-600">
          &copy; {currentYear}. All rights reserved.
        </p>
      </div>
    </footer>
    </>
  )
}

export default Footer
