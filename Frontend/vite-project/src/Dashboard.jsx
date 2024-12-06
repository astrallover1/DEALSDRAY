
import React from 'react';

import Navbar from './Navbar'

const Dashboard = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#fffcf2] flex items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to the Dashboard!</h1>
    </div>
    </>
    
  );
};

export default Dashboard;
