import React from 'react';
import AddCustomer from './AddCustomer';

export class GetCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerList: [], showForm: false, formTitle: "New Customer", customerName: null, customerAddress: null , customerId: 0, isNew: true
        };
        this.loadData = this.loadData.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.CreateCustomerPopup = this.CreateCustomerPopup.bind(this);
        this.editCustomerPopup = this.editCustomerPopup.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    editCustomerPopup(id) {
        let customerData = this.state.customerList.find(cust => cust.id === id);
        this.setState({
            showForm: true,
            formTitle:"Edit Customer",
            customerId: customerData.id,
            customerName: customerData.name,
            customerAddress: customerData.address
        });
        console.log("Current state is " + customerData.address);
    }

    CreateCustomerPopup() {
        this.setState({
            showForm: true,
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
        console.log("custmers" + this.state.customerList.map);
    }

    edit(id) {
        this.props.history.push("/Customers/PutCustomer/" + id);  

    }

    delete(id) {
        if (!Window.confirm("Do you want to delete customer: " + id))
            return;
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

render() {

    let customerList = this.state.customerList;
    let showForm = this.state.showForm;
    let tableData = null;

    if (customerList !== "") {
        tableData = customerList.map(customer =>
            <tr key={customer.id}>
                <td className="two wide">{customer.name}</td>
                <td className="ten wide">{customer.address}</td>
                <td className="four wide">
                    <button onClick={() => this.editCustomerPopup(customer.id)}>Edit</button>
                </td>
                
                <td className="four wide">
                    <button onClick={() => this.delete(customer.id)}>Delete</button>
                </td>
            </tr>
        )
        
    }
    return (
        <React.Fragment>
            <button onClick={this.CreateCustomerPopup.bind(this)}>New Customer</button>
            <table className="ui striped table">
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
            <div>{<AddCustomer showForm={this.state.showForm} formTitle={this.state.formTitle} customerId={this.state.customerId} customerName={this.state.customerName} customerAddress={this.state.customerAddress} />}</div>
            
        </React.Fragment>
    )
}
}


