import React     from 'react';

import Skeleton  from './components/container/Skeleton.jsx';

/*
 * Stylesheets */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-quill/dist/quill.snow.css';

//import 'react-quill/dist/quill.bubble.css';
//import './stylesheets/bootstrap.min.css';
//import './stylesheets/bootstrap-theme.min.css';

import './stylesheets/App.less';

class App extends React.Component {

	render () {
		return (
			<div className='containerMain' >
				<div id='containerSkeleton' >
					<Skeleton />
				</div>
			</div>
			);
	}
}

export default App;

