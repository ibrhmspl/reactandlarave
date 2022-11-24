import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Auth from "./components/Auth";
import MainPage from './components/MainPage';
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Admin from './components/Admin';
import StoreApplication from './components/StoreApplication';
import StoreManagement from './components/StoreManagement';
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children}) => {
  const isAuthenticated = localStorage.getItem("token");

  if (isAuthenticated ) {
    return children
  } 
  return <Navigate to="/" />
}

function App() {
  const user = JSON.parse(localStorage.getItem('user')) ;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< MainPage/>}/>
        <Route path="/Auth" element={<Auth/>}/> 
        <Route path="/Admin" element={<PrivateRoute><Admin/></PrivateRoute>}/>
        <Route path="/StoreApplication" element={<PrivateRoute><StoreApplication/></PrivateRoute>}/>
        <Route path="/StoreManagement" element={<PrivateRoute><StoreManagement/></PrivateRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
