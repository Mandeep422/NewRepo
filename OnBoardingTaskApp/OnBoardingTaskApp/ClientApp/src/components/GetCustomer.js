﻿import React from 'react';
import AddCustomer from './AddCustomer';

export class GetCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerList: [],
            showForm: false,
            formTitle: "Create Customer",
            customerName: "", customerAddress: "", customerId: 0, isNew: true, open: false
        };
        this.loadData = this.loadData.bind(this);
        this.delete = this.delete.bind(this);
        this.CreateCustomerPopup = this.CreateCustomerPopup.bind(this);
        this.editCustomerPopup = this.editCustomerPopup.bind(this);
        this.ClearState = this.ClearState.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.show = this.show.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    editCustomerPopup(id) {
        let customerData = this.state.customerList.find(cust => cust.id === id);
        this.setState({
            showForm: !this.state.showForm,
            isNew: false,
            formTitle:"Edit Customer",
            customerId: customerData.id,
            customerName: customerData.name,
            customerAddress: customerData.address
        });
    }

    CreateCustomerPopup() {
        this.setState({
            showForm: !this.state.showForm,
        });
    }

    ClearState() {
        this.setState({
            customerId: 0,
            customerName: "",
            customerAddress: ""
        });
    }

    loadData() {
        fetch('api/Customers/GetCustomer')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    customerList: json,
                })
            });
    }

    delete(id) {
        let Data = this.state.customerList.find(data => data.id === id);
        if (!window.confirm("Do you want to delete customer: " + Data.name))            return;
        else {
            fetch('api/Customers/DeleteCustomer/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        customerList: this.state.customerList.filter((data) => {
                            return (data.id != id);
                        })
                    });
            });

        }
        }

    handleCancel() {
        this.setState({ open: false });
    }

    show() {
        this.setState({ open: true });
    }

render() {

    let customerList = this.state.customerList;
    let tableData = null;

    if (customerList !== "") {
        tableData = customerList.map(customer =>
            <tr key={customer.id}>
                <td className="two wide">{customer.name}</td>
                <td className="ten wide">{customer.address}</td>
                <td className="four wide">
                    <button class="edit_btn" onClick={() => this.editCustomerPopup(customer.id)}>Edit</button>
                </td>
                
                <td className="four wide">
                        <button class="delete_btn" onClick={() => this.delete(customer.id)}>Delete</button>
                </td>
            </tr>
        )
        
    }
    return (
        <React.Fragment>
            <button onClick={this.CreateCustomerPopup.bind(this)}>New Customer</button>
            <table className="tablelist">
                <thead>
                    <tr>
                        <th className="two wide">Name</th>
                        <th className="ten wide">Address</th>
                        <th className="four wide">Actions</th>
                        <th className="four wide">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </table>
            <div>{this.state.showForm && <AddCustomer clearState={this.ClearState} loadData={this.loadData} togglepopup={this.CreateCustomerPopup} formTitle={this.state.formTitle} customerId={this.state.customerId} customerName={this.state.customerName} customerAddress={this.state.customerAddress} />}</div>
            
        </React.Fragment>
    )
}
}

export default GetCustomer


