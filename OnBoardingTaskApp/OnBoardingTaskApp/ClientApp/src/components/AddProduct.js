import React, { Component } from 'react';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            formTitle: "Create Product",
            productName: "",
            productPrice: null,
            productId: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }

    shouldComponentUpdate() {
        this.props.loadData();
    }

    handleCancel(event) {
        this.props.togglepopup();
        this.props.clearState();
        this.props.loadData();
    }

    handleChange(event) {
        if (this.props.productId > 0) {
            this.setState({
                productId: this.props.productId,
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
                    this.props.togglepopup();
                });

        } else {
            fetch('api/Products/PostProduct', {
                method: 'POST',
                body: Data
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
                <form className="popup_inner" id="createedit" onSubmit={this.handleSubmit} key="{this.props.productId}">
                    <h1>{this.props.formTitle}</h1>
                    <label>Name: </label>
                    <input type="text" id="name" name="Name" defaultValue={this.props.productName} onChange={this.handleChange} />

                    <label>Price : </label>
                    <input type="text" id="price" name="Price" defaultValue={this.props.productPrice} onChange={this.handleChange}></input>
                    <input class="btn cancel" type="button" value="Cancel" onClick={this.handleCancel}></input>
                    <input class="btn" type="submit" value="submit" />
                </form>
            </div>

        );
    }

}
export default AddProduct