import React, { useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {

  const [selectedMenu, setSelectedMenu] = useState(null);

  console.log(selectedMenu)
  return (
    <div>
      <AppSidebar selectedMenu={selectedMenu} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader setSelectedMenu={setSelectedMenu} />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
