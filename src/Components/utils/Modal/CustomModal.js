import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  // height: "auto",
  borderRadius: "10px",
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  alignItems: "center",
  aligContent: "center",
  p: 1,
  margin: "auto",
};
const CustomModal = ({ open, handleClose, children }) => {
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}
        >{children}</Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
