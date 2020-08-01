import React, { Component } from 'react';

class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false, formTitle: "New Customer", customerName: "Enter name here.", customerAddress: "Enter Address here", customerId: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }    

    
    handleChange(event) {
        if(this.props.customerId > 0) {
            this.setState({
                customerId: this.props.customerId,
                customerName: this.props.customerName,
                customerAddress: this.props.customerAddress
            });
        }        
        if (event.target.name == "Name") {
            this.setState({ customerName: event.target.value });
        }
        else {
            this.setState({ customerAddress: event.target.value });
        }
        console.log("Value changed for " + this.state.customerAddress);
        
    }

    handleSubmit(e) {
        e.preventDefault();
        const customerData = new FormData();
        customerData.append('id', this.state.customerId);
        customerData.append('name', this.state.customerName);
        customerData.append('address', this.state.customerAddress);

        if (this.props.customerId > 0) {
            fetch('api/Customers/PutCustomer', {
                method: 'PUT',
                body: customerData
            })
                .then(json => {
                   this.props.history.push("api/Customers/GetCustomer");
         });

        } else {
            fetch('api/Customers/PostCustomer' , {
                method: 'POST',
                body: customerData
            })
                .then(response => response.json())
                .then(json => {
                    this.props.history.push("api/Customers/GetCustomer");
                   
                });
        }
    }

    render() {
        return (
            this.props.showForm && 
            <div className="popup">
                <form className="popup_inner" id="createedit" onSubmit={this.handleSubmit} key="{this.props.customerId}">
                        <h1>{this.props.formTitle}</h1>
                    <label>Name: </label>
                    <input type="text" id="name" name="Name" defaultValue={this.props.customerName} onChange={this.handleChange} />

                    <label>Address : </label>
                    <input type="text" id="address" name="Address" defaultValue={this.props.customerAddress} onChange={this.handleChange}></input>
                        <input type="submit" value="submit" />
                        <input type="button" value="Cancel"></input>
                    </form>
                </div>
                   
        );
    }

}
export default AddCustomer