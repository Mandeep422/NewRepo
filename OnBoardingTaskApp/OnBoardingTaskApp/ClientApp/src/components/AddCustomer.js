import React, { Component } from 'react';

class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false, formTitle: "Create Customer",
            customerName: "", customerAddress: "", customerId: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }    

    shouldComponentUpdate() {
        this.props.loadData();
        console.log("showform1:" + this.state.showForm);
    }

    handleCancel(event) {
        this.props.togglepopup();
        this.props.clearState();
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
        console.log("showform2:" + this.state.showForm);
    }

    handleSubmit(e) {
        console.log("showform3:" + this.state.showForm);
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
                    this.props.togglepopup();
                    this.props.clearState();
                });
        } else {
            fetch('api/Customers/PostCustomer' , {
                method: 'POST',
                body: customerData
            })
                .then(response => response.json())
                .then(json => { 
                    this.props.togglepopup();
                });
        }
    }

    render() {
        return (
            <div className="popup">
                <form className="popup_inner" id="createedit" onSubmit={this.handleSubmit} key="{this.props.customerId}">
                        <h1>{this.props.formTitle}</h1>
                    <label>Name: </label>
                    <input type="text" id="name" name="Name" defaultValue={this.props.customerName} onChange={this.handleChange} />

                    <label>Address : </label>
                    <input type="text" id="address" name="Address" defaultValue={this.props.customerAddress} onChange={this.handleChange}></input>
                    <input class="btn cancel" type="button" value="Cancel" onClick={this.handleCancel}></input>
                    <input class="btn" type="submit" value="Submit" />
                    </form>
            </div>


                   
        );
    }

}
export default AddCustomer