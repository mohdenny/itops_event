import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItem } from '../../actions/event';

const initialState = {
    name_item: '',
    fa: '',
    brand: '',
    type: '',
    quantity: ''
}

const ItemForm = ({ id, addItem }) => {
    const [formData, setFormData] = useState(initialState);

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        addItem(id, formData);
    }

    const {
        name_item,
        fa,
        brand,
        type,
        quantity
    } = formData;

    return (
        <form className="p-4 border rounded-lg bg-white" onSubmit={onSubmit}>
            <div className="grid grid-cols-5 gap-4">
                <div className="mb-4">
                    <input 
                        className="shadow border-gray-400 hover:border-gray-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3 focus:outline-none focus:shadow-outline"
                        name="name_item"
                        id="name_item" 
                        type="text" 
                        placeholder="Item Name" 
                        value={name_item}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-4">
                    <input 
                        className="shadow border-gray-400 hover:border-gray-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3 focus:outline-none focus:shadow-outline"
                        name="fa"
                        id="fa" 
                        type="text" 
                        placeholder="FA / SN" 
                        value={fa}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-4">
                    <input 
                        className="shadow border-gray-400 hover:border-gray-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3 focus:outline-none focus:shadow-outline"
                        name="brand"
                        id="brand" 
                        type="text" 
                        placeholder="Brand" 
                        value={brand}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-4">
                    <input 
                        className="shadow border-gray-400 hover:border-gray-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3 focus:outline-none focus:shadow-outline"
                        name="type"
                        id="type" 
                        type="text" 
                        placeholder="Type" 
                        value={type}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-4">
                    <input 
                        className="shadow border-gray-400 hover:border-gray-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3 focus:outline-none focus:shadow-outline"
                        name="quantity"
                        id="quantity" 
                        type="text" 
                        placeholder="Quantity" 
                        value={quantity}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className="flex items-center justify-between font-medium text-sm ">
                <button className="p-1 bg-blue-500 rounded-md text-white hover:bg-blue-800 hover:text-gray-200">Add Item</button>
            </div>
        </form>
    )
}

ItemForm.propTypes = {
    addItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    event: state.event
})

export default connect(mapStateToProps, { addItem } )(ItemForm);