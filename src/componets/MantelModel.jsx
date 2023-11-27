import { Modal } from "@mantine/core";
import "./modal.css";
import InputEmoji from "react-input-emoji";

function MantelModal({
  opened,
  newComment,
  setNewComment,
  setModelOpen,
  submit,
}) {
  return (
    <>
      <Modal
        title="Comment On This Blog Post"
        opened={opened}
        onClose={() => setModelOpen(false)}
        withCloseButton={true}
        size="55%"
      >
        <InputEmoji
          value={newComment}
          shouldReturn
          placeholder="Add a comment"
          onChange={(text) => setNewComment(text)}
        />
        <button onClick={() => submit()} className="comment">
          Comment
        </button>
      </Modal>
    </>
  );
}

export default MantelModal;
