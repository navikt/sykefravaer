import React from 'react';
import soknadSetup from '../../utils/soknadSetup';
import Soknadstatussjekker from '../../felleskomponenter/Soknadstatussjekker';
import EttSporsmalPerSide from './EttSporsmalPerSide';
import validerSporsmal from '../../validering/validerSporsmal';

const validerDenneSiden = (values, props) => {
    const sporsmal = props.soknad.sporsmal[props.sidenummer - 1];
    const resultat = validerSporsmal([sporsmal], values);
    return resultat;
};

const validerForegaendeSider = (values, props) => {
    const sporsmal = props.soknad.sporsmal.filter((spm, index) => {
        return (index + 1) < props.sidenummer;
    });
    return validerSporsmal(sporsmal, values);
};

const EttSporsmalPerSideContainer = (props) => {
    return (<Soknadstatussjekker
        {...props}
        Component={EttSporsmalPerSide}
        valider={validerForegaendeSider} />);
};

export default soknadSetup(validerDenneSiden, EttSporsmalPerSideContainer, true);
