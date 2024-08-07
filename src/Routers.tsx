import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AuthenticatedLayout, DefaultLayout, StaffLayout } from './Layouts';
import { ActivationPage, LoginPage, LogoutPage, RegisterPage, RoleSelectionPage } from './Pages/Auth';
import { HomePage, CustomerHomePage, StaffHomePage } from './Pages/Home';
import {
  StaffCategoryListingPage,
  StaffCategoryCreatePage,
  StaffCategoryEditPage,

  StaffProductListingPage,
  StaffProductCreatePage,
  StaffProductEditPage,
  
  StaffPromotionListingPage,
  StaffPromotionCreatePage,
  StaffPromotionUpdatePage,
} from './Pages/Staff';


interface AuthenticatedRouteProps {
  element: React.ReactElement;
  path: string;
}


const Routers: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<AuthenticatedLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="customer" element={<CustomerHomePage />} />
        </Route>

        <Route path="/auth" element={<DefaultLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="activate" element={<ActivationPage />} />
        </Route>

        <Route path="/auth" element={<AuthenticatedLayout />}>
          <Route path="logout" element={<LogoutPage />} />
          <Route path="roles" element={<RoleSelectionPage />} />
        </Route>

        <Route path="/staff" element={<StaffLayout />}>
          <Route index element={<StaffHomePage />} />
          
          <Route path="category/create" element={<StaffCategoryCreatePage />} />
          <Route path="category/update/:id" element={<StaffCategoryEditPage />} />
          <Route path="category" element={<StaffCategoryListingPage />} />

          <Route path="product/create" element={<StaffProductCreatePage />} />
          <Route path="product/update/:id" element={<StaffProductEditPage />} />
          <Route path="product" element={<StaffProductListingPage />} />

          <Route path="promotion/create" element={<StaffPromotionCreatePage />} />
          <Route path="promotion/update/:id" element={<StaffPromotionUpdatePage />} />
          <Route path="promotion" element={<StaffPromotionListingPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default Routers;