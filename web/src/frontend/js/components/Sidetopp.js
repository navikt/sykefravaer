import React from 'react';

const Sidetopp = ({ tittel, htmlTekst }) => {
    return (<header className="sidetopp">
        <h1 className="sidetopp__tittel">
            {tittel}
        </h1>
        {
            htmlTekst && <div className="sidetopp__intro side-innhold js-intro">
                <p dangerouslySetInnerHTML={htmlTekst} />
            </div>
        }
    </header>);
}

export default Sidetopp;