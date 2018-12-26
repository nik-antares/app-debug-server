import React                       from 'react';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable              from 'react-bootstrap-table-next';
import BootstrapPagination         from 'react-bootstrap-table2-paginator';

import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome';
import { faTable }           from '@fortawesome/free-solid-svg-icons';

const { SearchBar } = Search;

/* 
 * Simple editor component that takes placeholder text as a prop 
 */
class BootstrapTableCustom extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<ToolkitProvider
				keyField="id"
				data={ this.props.data}
				columns={ this.props.columns}
				search={{searchFormatted : true}}
				bootstrap4
			>
				{
					props => (
						<div>
							<SearchBar { ...props.searchProps } className='tableSearch'/>
							<BootstrapTable
								{ ...props.baseProps }
								striped
								hover
							/>
						</div>
					)
				}
			</ToolkitProvider>
		);
	}
}


export default BootstrapTableCustom;
