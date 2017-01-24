import React from 'react';
import Sidetopp from '../../components/Sidetopp';
import Side from '../../sider/Side';

const Kvittering = () => {
    const brodsmuler = [{
        tittel: 'Ditt sykefravær',
        sti: '',
        erKlikkbar: false,
    }, {
        tittel: 'Søknad om sykepenger',
        sti: '/sykepenger',
        erKlikkbar: false,
    }, {
        tittel: 'Kvittering',
    }];

    return (<div>
        <Side tittel="Kvittering" brodsmuler={brodsmuler}>
            <div>
                <Sidetopp tittel="Kvittering" />
                <div className="panel">
                    <h2 className="hode hode-suksess hode-dekorert">Søknaden er sendt til arbeidsgiveren din</h2>
                </div>
            </div>
        </Side>
    </div>);
};

export default Kvittering;
