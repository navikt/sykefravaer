import React, { PropTypes } from 'react';
import { Utvidbar } from 'digisyfo-npm';

const SykmeldingUtdrag = ({ erApen }) => {
    return (<Utvidbar Overskrift="h2" erApen={erApen} visLukklenke={!erApen} tittel="Informasjon fra sykmeldingen søknaden gjelder for" variant="lysebla" ikon="svg/plaster.svg" ikonHover="svg/plaster--hover.svg">
		<div>
            <p>Her kommer et utdrag fra sykmeldingen</p>
		</div>
	</Utvidbar>);
};

SykmeldingUtdrag.propTypes = {
    erApen: PropTypes.bool,
};

export default SykmeldingUtdrag;
