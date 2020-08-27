import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {useHistory} from 'react-router-dom';
import './AdminInvoiceListTable.css'

const AdminInvoiceListTable = () => {
    const history = useHistory()
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

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            if(row.invoiceStatus === "Not Created"){
                console.log(row)
                history.push('/admin-create-invoice')
            }
        }
    };


    return  <div className="content-wrapper overflow-hidden">
        <h1 className="text-center">Order List</h1>
        <BootstrapTable
            keyField='_id'
            data={orderList}
            columns={orderTableColumns}
            wrapperClasses="table-responsive ml-3 px-5"
            classes="table-light table-striped table-hover invoice-table"
            headerWrapperClasses="thead-dark"
            selectRow={ selectRow }
        />
    </div>
}

export default AdminInvoiceListTable;