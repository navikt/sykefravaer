import React from 'react';

const Survey = () => {
    return (
        <div className="panel landingspanel">
            <h2 className="survey__tittel">Hjelp oss å bli bedre</h2>
            <p>Vil du bruke noen minutter på å hjelpe med oss med å forbedre tilbudet vårt til sykmeldte?</p>
            <button
                className="rammeknapp rammeknapp--mini"
                onClick={() => {
                    window.open('https://docs.google.com/forms/d/1pQnqbQyqoYFq1DWMsoakdsfM7GS72UyqMr9PTi83LIg/edit?usp=sharing', '_blank');
                }}>
                Gi tilbakemelding
            </button>
        </div>);
};

export default Survey;
