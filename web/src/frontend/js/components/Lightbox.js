import React from 'react';
import Modal from 'nav-frontend-modal';
import PropTypes from 'prop-types';

const Lightbox = ({ onClose, children }) => {
    const appEl = document.getElementById('maincontent');
    Modal.setAppElement(appEl);
    return (<Modal
        isOpen
        closeButton
        onRequestClose={onClose}>
        {children}
    </Modal>);
};

Lightbox.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
    onClose: PropTypes.func,
};

export default Lightbox;
