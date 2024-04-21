import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import MemoHistory from './pages/MemoHistory.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/history" element={<MemoHistory />} />
            </Routes>
        </Router>
    </React.StrictMode>,
)
