import React from 'react'

const DetailReport = ( {customers} ) => {
    return (
        <div>
            <table className='w-[100%]'>
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">CUSTOMER NAME</th>
                        <th className="py-2 px-4 border">COMPANY</th>
                        <th className="py-2 px-4 border">ORDER VALUE</th>
                        <th className="py-2 px-4 border">ORDER DATE</th>
                        <th className="py-2 px-4 border">STATUS</th>
                    </tr>
                </thead>

                <tbody>
                    {customers.map((customer) => {
                        return (
                            <tr key={customer.id}>
                                <td className="py-2 px-4 border">{customer.customerName}</td>
                                <td className="py-2 px-4 border">{customer.company}</td>
                                <td className="py-2 px-4 border">{customer.orderValue}</td>
                                <td className="py-2 px-4 border">{customer.orderDate}</td>
                                <td className="py-2 px-4 border">{customer.status}</td>
                            </tr>
                        )    
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default DetailReport
