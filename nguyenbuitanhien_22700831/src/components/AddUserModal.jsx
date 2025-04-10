import React, { useRef, useState } from 'react';

const AddUserModal = ({ isOpen, onClose }) => {
    const fileInputRef = useRef(null);
    const [orderValue, setOrderValue] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [status, setStatus] = useState('New');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const formatDate = (isoDate) => {
        const [year, month, day] = isoDate.split("-");
        return `${day}/${month}/${year}`;
    };

    const handleAddUser = () => {
        if (isNaN(orderValue) || orderValue.trim() === '') {
            alert('Please enter a valid order value.');
            return;
        }

        fetch('http://localhost:3002/customers')
        .then(res => res.json())
        .then(data => {
            const maxId = data.length > 0 ? Math.max(...data.map(c => parseInt(c.id || 0))) : 0;
            const newId = maxId + 1;

            const avatarPath = selectedFile ? `/src/assets/images/${selectedFile.name}` : "/src/assets/images/Avatar.png";

            const newCustomer = {
                id: String(newId),
                avatar: avatarPath,
                customerName,
                companyName,
                orderValue: `$${orderValue}`,
                orderDate: formatDate(orderDate),
                status
            };

            return fetch('http://localhost:3002/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
            }).then(response => response.json())
            .then(() => {
               onClose();
            });
        })
        .catch((error) => {
            console.error('Error adding user:', error);
            alert("Failed to update. Please try again.");
        });
    };

    if (!isOpen) return null;
    
    return (
        <div className='modal'>
            <div className='modal-overlay'>
                <h1>Add User</h1>
                <div className='mb-3'>
                <h2>Avatar</h2>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <button
                    className='mt-2 px-4 py-2 border rounded'
                    onClick={handleButtonClick}
                    aria-label="Upload Avatar"
                >
                    Upload Avatar
                </button>
                {selectedFile && <p className='text-sm mt-1'>Selected: {selectedFile.name}</p>}
                </div>
                <div className='mb-3'>
                <h2>Customer Name</h2>
                <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className='w-full border px-2 py-1 rounded'
                    aria-label="Customer Name"
                />
                </div>
                <div className='mb-3'>
                <h2>Company Name</h2>
                <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className='w-full border px-2 py-1 rounded'
                    aria-label="Company Name"
                />
                </div>
                <div className='mb-3'>
                <h2>Order Value</h2>
                <input
                    type="text"
                    value={orderValue}
                    onChange={(e) => setOrderValue(e.target.value)}
                    className='w-full border px-2 py-1 rounded'
                    aria-label="Order Value"
                />
                </div>
                <div className='mb-3'>
                <h2>Order Date</h2>
                <input
                    type="date"
                    value={orderDate}
                    onChange={(e) => setOrderDate(e.target.value)}
                    className='w-full border px-2 py-1 rounded'
                    aria-label="Order Date"
                />
                </div>
                <div className='mb-4'>
                <h2>Status</h2>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className='w-full border px-2 py-1 rounded'
                    aria-label="Status"
                >
                    <option value="New">New</option>
                    <option value="In-progress">In-progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                </select>
                </div>
                <div className='flex justify-end gap-2'>
                <button
                    type='button'
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                    onClick={handleAddUser}
                >
                    Add User
                </button>
                <button
                    type='button'
                    className='bg-gray-300 px-4 py-2 rounded hover:bg-gray-400'
                    onClick={onClose}
                >
                    Cancel
                </button>
                </div>
            </div>
        </div>
    );
};

export default AddUserModal;
