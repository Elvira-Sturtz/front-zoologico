// components/CustomToast.jsx
import { Toast, ToastContainer } from "react-bootstrap";

const CustomToast = ({ show, message, onClose, variant = "success" }) => {
  return (
    <ToastContainer
      position="top-end"
      className="p-3"
    >
      <Toast
        bg={variant}
        show={show}
        onClose={onClose}
        delay={2000}
        autohide
      >
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CustomToast;
