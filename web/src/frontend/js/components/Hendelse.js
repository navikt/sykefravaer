import React, { PropTypes } from 'react';
import { getLedetekst } from '../ledetekster';
import TidslinjeBoble from './TidslinjeBoble.js';
import { toDatePrettyPrint } from '../utils/datoUtils.js';

const Ikon = ({ type }) => {
    const status = {
        statusClassName: 'milepael-status-klokke',
        ikonClassName: 'milepael-ikon-klokke',
        ikon: 'klokke-svart.svg',
        alt: '',
    };

    if (type === 'FØRSTE_SYKMELDINGSDAG') {
        status.statusClassName = '';
        status.ikonClassName = 'milepael-ikon-person';
        status.ikon = 'doctor-2.svg';
    } else if (type === 'BOBLE') {
        status.statusClassName = '';
        status.ikonClassName = 'milepael-ikon-sirkel';
        status.ikon = 'tidslinje-sirkel-graa.svg';
        status.img = 'milepael-ikon-sirkel-img';
    } else if (type === 'AKTIVITETSKRAV_VARSEL') {
        status.statusClassName = '';
        status.ikonClassName = 'milepael-ikon-varsel';
        status.ikon = 'ikon-utropstegn.svg';
        status.img = '';
    }

    return (<div className={`milepael-ikon ${status.ikonClassName}`}>
            <img className={`${status.img}`} src={`/sykefravaer/img/svg/${status.ikon}`} alt={status.alt} />
        </div>);
};

Ikon.propTypes = {
    type: PropTypes.string,
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

const Tittel = ({ tekst }) => {
    return (<div className="milepael-meta">
        <h2>{tekst}</h2>
    </div>);
};

Tittel.propTypes = {
    tekst: PropTypes.string,
};

const Hendelse = (props) => {
    return (<article className="milepael">
        <Status type={props.type}>
            <Ikon type={props.type} />
        </Status>
        <Innhold>
            {
                (() => {
                    switch (props.type) {
                        case 'TID': {
                            return <Tittel tekst={getLedetekst(`${props.tekstkey}`, props.ledetekster)} />;
                        }
                        case 'FØRSTE_SYKMELDINGSDAG': {
                            return (<Tittel tekst={getLedetekst(`${props.tekstkey}`, props.ledetekster, {
                                '%DATO%': toDatePrettyPrint(props.data.startdato),
                            })} />);
                        }
                        default: {
                            return <TidslinjeBoble {...props} />;
                        }
                    }
                })()
            }
        </Innhold>
    </article>);
};

Hendelse.propTypes = {
    erApen: PropTypes.bool,
    ledetekster: PropTypes.object,
    type: PropTypes.string,
    tekstkey: PropTypes.string,
    data: PropTypes.object,
};

export default Hendelse;
