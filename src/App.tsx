import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AdminProvider } from './context/AdminContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrderPage from './pages/OrderPage';
import CommunityPage from './pages/CommunityPage';
import ContestPage from './pages/ContestPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminInventoryPage from './pages/admin/AdminInventoryPage';
import AdminProfilePage from './pages/admin/AdminProfilePage';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';

function App() {
  return (
    <AppProvider>
      <AdminProvider>
        <Router>
          <Routes>
            <Route path="/admin/login" element={<AdminLoginPage />} />

            <Route
              path="/admin/*"
              element={
                <Routes>
                  <Route
                    path="dashboard"
                    element={
                      <AdminProtectedRoute>
                        <AdminDashboardPage />
                      </AdminProtectedRoute>
                    }
                  />
                  <Route
                    path="orders"
                    element={
                      <AdminProtectedRoute>
                        <AdminOrdersPage />
                      </AdminProtectedRoute>
                    }
                  />
                  <Route
                    path="inventory"
                    element={
                      <AdminProtectedRoute>
                        <AdminInventoryPage />
                      </AdminProtectedRoute>
                    }
                  />
                  <Route
                    path="profile"
                    element={
                      <AdminProtectedRoute>
                        <AdminProfilePage />
                      </AdminProtectedRoute>
                    }
                  />
                </Routes>
              }
            />

            <Route
              path="/*"
              element={
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/order" element={<OrderPage />} />
                      <Route path="/community" element={<CommunityPage />} />
                      <Route path="/contests" element={<ContestPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              }
            />
          </Routes>
        </Router>
      </AdminProvider>
    </AppProvider>
  );
}

export default App;
