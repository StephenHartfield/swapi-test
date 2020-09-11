import React from 'react';
import Datatable from 'react-data-table-component';

const columns = [
    { name: 'Key', selector: 'key', sortable: true, center: true },
    { name: 'Value', selector: 'value', sortable: true, center: true },
];
  
const customStyles = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
      }
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
        border: 'solid lightgray 1px',
        fontWeight: 600
      }
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
      },
    },
  }

export default function StarWarsTable(props) {
    console.log(props);
    return (
        <Datatable
        title='Info'
        columns={columns}
        data={props.result}
        highlightOnHover
        customStyles={customStyles}
        ></Datatable>
    )
}