import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSupport } from '../../actions/event';

const initialState = {
    name_support: ''
}

const SupportForm = ({ id, addSupport }) => {
    const [formData, setFormData] = useState(initialState);

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        addSupport(id, formData);
    }

    const { name_support } = formData;

    return (
        <form className="p-4 border rounded-lg" onSubmit={onSubmit}>
            <div className="mb-4">
                <input 
                    className="shadow border-gray-400 hover:border-gray-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-3 focus:outline-none focus:shadow-outline"
                    name="name_support"
                    id="name_support" 
                    type="text" 
                    placeholder="Name" 
                    value={name_support}
                    onChange={onChange}
                />
            </div>
            <div className="flex items-center justify-between font-medium text-sm ">
                <button className="p-1 bg-blue-500 rounded-md text-white hover:bg-blue-800 hover:text-gray-200">Add Item</button>
            </div>
        </form>
    )
}

SupportForm.propTypes = {
    addSupport: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    event: state.event
})

export default connect(mapStateToProps, { addSupport } )(SupportForm);