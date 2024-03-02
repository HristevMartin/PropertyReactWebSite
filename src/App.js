import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import PropertyListing from "./components/PropertyListing/PropertyListing";
import Register from "./components/Register/Register";
import { AuthContextProvider, useAuth } from "./context/AuthContext";
import AuthCallbackComponent from "./AuthCallbackComponent/AuthCallbackComponent";
import { ModalProvider } from "./context/ModalContext";
import Modal from "./components/Modal/Modal";
import PropertyDetails from "./components/PropertyDetail/PropertyDetail";
import HomePage from "./components/Home/HomePage";
import Header from "./components/Header/Header";
import AboutUs from "./components/AboutUs/AboutUs";
import Login from "./components/Login/Login";
import Contact from "./components/Contact/Contact";
import Sample from "./components/Sample/Sample";
import { PrivateRoute } from "./components/Common/Common";
// This should be imported before any component that uses Font Awesome icons


function App() {
  return (
    <ModalProvider>
      <AuthContextProvider>
        <div className="App">
          <Header />
          <div className="main-body">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/listings" element={<PropertyListing />} />
                <Route path="/auth" element={<AuthCallbackComponent />} />
                <Route path="/item-property-detail/:id" element={<PropertyDetails />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/sample" element={<Sample />} />
              </Route>
            </Routes>
          </div>
          <Footer />
          <Modal />
        </div>
      </AuthContextProvider>
    </ModalProvider>
  );
}

export default App;
