import React from 'react';
import { getLedetekst } from '../ledetekster';

const AppSpinner = () => {
	return <div className="app-spinner" aria-label={getLedetekst('applikasjon.siden-laster')}></div>;
}

export default AppSpinner; 
