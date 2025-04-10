import React from 'react'
import { useState, useEffect } from 'react'

const EditModal = ( {isOpen, onClose, selectedRow} ) => {
    const [customerName, setCustomerName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [orderValue, setOrderValue] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [status, setStatus] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        if (selectedRow) {
            setCustomerName(selectedRow.customerName);
            setCompanyName(selectedRow.companyName);
            setOrderValue(formatValue(selectedRow.orderValue));
            setOrderDate(formatDate(selectedRow.orderDate));
            setStatus(selectedRow.status);
            setImage(selectedRow.avatar); 
        }
    }, [selectedRow]);

    const formatDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

    const formatValue = (value) => {
        return value.replace('$', '');
    };

    const handleUpdate = (e) => {
        if (isNaN(orderValue) || orderValue.trim() === '') {
            alert('Please enter a valid order value.');
            return; 
        }

        const updatedData = {
            ...selectedRow,
            customerName,
            companyName,
            orderValue: `$${orderValue}`,
            orderDate: orderDate.split('-').reverse().join('/'),
            status
        };
    
        fetch(`http://localhost:3002/customers/${selectedRow.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then((response) => response.json())
        .then(() => {
            onClose();
        })
        .catch((error) => {
            console.error('Error updating data:', error);
            alert("Failed to update. Please try again.");
        });
    };

    if (!isOpen) return null;

    return (
        <div className='modal'>
            <div className='modal-overlay'>
                <div><h1>Edit information</h1></div>

                <div className='flex flex-col items-center'>
                {image ? (
                        <img src={image} alt="avatar" />
                    ) : (
                        <img src="default-avatar.png" alt="default-avatar" />
                    )}
                </div>
            
                <div>
                    <h2>Customer name</h2>
                    <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} type="text" />
                </div>
            
                <div>
                    <h2>Company</h2>
                    <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} type="text" />
                </div>
            
                <div>
                    <h2>Order value</h2>
                    <input value={orderValue} onChange={(e) => setOrderValue(e.target.value)} type="text" />
                </div>
            
                <div>
                    <h2>Order date</h2>
                    <input value={orderDate} onChange={(e) => setOrderDate(e.target.value)} type="date" />
                </div>
            
                <div>
                    <h2>Status</h2>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="New">New</option>
                    <option value="In-progress">In-progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    </select>
                </div>
            
                <div className='flex justify-end gap-4 mt-4'>
                    <button type="submit" onClick={handleUpdate} className='px-4 py-2 border rounded'>Update</button>
                    <button type="button" onClick={onClose} className='px-4 py-2 border rounded'>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default EditModal
