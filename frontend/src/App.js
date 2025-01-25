import React, { useState, useEffect } from "react";
import axios from "axios"; // Assurez-vous qu'Axios est importé
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import Login from "./components/logibPopup/Login";
import Verify from "./pages/verifiy/Verify";
import MyOrders from "./pages/myorders/MyOrders";
import OrderSummary from "./pages/orderSummary/OrderSummary";

const App = () => {
  const [showLogin, setShowLoginPopup] = useState(false);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  // Function to pause marquee on click
  const handleMarqueeClick = () => {
    setIsMarqueePaused(true); // Pause the animation
    setTimeout(() => {
      setIsMarqueePaused(false); // Resume after 5 seconds
    }, 5000); // 5-second delay
  };

  // Send notification when the site is visited
  useEffect(() => {
    const sendNotification = async () => {
      try {
        await axios.post("https://landry-store.onrender.com/api/twilio/notify", {
          message: `Hello quelqu'un est en train de visiter votre site`,
        });
        console.log("Notification envoyée avec succès !");
      } catch (error) {
        console.error("Erreur lors de l'envoi de la notification :", error);
      }
    };

    sendNotification(); // Appeler la fonction lors du montage du composant
  }, []); // Le tableau vide signifie que l'effet se déclenche une seule fois au montage

  return (
    <>
      <div
        className={`marquee ${isMarqueePaused ? "paused" : ""}`}
        onClick={handleMarqueeClick} // Attach the click event
      >
        <p>
          🎉 Vous pouvez également choisir vos articles et passer votre commande sur notre WhatsApp officiel :
          <a
            href="https://wa.me/237693800251"
            target="_blank"
            rel="noopener noreferrer"
            className="green-link" // Utiliser la classe ici
          >
            693800251
          </a>
          🎉
        </p>
      </div>

      {showLogin ? <Login setShowLoginPopup={setShowLoginPopup} /> : <></>}
      <div className="App">
        <Navbar setShowLoginPopup={setShowLoginPopup} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/order-summary" element={<OrderSummary />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
