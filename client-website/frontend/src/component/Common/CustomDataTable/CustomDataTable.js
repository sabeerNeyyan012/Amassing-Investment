import React from 'react';
import DataTable from "react-data-table-component";

const CustomDataTable = ({tableData}) => {

    const columns = [
        {
            name:"No.",
            selector: row=>row.id,
            sortable: true,
        },
        {
            name:"Ticker",
            selector: row=>row.ticker,
            sortable: true,
        },
        {
            name:"Market Cap",
            selector: row=>row.marketCap,
            sortable: true,
        },
        {
            name:"P/E",
            selector: row=>row.PE,
            sortable: true,
        },
        {
            name:"FWD P/E",
            selector: row=>row.fwdPE,
            sortable: true,
        },
        {
            name:"PEG",
            selector: row=>row.PEG,
            sortable: true,
        },
        {
            name:"P/S",
            selector: row=>row.PS,
            sortable: true,

        },
        {
            name:"P/B",
            selector: row=>row.PB,
            sortable: true,
        }
    ]

    return (
        <div>
            <DataTable columns={columns} data={tableData} pagination />
        </div>
    )
}

export default CustomDataTable
