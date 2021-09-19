import React from 'react';
import StudentForm from '../StudentForm/StudentForm';
import StudentTableList from '../StudentTableList/StudentTableList';

const Home = () => {
    return (
        <div>
            <h3 className='py-4 text-center'>Welcome Our Students-List</h3>
            <StudentForm></StudentForm>
            <div className="container px-3 pt-4">
                <StudentTableList></StudentTableList>
            </div>
        </div>
    );
};

export default Home;