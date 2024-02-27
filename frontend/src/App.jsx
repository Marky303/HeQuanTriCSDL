import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importing provider to "provide" information to all components in the application
import { AuthProvider } from './context/UserauthContext';

// Importing main page
import Home from './pages/Home';

// Importing userath related pages
import Login from './pages/userauth/Login';
import Signup from './pages/userauth/Signup';
import Activate from './pages/userauth/Activate';
import ResetPassword from './pages/userauth/ResetPassword';
import ResetPasswordConfirm from './pages/userauth/ResetPasswordConfirm';

// Importing 404 page
import PageNotFound from './pages/error/PageNotFound';

// Layout for website 
import Layout from './hocs/Layout.jsx';

// Include/setup all pages in application wrapper/router
const App = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<AuthProvider />}>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />}/>
                    <Route exact path="/login"                                element={<Login />}/>
                    <Route exact path="/signup"                               element={<Signup />}/>
                    <Route exact path="/activate/:uid/:token"                 element={<Activate />}/>
                    <Route exact path="/resetpassword"                        element={<ResetPassword />}/>
                    <Route exact path="/password/reset/confirm/:uid/:token"   element={<ResetPasswordConfirm />}/>
                </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </BrowserRouter>
);

export default App;