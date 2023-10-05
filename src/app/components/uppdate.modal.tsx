"use client";

import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface IProps {
  updateModal: boolean;
  setUpdateModal: (value: boolean) => void;
  blog: IBlog | null;
  setBlog: (value: IBlog | null) => void;
}

const UpdateModal = (props: IProps) => {
  const { updateModal, setUpdateModal, blog, setBlog } = props;
  // console.log(blog);

  const [title, setTitle] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (blog && blog.id) {
      setId(blog.id);
      setAuthor(blog.author);
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, [blog]);

  const handleCloseModal = () => {
    setUpdateModal(false);
    setBlog(null);
    setTitle("");
    setAuthor("");
    setContent("");
  };

  const handleSubmit = () => {
    fetch(`http://localhost:8000/blogs/${id}`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ title, author, content }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          toast.warning("Update blog succeed !");
          handleCloseModal();
          mutate("http://localhost:8000/blogs");
        }
      });
  };

  return (
    <>
      <Modal
        show={updateModal}
        onHide={() => handleCloseModal()}
        backdrop="static"
        z
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="email"
                placeholder="..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="email"
                placeholder="..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Close
          </Button>
          <Button variant="warning" onClick={() => handleSubmit()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateModal;
