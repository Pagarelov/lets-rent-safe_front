// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';

import HomePage from './pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import ProjectPage from './pages/ProjectPage/ProjectPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import ForDevelopersPage from './pages/ForDevelopersPage/ForDevelopersPage';
import AboutPage from './pages/AboutPage/AboutPage';
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";

function App() {
    useEffect(() => {
        document.body.classList.remove('js-loading');
    }, []);

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/project/:projectId" element={<ProjectPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/developers" element={<ForDevelopersPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Layout>
    );
}

export default App;