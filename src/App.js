import axios from "axios";
import { useState, useEffect } from "react";
import FormInput from "./components/FormInput";
import Item from "./components/Item";
import fakeData from "./fakeData";

function App() {
  const [values, setValues] = useState({
    name: "",
    price: 0
  })

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name of Item",
      label: "Name",
      errorMessage: "Name of item should be 3-16 characters and shouldn't include any special character! Spaces are allowed.",
      pattern: "^[A-Za-z0-9 ]{3,16}",
      required: true
    },
    {
      id: 2,
      name: "price",
      type: "number",
      placeholder: "Price",
      label: "Price",
      errorMessage: "Price of item should only contain numbers from 0-9 and two numbers after decimal point '.'",
      pattern: "^[0-9][0-9]*(\.[0-9]{1,2})?$",
      required: true
    }
  ]

  const [items, setItems] = useState([])
  const [toggle, setToggle] = useState(false);
  const [showForm, setShowForm] = useState(false)
  const [itemId, setItemId] = useState('')
  // Actions: add, update, delete
  const [action, setAction] = useState('')
  const fake = false

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:5000/")
      setItems(data)
    }
    if (fake) {
      setItems(fakeData)
    }
    else {
      fetchData()
    }

  }, [toggle]);

  const itemToUpdate = (item) => {
    setValues({ ...values, name: item.name, price: item.price })
    setItemId(item.id)
    setShowForm(true)
    setAction('update')
  }

  const refresh = () => {
    setToggle(prevState => !prevState)
    setShowForm(false)
  }

  const handleAddBtn = () => {
    setShowForm((prev) => !prev)
    setValues({ ...values, name: "", price: 0 })
    setAction('add');
  }

  const addItem = (data) => {
    axios.post("http://localhost:5000/create", data).then((res) => refresh())
  }

  const updateItem = (data) => {
    axios.post("http://localhost:5000/update", data).then((res) => refresh())
  }

  const deleteItem = (id) => {
    setAction('delete')
    const itemToDelete = {
      id: id
    }
    axios.post("http://localhost:5000/delete", itemToDelete).then((res) => refresh())
  }

  const chooseAction = (e) => {
    e.preventDefault()
    if (action === "add") {
      const newItem = {
        name: values.name,
        price: values.price
      }
      addItem(newItem)
    }

    if (action === "update") {
      const updatedItem = {
        id: itemId,
        name: values.name,
        price: values.price
      }
      updateItem(updatedItem)
    }
  }


  return (
    <div className="app">
      {
        showForm && (
          <div className="form">
            <p onClick={() => setShowForm(false)}>X</p>
            <form id="form1" onSubmit={(e) => chooseAction(e)}>
              {
                inputs.map(input => (
                  <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
                ))
              }
              <button>
                {action === 'add' ? "Add" : "Update"}
              </button>
            </form>

          </div>

        )
      }

      <div className="nav">
        <h1 className="title">Uncle Jack's MiniMart</h1>
        <button onClick={() => handleAddBtn()}>Add New Item</button>
      </div>

      <div className="container">
        {
          items?.map(item => (
            <Item item={item} key={item?.id} itemToUpdate={itemToUpdate} deleteItem={deleteItem} />
          ))
        }
      </div>
    </div>
  );
}

export default App;
