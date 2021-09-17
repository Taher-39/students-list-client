import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

const StudentTableList = () => {
    const [students, setStudents] = useState([])
    const [singleStudent, setSingleStudent] = useState()

    useEffect(() => {
        fetch('http://localhost:4000/getStudents')
            .then(res => res.json())
            .then(data => setStudents(data))
    }, [students])

    //single student update
    const handleEdit = (id) => {
        fetch(`http://localhost:4000/getSingleStudent/${id}`)
            .then(res => res.json())
            .then(data => setSingleStudent(data))
    }

    const handleSubmit = () => {
        alert('hi')
    }
    const handleDelete = (id) => {
        if(window.confirm("Are You Sure For Delete..?")) {
            fetch(`http://localhost:4000/studentDelete/${id}`, {
                method: "DELETE"
            })
                .then(data => data.json())
                .then(result => {
                    if (result) {
                        alert('Student Deleted Successfully...')
                    }
                })
        }

    }
    return (
        <div>
            <table className='table table-borderless'>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Hobbies</th>
                        <th>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((student, index) => 
                            <tr key={student._id}>
                                <td>select</td>
                                <td>{index + 1}</td>
                                <td>{student.name}</td>
                                <td>{student.phone}</td>
                                <td>{student.email}</td>
                                <td>{student.hobbies}</td>
                                <td>
                                    <span onClick={() => handleDelete(student._id)} >
                                        <MdDeleteForever className='icon' />
                                    </span>

                                    <span onClick={() => handleEdit(student._id)}>
                                        <FaEdit  className='edit-icon icon' />
                                    </span>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

            <div className="edit-student pt-5 container px-5">
                <h2>Edit The Student Form</h2>
                <form onSubmit={handleSubmit}>
                    <input className='form-control ' type='text' name='name' defaultValue={singleStudent?.name} /><br />
                    <input className='form-control ' type='text' name='phone' defaultValue={singleStudent?.phone} /><br />
                    <input className='form-control ' type='email' name='email' defaultValue={singleStudent?.email} /><br />
                    <input className='form-control ' type='text' name='hobbies' defaultValue={singleStudent?.hobbies} /><br />

                    <button className='btn btn-success'>Save</button>
                </form>
            </div>
        </div>
    );
};

export default StudentTableList;