import React from 'react';
import { Outlet, Link, Navigate } from 'react-router-dom';
import { getToken } from '../../helpers/AuthHelper';
import InvexRoutes from '../../InvexRoutes';

const ProtectedRoute = () => {
  const token = getToken();

  if (!token || token === undefined) {
    return <Navigate to={InvexRoutes.Login.path} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;