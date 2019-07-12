import { MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING } from './oppfolgingsdialogEnums';

const erSykmeldingGyldigForOppfolgingMedGrensedato = (sykmelding, dato) => sykmelding.mulighetForArbeid.perioder.filter((periode) => {
    const tomGrenseDato = new Date(dato);
    tomGrenseDato.setHours(0, 0, 0, 0);
    tomGrenseDato.setMonth(tomGrenseDato.getMonth() - MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING);
    return new Date(periode.tom) >= new Date(tomGrenseDato);
}).length > 0;

export default erSykmeldingGyldigForOppfolgingMedGrensedato;
