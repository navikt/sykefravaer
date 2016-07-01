import React, { PropTypes } from 'react';
import { getLedetekst } from '../ledetekster';
import TidslinjeBoble from './TidslinjeBoble.js';

const Ikon = ({ type }) => {
    const status = {
        statusClassName: 'milepael-status-klokke',
        ikonClassName: 'milepael-ikon-klokke',
        ikon: 'klokke-svart.svg',
        alt: '',
    };
    if (type === 'START') {
        status.statusClassName = 'milepael-status-start';
        status.ikonClassName = 'milepael-ikon-start';
        status.ikon = 'hake-hvit.svg';
    }
    return (<div className={`milepael-ikon ${status.ikonClassName}`}>
            <img src={`/sykefravaer/img/svg/${status.ikon}`} alt={status.alt} />
        </div>);
};

Ikon.propTypes = {
    type: PropTypes.string,
    children: PropTypes.object,
};

const Status = ({ children }) => {
    return (<div className="milepael-status">
        {children}
    </div>);
};

Status.propTypes = {
    type: PropTypes.string,
    children: PropTypes.object,
};

const Innhold = ({ children }) => {
    return (<div className="milepael-innhold">
        {children}
    </div>);
};

Innhold.propTypes = {
    children: PropTypes.object,
};

const Hendelse = (props) => {
    // Under arbeid, men forhåpentligvis en start...
    return (<article className="milepael" ref="milepael">
        <Status type={props.type}>
            <Ikon type={props.type} />
        </Status>
        <Innhold>
            <div>
                <div className="milepael-meta">
                    <h2>{getLedetekst(`${props.ledetekst}.meta`, props.ledetekster)}</h2>
                </div>
                <TidslinjeBoble {...props} />
            </div>
        </Innhold>
    </article>);
};

Hendelse.propTypes = {
    erApen: PropTypes.bool,
    ledetekst: PropTypes.string,
    ledetekster: PropTypes.object,
    bilde: PropTypes.string,
    alt: PropTypes.string,
    type: PropTypes.string,
    setHendelseState: PropTypes.func,
    hoyde: PropTypes.string,
    visBudskap: PropTypes.bool,
    medAnimasjon: PropTypes.bool,
    hindreToggle: PropTypes.bool,
};

export default Hendelse;
