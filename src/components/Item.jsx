import React from 'react'

function Item({ item, itemToUpdate, deleteItem }) {
    return (
        <div className="card">
            <div className="content">
                <div className="contentBx">
                    <h3>{item?.name}
                    <br />
                    <span>${(+item?.price).toFixed(2)}</span>
                    <br />
                    <span>ID: {item?.id.slice(0, 8)}</span> 
                    </h3>
                </div>
            </div>
            <ul className="sci">
                <li>
                    <p onClick={() => itemToUpdate(item)}>Edit</p>
                </li>
                <li>
                    <p onClick={() => deleteItem(item.id)}>Delete</p>
                </li>
            </ul>
        </div>
    )
}

export default Item