import React from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from "react-router-dom";
import Footer from '../Footer/Footer';
const Layout = () => {
  return (
    <div>
        <div className="page-wrapper">
            <Header />
            <div className="page-body-wrapper">
                <Sidebar />
                <div className="page-body"><Outlet/></div>
                <Footer />
            </div>
        </div>
    </div>
  )
}

export default Layout