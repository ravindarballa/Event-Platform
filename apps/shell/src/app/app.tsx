import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import { Navbar } from '@event-platform/shared-ui';

const Hallbooking = lazy(() => import('hallbooking/Module'));
const Photography = lazy(() => import('photography/Module'));

export function App() {
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/hallbooking', label: 'Hallbooking' },
    { path: '/photography', label: 'Photography' },
  ];
  return (
    <BrowserRouter>
      <Navbar  links={navLinks} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          {/* Wildcard /* is mandatory here */}
          <Route path="/hallbooking/*" element={<Hallbooking />} />
          <Route path="/photography/*" element={<Photography />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
