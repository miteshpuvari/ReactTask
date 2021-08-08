import React, { useEffect, useState } from "react";
import { Input, Button, Table, Space, Modal } from "antd";

import "../Dashboard/Dashboard.css";

// get the data from local storage
const grtLocalItems = () => {
  let list = localStorage.getItem("lists");
  console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const Dashboard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const [items, setItems] = useState(grtLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  //   alert(isEditItem);

  const additem = () => {
    if (!name) {
      alert("Name can not blank!!");
    } else if (name) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: name, email: email, number: number };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setName("");
      setIsEditItem(null);
    }

    if (!email) {
      alert("Name can not blank!!");
    } else if (email && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: name, email: email, number: number };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setEmail("");
      setIsEditItem(null);
    }
    if (!number) {
      alert("Number can not Blank!!");
    } else if (number && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: name, email: email, number: number };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setNumber("");
      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: name,
        email: email,
        number: number,
      };
      setItems([...items, allInputData]);
    }
  };

  const deleteItem = (index) => {
    const updateditems = items.filter((elem) => {
      return index !== elem.id;
    });

    setItems(updateditems);
  };

  // add data in local storage
  useEffect(
    () => {
      localStorage.setItem("lists", JSON.stringify(items));
    },
    [items],
    console.log("All data is:", items)
  );

  const editIten = (id) => {
    setIsModalVisible(true);
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    console.log("data for edit", newEditItem);

    setToggleSubmit(false);
    setName(newEditItem.name);
    setEmail(newEditItem.email);
    setNumber(newEditItem.number);
    setIsEditItem(id);
  };

  // table to show data
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space size="middle">
          <p> {record.name}</p>
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "address",
      key: "address",
      render: (text, record) => (
        <Space className="show" size="middle">
          <p> {record.email}</p>
        </Space>
      ),
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      render: (text, record) => (
        <Space size="middle">
          <p> {record.number}</p>
        </Space>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => editIten(record.id)}>Edit</Button>
          <Button onClick={() => deleteItem(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="main-div">
        <Modal
          class="modal"
          id="myModal"
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Input
            className="input"
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            className="input"
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="input"
            type="text"
            placeholder="Mobile no"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <Button className="btn" onClick={additem}>
            Edit
          </Button>
        </Modal>
        <div className="child-div">
          <h1>Dashboard</h1>

          <div className="addItems">
            <Input
              className="input"
              type="text"
              placeholder="name"
              //   value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              className="input"
              type="text"
              placeholder="Enter Email"
              // value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              className="input"
              type="text"
              placeholder="Mobile no"
              // value={number}
              onChange={(e) => setNumber(e.target.value)}
            />

            <Button className="btn" title="Add Item" onClick={additem}>
              Add
            </Button>
          </div>

          <div className="showItems">
            <Table className="table" columns={columns} dataSource={items} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
