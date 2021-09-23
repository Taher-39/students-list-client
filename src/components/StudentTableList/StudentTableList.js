import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

const StudentTableList = () => {
    const [students, setStudents] = useState([])
    const [singleStudent, setSingleStudent] = useState()
    const [editedStudentInfo, setEditedStudentInfo] = useState({})
    const [checkedItems, setCheckedItems] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/getStudents')
            .then(res => res.json())
            .then(data => {
                setStudents(data)
            })
    }, [])

    //single student update
    const handleEdit = (id) => {
        fetch(`http://localhost:4000/getSingleStudent/${id}`)
            .then(res => res.json())
            .then(data => {
                setSingleStudent(data)
            })
    }

    const handleBlur = (e) => {
        const newChangeInfo = { ...singleStudent, ...editedStudentInfo, editIssueDate: new Date().toLocaleDateString() }
        newChangeInfo[e.target.name] = e.target.value;
        setEditedStudentInfo(newChangeInfo)
    }
    const handleSubmit = () => {
        const id = singleStudent?._id;
        console.log(id)
        fetch(`http://localhost:4000/updateSingleStudent/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedStudentInfo)
        }).then(res => res.json())
          .then(data => {
              if(data) {
                  alert('Updated Successfully...')
              }
          })
    }
    const handleDelete = (id) => {
        if(window.confirm("Are You Sure For Delete..?")) {
            fetch(`http://localhost:4000/studentDelete/${id}`, {
                method: "DELETE"
            })
                .then(data => data.json())
                .then(result => {
                    if (result) {
                        let nowTotalStudents = students.filter(item => item._id !== id);
                        setStudents(nowTotalStudents)
                    }
                })
        }

    }

    const handleChange = (e) => {
        let isChecked = e.target.checked;
        let checkedId = e.target.value;
        if (isChecked){ 
            let singleCheckedItems = students.filter(item => item._id === checkedId);
            let totalClickedInfo = [...checkedItems, singleCheckedItems[0]]

            setCheckedItems(totalClickedInfo)
        }
        else if (isChecked === false) {
           let afterUncheckInfo =  checkedItems.filter(item => item._id !== checkedId);
            setCheckedItems(afterUncheckInfo)
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
                                <td className="form-check">
                                    <input onChange={(e) => handleChange(e)} className="form-check-input" type="checkbox" value={student._id} id="flexCheckDefault" style={{ marginLeft: "15px"}} />
                                </td>
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
                    <input onBlur={handleBlur} className='form-control' type='text' name='name' defaultValue={singleStudent?.name} /><br />
                    <input onBlur={handleBlur} className='form-control' type='text' name='phone' defaultValue={singleStudent?.phone} /><br />
                    <input onBlur={handleBlur} className='form-control' type='email' name='email' defaultValue={singleStudent?.email} /><br />
                    <input onBlur={handleBlur} className='form-control' type='text' name='hobbies' defaultValue={singleStudent?.hobbies} /><br />

                    <button className='btn btn-success'>Save</button>
                </form>
            </div>
        </div>
    );
};

export default StudentTableList;