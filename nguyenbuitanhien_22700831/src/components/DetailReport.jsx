import React, {useState, useEffect, useMemo} from 'react'
import DataTable from 'react-data-table-component'
import Pagination from "@mui/material/Pagination"
import edit from '../assets/images/create.png'
import addUser from '../assets/images/Move up.png'
import exportIcon from '../assets/images/Download.png'
import detailedReport from '../assets/images/File text 1.png'
import EditModal from './EditModal'
import AddUserModal from './AddUserModal'
import axios from 'axios'

const API = "http://localhost:3002/customers"

const DetailReport = () => {
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [customers, setCustomers] = useState([]);
    const rowsPerPage = 6;

    useEffect(() => {
        const fetchData = async () => {
          try{
            const [customerRes] = await Promise.all([
              axios.get(API),
            ]);
            setCustomers(customerRes.data);
          }catch(error){
            console.error("Error fetching data:", error)
          }
        }
        fetchData();
    },[])
 
    const handleChange = (event, value) => {
        setPage(value);
    };

    const handleEdit = (row) => {
        setOpenEdit(true);
        setSelectedRow(row);
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
            cell: (row) => (
                <button type='button' onClick={() => handleEdit(row)}>
                    <img src={edit} alt={edit} />
                </button>
            )
        }
    ]

    const paginatedData = useMemo(() => {
        console.log('customers');
        console.log(customers.sort((a, b) => parseInt(b.id) - parseInt(a.id))); 
        return customers.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    }, [customers, page]);

    return (
        <div>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <img src={detailedReport} alt="" />
                <h1 className='font-poppins text-xl leading-[30px] font-bold text-[#171A1FFF]'>Detailed report</h1>
                </div>
        
                <div className="flex gap-3.5">
                    <button className="btn btn-add-user" onClick={() => setAddUserModalOpen(true)}>
                        <img src={addUser} alt="" />
                        Add user
                    </button>
                    
                    <button className="btn btn-export">
                        <img src={exportIcon} alt="" />
                        Export
                    </button>
                </div>
            </div>

            <DataTable className='data-table'
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
                    sx={{
                        '& .MuiPaginationItem-root': {
                          color: '#E91E63',             
                          borderColor: '#E91E63',       
                        },
                        '& .Mui-selected': {
                          backgroundColor: '#E91E63',   
                          color: 'white',
                        },
                        '& .MuiPaginationItem-root:hover': {
                          backgroundColor: '#F8BBD0',   
                        }
                    }}
                ></Pagination>
            </div>

            <EditModal
                isOpen={openEdit}
                onClose={() => setOpenEdit(false)}
                selectedRow={selectedRow}
            />

            <AddUserModal
                isOpen={isAddUserModalOpen}
                onClose={() => setAddUserModalOpen(false)}
            />
        </div>
    )
}

export default DetailReport
