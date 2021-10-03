import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '450px',
        backgroundColor: '#fff'
    },
};

Modal.setAppElement('#root');

const StudentForm = () => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [studentInfo, setStudentInfo] = useState({})
    const handleBlur = (e) => {
        const newStudentInfo = {...studentInfo, issueDate: new Date().toLocaleDateString()}
        newStudentInfo[e.target.name] = e.target.value;
        setStudentInfo(newStudentInfo)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://warm-thicket-99402.herokuapp.com/addStudent', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentInfo)
        })
        .then( res => res.json())
        .then(result => {
            if(result) {
                alert('Student Added successfully..')
            }
        })
    }

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = "steelBlue";
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div className='text-center'>
            <button className='btn btn-success ' onClick={openModal}>Add Student</button>
            <Modal 
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 className='py-2' ref={(_subtitle) => (subtitle = _subtitle)}>Fill Up The Student Form</h2>
                
                <form onSubmit={handleSubmit}>
                    <input onBlur={handleBlur} className='form-control' type='text' name='name' placeholder=' student-name' required /><br />
                    <input onBlur={handleBlur} className='form-control ' type='text' name='phone' placeholder=' 011578...' required /><br />
                    <input onBlur={handleBlur} className='form-control ' type='email' name='email' placeholder=' example@gmail.com' required /><br />
                    <input onBlur={handleBlur} className='form-control ' type='text' name='hobbies' placeholder=' student-hobbies' required /><br />

                    <div className="d-flex justify-content-around">
                        <button className='btn btn-success px-4'>Save</button>
                        <button onClick={closeModal} className='btn btn-danger px-4'>close</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default StudentForm;