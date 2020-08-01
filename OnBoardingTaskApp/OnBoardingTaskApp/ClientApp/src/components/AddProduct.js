import React, { Component } from 'react';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            formTitle: "New Product",
            productName: "Enter name here.",
            productPrice: "Enter Price here",
            productId: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event) {
        if (this.props.productId > 0) {
            this.setState({
                productId: this.props.customerId,
                productName: this.props.productName,
                productPrice: this.props.productPrice
            });
        }
        if (event.target.name == "Name") {
            this.setState({ productName: event.target.value });
        }
        else {
            this.setState({ productPrice: event.target.value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const Data = new FormData();
        Data.append('id', this.state.productId);
        Data.append('name', this.state.productName);
        Data.append('price', this.state.productPrice);

        if (this.props.productId > 0) {
            fetch('api/Products/PutProduct', {
                method: 'PUT',
                body: Data
            })
                .then(json => {
                    // console.log(this.props.history);
                    //this.props.history.push("/GetCustomer");
                });

        } else {
            fetch('api/Products/PostProduct', {
                method: 'POST',
                body: Data
            })
                .then(response => response.json())
                .then(json => {
                    //this.props.history.push("/GetCustomer");

                });
            // this.props.history.push("api/Customers/PostCustomer/" + customerData);
        }
    }

    render() {
        return (
            this.props.showForm &&
            <div className="popup">
                <form className="popup_inner" id="createedit" onSubmit={this.handleSubmit} key="{this.props.productId}">
                    <h1>{this.props.formTitle}</h1>
                    <label>Name: </label>
                    <input type="text" id="name" name="Name" defaultValue={this.props.productName} onChange={this.handleChange} />

                    <label>Price : </label>
                    <input type="text" id="price" name="Price" defaultValue={this.props.productPrice} onChange={this.handleChange}></input>
                    <input type="submit" value="submit" />
                    <input type="button" value="Cancel"></input>
                </form>
            </div>

        );
    }

}
export default AddProduct