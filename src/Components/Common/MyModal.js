import { Modal } from 'react-bootstrap';
import React from 'react'

const MyModal = (props) => {
    const { children, handleClose, show,title } = props

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
            <Modal.Header closeButton>
                <Modal.Title> {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
                
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary">Save</Button>
            </Modal.Footer> */}
        </Modal>
    )
}
export default MyModal