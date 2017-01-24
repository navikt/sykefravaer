import React, { PropTypes } from 'react';

const Knapperad = ({ children, variant }) => {
    return (<div className={`knapperad ${variant}`}>
    {
        children.map((child, index) => {
            return <div key={index} className="knapperad__element">{child}</div>;
        })
    }
    </div>);
};

Knapperad.propTypes = {
    children: PropTypes.array,
    variant: PropTypes.string,
};

export default Knapperad;
