import { render }         from 'react-dom';
import { BrowserRouter }  from 'react-router-dom';
import React              from 'react';

import domReady           from './common/js/domReady';
import App                from './app.jsx';

domReady (function () {
	render (
		<BrowserRouter>
			<App />
		</BrowserRouter>,
		document.getElementById('main')
	);
});
