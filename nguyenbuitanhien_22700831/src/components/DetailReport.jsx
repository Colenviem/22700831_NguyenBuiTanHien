import React, {useState} from 'react'
import DataTable from 'react-data-table-component'
import Pagination from "@mui/material/Pagination"
import edit from '../assets/images/create.png'

const DetailReport = ( {customers} ) => {
    const [page, setPage] = useState(1);
    const rowsPerPage = 6;
 
    const handleChange = (event, value) => {
        setPage(value);
    };

    const columns = [
        {
            name: "CUSTOMER NAME",
            cell: (row) => (
                <div className="flex items-center gap-3">
                <img src={row.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                <span>{row.customerName}</span>
                </div>
            )
        },
        {
            name: "COMPANY",
            selector: row => row.companyName
        },
        {
            name: "ORDER VALUE",
            selector: row => row.orderValue
        },
        {
            name: "ORDER DATE",
            selector: row => row.orderDate
        },
        {
            name: "STATUS",
            selector: row => row.status
        },
        {
            cell: () => (
                <button>
                    <img src={edit} alt={edit} />
                </button>
            )
        }
    ]

    const paginatedData = customers.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    return (
        <div>
            <DataTable 
                columns={columns}
                data={paginatedData}
                selectableRows
                highlightOnHover
                responsive
            >  
            </DataTable>

            <div className='flex justify-between items-center mt-5'>
                <p><span>{customers.length}</span> result</p>
        
                <Pagination
                    count={Math.ceil(customers.length / rowsPerPage)}
                    page={page}
                    onChange={handleChange}
                ></Pagination>
            </div>
        </div>
    )
}

export default DetailReport
