import React, {useState} from 'react'
import DataTable from 'react-data-table-component'
import Pagination from "@mui/material/Pagination"
import edit from '../assets/images/create.png'
import addUser from '../assets/images/Move up.png'
import exportIcon from '../assets/images/Download.png'
import detailedReport from '../assets/images/File text 1.png'

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
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <img src={detailedReport} alt="" />
                <h1 className='font-poppins text-xl leading-[30px] font-bold text-[#171A1FFF]'>Detailed report</h1>
                </div>
        
                <div className="flex gap-3.5">
                    <button className="btn btn-add-user">
                        <img src={addUser} alt="" />
                        Add user
                    </button>
                    
                    <button className="btn btn-export">
                        <img src={exportIcon} alt="" />
                        Export
                    </button>
                </div>
            </div>

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
