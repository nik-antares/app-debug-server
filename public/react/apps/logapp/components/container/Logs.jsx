import React         from 'react';
import { Redirect }  from 'react-router-dom';

import JsLogs        from '../../common/js/log.js';
import xhr           from '../../common/js/xhr.js';
import Presentation  from '../presentation/Logs.jsx';

const Log = JsLogs ('Logs', 'info');

class Logs extends React.Component {
	constructor (props) {
		super (props);

		this.state = {
			loading : true,
			error   : null,
		};

		this.logs          = [];
	}

	async componentDidMount () {
		let logs = [];

		try {
			logs = await xhr.get ('/log/all');
			Log.info ({logs : logs}, 'get logs ok');
			this.logs = logs;
		}
		catch (err) {
			Log.error ({err : err}, 'error getting logs');
			return this.setState ({
				error : 'Error fetching data from server. Please refresh.',
				loading : false
			});

		}
		this.setState ({
			loading : false,
			error    : null
		});

	}

	tableData () {
		let __tableData = {
			columns : [],
			rows    : []
		};

		__tableData.columns = this.getColumns ();
		__tableData.rows    = this.getRows ();

		return __tableData;
	}

	getColumns () {
		return [
			{
				text : '#',
				dataField : 'id',
				hidden    : true
			},
			{
				text : 'Log Type',
				dataField : 'logtype'
			},
			{
				text : 'Log Meassage',
				dataField : 'logmessage'
			},
			{
				text : 'Module',
				dataField : 'module'
			},
			{
				text : 'Brand',
				dataField : 'brand'
			},
			{
				text : 'Device Locale',
				dataField : 'locale'
			}
		];
	}

	getRows () {
		let rows = [];

		for (let i = 0 ; i < this.logs.length ; i++) {
			let __logs  = this.logs[i];

			let row = {
				id             : (i + 1).toString (),
				logtype        : __logs.log.type,
				logmessage     : __logs.log.msg,
				module         : __logs.log.module,
				brand          : __logs.deviceInfo.brand,
				locale         : __logs.deviceInfo.deviceLocale,
			};

			rows.push (row);
		}

		return rows;
	}

	render() {

		let tableData = this.tableData ();
		let data = {
			tableData : tableData,
		};

		return (
			<Presentation loading={this.state.loading} data={data} />
		);
	}
}

export default Logs;

