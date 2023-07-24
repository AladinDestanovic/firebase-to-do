import React from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "./List.css";
import { db, auth } from "../../config/firebase";
import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const List = () => {
  // states
  const [newTask, setNewTask] = useState("");
  const [items, setItems] = useState([]);
  //
  const collectedItems = collection(db, "todo-list");
  const tasks = async () => {
    try {
      const data = await getDocs(collectedItems);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setItems(filteredData);
      console.log(items);
    } catch (err) {
      console.log(err);
    }
  };
  //
  const navigate = useNavigate();
  useEffect(() => {
    if (auth?.currentUser?.email !== undefined) {
      tasks();
      console.log(auth?.currentUser?.email, "taskPage");
    } else {
      navigate("/login");
    }
  }, []);
  // add fun
  const addTask = async () => {
    try {
      await addDoc(collectedItems, {
        title: newTask,
        userId: auth?.currentUser?.uid,
      });
      tasks();

      console.log("uspesno");
      setNewTask("");
    } catch (err) {
      console.log(err);
    }
  };
  // delete fun
  const deleteTask = async (id) => {
    const taskChoice = doc(db, "todo-list", id);

    try {
      await deleteDoc(taskChoice);
      tasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="list">
        <h2> Add Your Task</h2>
        <div className="header">
          {" "}
          <TextField
            id="filled-basic"
            label="Add Task"
            variant="filled"
            onChange={(e) => setNewTask(e.target.value)}
          />{" "}
          <button className="button" onClick={addTask}>
            +
          </button>
        </div>
        <div className="footer">
          {" "}
          {items.map((item) => (
            <h1
              className="boljiFont"
              onClick={() => {
                deleteTask(item.id);
              }}
            >
              {item.title}
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
};
export default List;
