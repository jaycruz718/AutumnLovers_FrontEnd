import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
