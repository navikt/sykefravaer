import React from 'react';

import { koronameldingSvg } from '../svg/koronameldingSvg';

const FormHeaderIcon = () => {
    return (
        <div style={{
            height: '66px',
            width: '66px',
            position: 'absolute',
            left: '50%',
            marginLeft: '-33px',
            marginTop: '-66px',
        }}>
            <img src={koronameldingSvg} alt="Ikon" />
        </div>
    );
};

export default FormHeaderIcon;
