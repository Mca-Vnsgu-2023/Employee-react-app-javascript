import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import MyForm from './MyForm'
import MyModal from './Common/MyModal';

const AddModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>

            <div className="container">
                <Button variant="primary" onClick={handleShow}>
                    Add Employee
                </Button>
                <button style={{ float: 'right' }}><FaSearch /></button>
                <input style={{ float: 'right' }} type="text" placeholder="Search Here.." />
                <MyModal show={show} handleClose={handleClose} title={'Add Employe'}>
                    <MyForm />
                </MyModal>
            </div>
        </>
    );

}
export default AddModal