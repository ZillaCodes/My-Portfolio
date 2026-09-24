import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';
const Site = lazy(() => import('./pages/Site'));
const Admin = lazy(() => import('./pages/Admin'));
createRoot(document.getElementById('root')!).render(<React.StrictMode><BrowserRouter><Suspense fallback={<main className="loading">Loading…</main>}><Routes><Route path="/admin/*" element={<Admin/>}/><Route path="/*" element={<Site/>}/></Routes></Suspense></BrowserRouter></React.StrictMode>);
