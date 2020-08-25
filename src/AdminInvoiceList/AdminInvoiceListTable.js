import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

const AdminInvoiceListTable = () => {
    const orderList = [
        {
            _id: 1,
            orderNo: '0012',
            customerName: 'Shahnewaz Mahmud',
            orderTime: '08/08/2020 8:00 AM',
            invoiceStatus: 'Created'
        },
        {
            _id: 2,
            orderNo: '0016',
            customerName: 'Samsul Islam',
            orderTime: '08/08/2020 8:00 AM',
            invoiceStatus: 'Not Created'
        },
        {
            _id: 3,
            orderNo: '0019',
            customerName: 'Jahidul Islam',
            orderTime: '08/08/2020 8:00 AM',
            invoiceStatus: 'Not Created'
        },
        {
            _id: 4,
            orderNo: '0049',
            customerName: 'Abu Ubaida',
            orderTime: '08/08/2020 8:00 AM',
            invoiceStatus: 'Not Created'
        }
    ]

    const orderTableColumns = [
        {
            dataField: '_id',
            text: 'Id',
            hidden: true,
            headerStyle: {
                width: '0%'
            }
        },
        {
            dataField: 'orderNo',
            text: 'Order No'
        }, 
        {
            dataField: 'customerName',
            text: 'Customer Name'
        }, 
        {
            dataField: 'orderTime',
            text: 'Order Time'
        },
        {
            dataField: 'invoiceStatus',
            text: 'Invoice Status'
        }
    ];


    return  <div className="content-wrapper">
        <h1 className="text-center">Order List</h1>
        <BootstrapTable
            keyField='_id'
            data={orderList}
            columns={orderTableColumns}
            wrapperClasses="table-responsive"
            classes="table-light table-striped table-hover"
            headerWrapperClasses="thead-dark"
        />
    </div>
}

export default AdminInvoiceListTable;