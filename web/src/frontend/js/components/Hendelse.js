import React, { PropTypes } from 'react';
import { getLedetekst } from '../ledetekster';
import TidslinjeBoble from './TidslinjeBoble.js';
import { toDatePrettyPrint } from '../utils/datoUtils.js';

const Ikon = ({ type }) => {
    const status = {
        statusClassName: 'hendelse-status-klokke',
        ikonClassName: 'hendelse-ikon-klokke',
        ikon: 'klokke-svart.svg',
        alt: '',
    };

    if (type === 'FØRSTE_SYKMELDINGSDAG') {
        status.statusClassName = '';
        status.ikonClassName = 'hendelse-ikon-person';
        status.ikon = 'doctor-2.svg';
    } else if (type === 'BOBLE') {
        status.statusClassName = '';
        status.ikonClassName = 'hendelse-ikon-sirkel';
        status.ikon = 'tidslinje-sirkel-graa.svg';
        status.img = 'hendelse-ikon-sirkel-img';
    } else if (type === 'AKTIVITETSKRAV_VARSEL') {
        status.statusClassName = '';
        status.ikonClassName = 'hendelse-ikon-varsel';
        status.ikon = 'ikon-utropstegn.svg';
        status.img = '';
    }

    return (<div className={`hendelse-ikon ${status.ikonClassName}`}>
            <img className={`${status.img}`} src={`/sykefravaer/img/svg/${status.ikon}`} alt={status.alt} />
        </div>);
};

Ikon.propTypes = {
    type: PropTypes.string,
};

const Status = ({ children }) => {
    return (<div className="hendelse-status">
        {children}
    </div>);
};

Status.propTypes = {
    type: PropTypes.string,
    children: PropTypes.object,
};

const Innhold = ({ children }) => {
    return (<div className="boble-innhold">
        {children}
    </div>);
};

Innhold.propTypes = {
    children: PropTypes.object,
};

const Tittel = ({ tekst }) => {
    return (<div className="tidslinje-tittel">
        <h2>{tekst}</h2>
    </div>);
};

Tittel.propTypes = {
    tekst: PropTypes.string,
};

const Hendelse = (props) => {
    return (<div className="hendelse">
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
    </div>);
};

Hendelse.propTypes = {
    erApen: PropTypes.bool,
    ledetekster: PropTypes.object,
    type: PropTypes.string,
    tekstkey: PropTypes.string,
    data: PropTypes.object,
};

export default Hendelse;
