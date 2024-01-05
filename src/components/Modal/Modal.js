import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import "./Modal.css";

const Modal = () => {
  const { isModalOpen, hideModal } = useModal();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!isModalOpen) return null;

  const requestUser = async () => {
    console.log("inside the logout");
    try {
      const request = await fetch(`http://127.0.0.1:8000/auth_app/logout`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });

      if (!request.ok) {
        throw new Error("Response was not ok");
      }

      if (request.status === 204) {
        logout();
        navigate("/login");
        hideModal();
      } else {
        // If the status is not 204, you might want to handle this scenario as well.
        console.log("Logout request returned a non-204 status");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }finally {
        // Perform client-side logout regardless of the server response
        logout();
        navigate("/login");
        hideModal();
      }
  };

  return (
    <div className="myapp-modal">
        <p style={{textAlign: 'center'}}>Are you sure you want to sing out?</p>
      <div className="modal-buttons">
        <button onClick={requestUser}>Yes</button>
        <button onClick={hideModal}>No</button>
      </div>
    </div>
  );
};

export default Modal;
