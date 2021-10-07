import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

const StudentTableList = () => {
    const [students, setStudents] = useState([])
    const [singleStudent, setSingleStudent] = useState()
    const [editedStudentInfo, setEditedStudentInfo] = useState({})
    const [checkedItems, setCheckedItems] = useState([])

    console.log(checkedItems);

    useEffect(() => {
        fetch('https://warm-thicket-99402.herokuapp.com/getStudents')
            .then(res => res.json())
            .then(data => {
                setStudents(data)
            })
    }, [])

    //single student update
    const handleEdit = (id) => {
        fetch(`https://warm-thicket-99402.herokuapp.com/getSingleStudent/${id}`)
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
    const handleSubmit = (e) => {
        e.preventDefault();
        const id = singleStudent?._id;
        console.log(id)
        fetch(`https://warm-thicket-99402.herokuapp.com/updateSingleStudent/${id}`,{
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
            fetch(`https://warm-thicket-99402.herokuapp.com/studentDelete/${id}`, {
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

    // const sendData = () => {
    //     // emailjs.sendForm('gmail', 'template_ahvuraj', form.current, 'user_qIOggWJAfNpWPz2P2SgaG')
    //     //     .then((result) => {
    //     //         console.log(result.text);
    //     //     }, (error) => {
    //     //         console.log(error.text);
    //     //     });
    // }
        
    return (
        <div>
            {/* <button className='btn btn-warning ' onClick={sendData}>Send Student Data</button> */}
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