import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const IllustrertInnhold = ({ ikon, ikonAlt, children, liten }) => {
    const classnames = cn({
        illustrertInnhold__ikon: true,
        'illustrertInnhold__ikon--liten': liten,
    });
    return (<div className="illustrertInnhold">
        <div className={classnames}>
            <img src={ikon} alt={ikonAlt} />
        </div>
        <div className="illustrertInnhold__innhold">{children}</div>
    </div>);
};

IllustrertInnhold.propTypes = {
    ikon: PropTypes.string,
    ikonAlt: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    liten: PropTypes.bool,
};

export const IllustrertInnholdGronnHake = (props) => {
    return <IllustrertInnhold {...props} ikon="/sykefravaer/img/svg/kvitteringhake.svg" ikonAlt="Hake" />;
};

export default IllustrertInnhold;
