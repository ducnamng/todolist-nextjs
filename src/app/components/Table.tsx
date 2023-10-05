"use client";

import { Button } from "react-bootstrap";
import CreateModal from "./create.modal";
import { useState } from "react";
import UpdateModal from "./uppdate.modal";
import Link from "next/link";
import { mutate } from "swr";
import { toast } from "react-toastify";

interface IProps {
  blogs: IBlog[];
}

const TableApp = (props: IProps) => {
  const { blogs } = props;

  const [blog, setBlog] = useState<IBlog | null>(null);
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  console.log(blog);

  const handleDeleteModal = (id: number) => {
    if (confirm("Delete ?") == true) {
      fetch(`http://localhost:8000/blogs/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            toast.error("Delete blog succeed !");
            mutate("http://localhost:8000/blogs");
          }
        });
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0",
        }}
      >
        <h3>TABLE</h3>
        <Button variant="secondary" onClick={() => setShowModalCreate(true)}>
          Add new
        </Button>
      </div>
      <table style={{ width: "100%", margin: "20px 0" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black" }}>No</th>
            <th style={{ border: "1px solid black" }}>Title</th>
            <th style={{ border: "1px solid black" }}>Author</th>
            <th style={{ border: "1px solid black" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((item) => {
            return (
              <tr key={item.id}>
                <td style={{ border: "1px solid black" }}>{item.id}</td>
                <td style={{ border: "1px solid black" }}>{item.title}</td>
                <td style={{ border: "1px solid black" }}>{item.author}</td>
                <td style={{ border: "1px solid black" }}>
                  <Link className="btn btn-primary" href={`/blogs/${item.id}`}>
                    View
                  </Link>
                  <Button
                    variant="warning"
                    className="mx-3"
                    onClick={() => {
                      setBlog(item);
                      setUpdateModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteModal(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CreateModal
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
      />
      <UpdateModal
        updateModal={updateModal}
        setUpdateModal={setUpdateModal}
        blog={blog}
        setBlog={setBlog}
      />
    </>
  );
};
export default TableApp;
