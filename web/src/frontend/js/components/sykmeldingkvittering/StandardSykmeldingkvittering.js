import React from 'react';
import { sykmeldingstatuser } from 'digisyfo-npm';
import cn from 'classnames';
import PropTypes from 'prop-types';

const StandardSykmeldingkvittering = (props) => {
    const { tittel, brodtekst, status } = props;
    const ikon = status === sykmeldingstatuser.AVBRUTT ? 'avbryt-sykmelding.svg' : 'digital-til-papir.svg';
    const ikonKlasser = cn({
        illustrertTittel__img: true,
        'illustrertTittel__img--mikro': status === sykmeldingstatuser.AVBRUTT,
    });
    return (<div className="panel blokk js-kvittering--standard">
        <div className="illustrertTittel">
            <img className={ikonKlasser} src={`/sykefravaer/img/svg/${ikon}`} alt="" />
            <h2 className="illustrertTittel__tittel">
                {tittel}
            </h2>
        </div>
        <div className="redaksjonelt-innhold" dangerouslySetInnerHTML={brodtekst} />
    </div>);
};

StandardSykmeldingkvittering.propTypes = {
    tittel: PropTypes.string,
    brodtekst: PropTypes.shape({
        ___html: PropTypes.string,
    }),
    status: PropTypes.string,
};

export default StandardSykmeldingkvittering;
