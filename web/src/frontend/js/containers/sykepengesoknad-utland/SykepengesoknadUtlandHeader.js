import React from 'react';
import { getLedetekst } from 'digisyfo-npm';


const Header = () => {
    return (<header className="sidetopp">
                <h1 className="sidetopp__tittel">{ getLedetekst('sykepengesoknad-utland.tittel') }</h1>
            </header>);
};

export default Header;
