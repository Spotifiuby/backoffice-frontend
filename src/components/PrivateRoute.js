import React from 'react';
import {
  Navigate,
  Outlet,
  useLocation, useNavigate
} from 'react-router-dom';

import {authenticationService } from "../services/AuthenticationService";


const PrivateRoute = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const currentUser = authenticationService.currentUserValue;
  if (!currentUser) {
    // not logged in so redirect to login page with the return url
    return <Navigate
        to="/login"
        from={location}/>
  } else {
    authenticationService.isValidSession()
    .catch(err => {
      if ([401, 403].indexOf(err.status) !== -1) {
        authenticationService.logout();
        navigate('/login', { from: location })
      } else {
        console.log(err);
      }
    });
  }

  // authorised so return component
  return <Outlet/>;
}
export default PrivateRoute;