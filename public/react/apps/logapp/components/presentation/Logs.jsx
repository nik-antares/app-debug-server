import React     from 'react';
import JsLogs    from '../../common/js/log.js';

const Log = JsLogs ('Logs', 'info');

import BootstrapTableCustom from './BootstrapTableCustom.jsx';

class Logs extends React.Component {

	getTable () {
		if (this.props.data.tableData.rows.length)
			return (
				<div className='col-md-12'>
					<BootstrapTableCustom  data={this.props.data.tableData.rows} columns={this.props.data.tableData.columns} />
				</div>
			);

		return null;
	}

	_refreshPage() {
		Log.info('Clicked');
		window.location.reload();
	}


	render() {

		return this.renderComplete ();
	}

	renderComplete () {
		return (
			<div className='row menu-add-section'>

				<div className='row col-md-12 customContainer'>
					<div className='col-md-12'>
						<h1 className='underline'> Logs </h1>
					</div>
					<div className='col-md-12'>
						< button onClick = {this._refreshPage} > Refresh Logs </button>
					</div>
				</div>

				<div className='row col-md-12 customContainer'>
					{this.getTable ()}
				</div>

			</div>
		);
	}
}

export default Logs;

