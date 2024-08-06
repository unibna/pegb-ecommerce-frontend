import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AuthenticatedLayout, DefaultLayout, StaffLayout } from './Layouts';
import { LoginPage, LogoutPage, RegisterPage, RoleSelectionPage } from './Pages/Auth';
import { HomePage, CustomerHomePage, StaffHomePage } from './Pages/Home';
import {
  StaffCategoryListingPage,
  StaffProductListingPage,
  StaffPromotionListingPage,
} from './Pages/Staff';


interface AuthenticatedRouteProps {
  element: React.ReactElement;
  path: string;
}


const Routers: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<DefaultLayout />}>
          <Route path="" element={<HomePage />} />
        </Route>

        <Route path="/" element={<AuthenticatedLayout />}>
          <Route path="customer" element={<CustomerHomePage />} />
        </Route>

        <Route path="/auth" element={<DefaultLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="/auth" element={<AuthenticatedLayout />}>
          <Route path="logout" element={<LogoutPage />} />
          <Route path="roles" element={<RoleSelectionPage />} />
        </Route>

        <Route path="/staff" element={<StaffLayout />}>
          <Route index element={<StaffHomePage />} />
          <Route path="category" element={<StaffCategoryListingPage />} />
          <Route path="product" element={<StaffProductListingPage />} />
          <Route path="promotion" element={<StaffPromotionListingPage />} />
        </Route>

      </Routes>

      {/*<Route path="/files" element={<MultiContentLayout />}>
          <Route path="merge/:fileId" element={<FileMergePage />} />
        </Route>*/}
    </BrowserRouter>
  );
};

export default Routers;