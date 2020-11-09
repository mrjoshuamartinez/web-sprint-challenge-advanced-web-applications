import React, { useState, useEffect } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors)
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${ colorToEdit.id }`, colorToEdit)
      .then(res => {
        // console.log(`saveEdit ()=> : ${ res.data }`);
        setColorToEdit(res.data);
      })
      .catch(err => console.log(`saveEdit Error Return: ${ err }`));
  };

  const deleteColor = color => {
    // console.log(`deleteColor ()=> : ${ color.id }`);
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${ color.id }`)
      .then(res => {
        // console.log(`deleteColor ()=> : ${ res.data }`);
        updateColors(colors.filter(c => c.id !== color.id));
      })
      .catch(err => console.log(`deleteColor ()=> : ${ err }`));
  };

  useEffect(() => {
  
    axiosWithAuth()
      .get(`http://localhost:5000/api/colors`)
      .then(res => {
        //console.log(`useEffect ()=> : ${ res.data }`);
        updateColors(res.data);
      })
      .catch(err => console.log(`useEffect ()=> : ${ err }`));
    }, [colorToEdit]);

    //ADD COLOR FORM
  const [newColor, setNewColor] = useState(initialColor);

  const submit = e => {
    e.preventDefault();
    setNewColor(initialColor);
    axiosWithAuth()
      .post("http://localhost:5000/api/colors", newColor)
      .then(res => {
        // console.log(`addNewColor ()=> : ${ res.data }`);
        updateColors(res.data);
      })
      .catch(err => console.log(`addNewColor ()=> : ${ err }`));
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={ color.color } onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                    e.stopPropagation();
                    deleteColor(color);
                }
              }>
                  x
              </span>{" "}
              { color.color }
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={ saveEdit }>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={ colorToEdit.color }
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
    <div className="button-row" />
      <form onSubmit={submit}>
      <legend>Add new color</legend>
        <label>
          Color Name:
          <input
            name="color"
            type="text"
            value={newColor.color}
            onChange={e => setNewColor({...newColor, color: e.target.value})} />
        </label>
        <label>
          Hex Value:
          <input
            name="code"
            type="text"
            value={newColor.code.hex}
            onChange={e => setNewColor({...newColor, code: {hex: e.target.value}})} />
        </label>
        <button style={{
            marginLeft: '40px',
            width: '100px',
            border: 'none',
            backgroundColor: 'black',
            color: 'white',
            padding: '3px 8px',
            marginTop: '16px',
          }}>add color</button>
      </form>
    </div>
  );
};

export default ColorList;
