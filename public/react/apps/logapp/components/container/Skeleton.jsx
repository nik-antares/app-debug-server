import React       from 'react';
import { Route }   from 'react-router-dom';

import Logs    from './Logs.jsx';

class Skeleton extends React.Component {
	render () {
		return (
			<div>
				<Route exact={true} path='/home/log'  component={Logs} />
			</div>	
		);
	}
}

export default Skeleton;

