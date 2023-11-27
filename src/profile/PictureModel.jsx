import React from "react";
import { Modal } from "@mantine/core";


function PictureModel({imageModal,imageName,handleUpdateImage,setImageModal,setImageName}) {
  return (
    <Modal
      size={1000}
      title="Preview Image"
      opened={imageModal}
      onClose={imageModal}
    >
      {imageName && console.log(imageName)}
      {imageName && (
        <img
          style={{ width: "100%", height: "300px", objectFit: "contain" }}
          src={URL.createObjectURL(imageName)}
          alt={imageName}
        />
      )}
      <div className="modal_btns">
        <button
          onClick={() => {
            setImageModal(false);
            setImageName("");
          }}
        >
          Close
        </button>
        <button onClick={handleUpdateImage}>Done</button>
      </div>
    </Modal>
  );
}

export default PictureModel;
