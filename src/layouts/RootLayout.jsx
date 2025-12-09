import React from 'react';
import Navbar from '../components/shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
             <Navbar />
      <div className='flex-1'>
        <Outlet />
      </div>
      <Footer />
        </div>
    );
};

export default RootLayout;