import React from 'react';
import { getLedetekst } from 'digisyfo-npm';


const Header = () => {
    return (<div className="sidebanner sidebanner--utenramme">
        <div className="sidebanner__innhold">
            <header className="sidetopp">
                <h1 className="sidetopp__tittel sist">{ getLedetekst('sykepengesoknad-utland.tittel') }</h1>
            </header>
        </div>
    </div>);
};

export default Header;
