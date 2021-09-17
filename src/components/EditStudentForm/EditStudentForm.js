import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';

const EditStudentForm = ({ id }) => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [singleStudent, setSingleStudent] = useState()

    //single student update
    const handleEdit = () => {
        alert(id)
        fetch(`http://localhost:4000/getSingleStudent/${id}`)
            .then(res => res.json())
            .then(data => setSingleStudent(data))
    
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        alert("clicked")
    }
   
    console.log(singleStudent)
    return (
        <div className='text-center d-inline'>
            <FaEdit onClick={handleEdit} className='edit-icon icon' />
           
                <h2>Edit The Student Form</h2>

                <form onSubmit={handleSubmit}>
                    <input className='form-control ' type='text' name='name' required   /><br />
                    <input className='form-control ' type='text' name='phone' required   /><br />
                    <input className='form-control ' type='email' name='email'  required   /><br />
                    <input className='form-control ' type='text' name='hobbies'  required   /><br />

                    <div className="d-flex justify-content-around">
                        <button className='btn btn-info'>Save</button>
                        <button className='btn btn-danger'>close</button>
                    </div>
                </form>
        </div>
    );
};

export default EditStudentForm;