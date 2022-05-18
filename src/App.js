import React from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import './App.css';
import LoginPage from "./components/pages/LoginPage/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import {ThemeProvider} from "@material-ui/core";
import {createTheme} from "@material-ui/core/styles";
import MicroservicePage
  from "./components/pages/microservices/MicroservicePage";
import Users from "./components/pages/microservices/Users/Users";
import Songs from "./components/pages/microservices/Songs/Songs";

function App() {

  const globalTheme = React.useMemo(
      () => createTheme({
        palette: {
          primary: {
            main: "#1db954",
          },
          secondary: {
            main: "#5dff95",
          },
          type: 'dark',
        },
      }), []);

  return (
      <BrowserRouter>
        <ThemeProvider theme={globalTheme}>
          <Routes>
            <Route exact path="/login"
                   element={<LoginPage />}
            />
            <Route element={<PrivateRoute/>}>
              <Route exact path="/" element={<MicroservicePage/>}>
                <Route exact path="/users" element={<Users/>}/>
                <Route exact path="/songs" element={<Songs/>}/>
              </Route>
            </Route>

          </Routes>
        </ThemeProvider>
      </BrowserRouter>
  );
}

export default App;
