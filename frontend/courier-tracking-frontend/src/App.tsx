import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard.tsx';
import Couriers from './pages/Couriers.tsx';
import CourierDetail from './pages/CourierDetail.tsx';
import MainLayout from './layout/MainLayout.tsx';

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path={'/couriers'} element={<Couriers />}></Route>
          <Route path="/couriers/detail/:courierId" element={<CourierDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
