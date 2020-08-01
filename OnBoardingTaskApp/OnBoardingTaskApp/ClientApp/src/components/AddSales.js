import React, { Component } from 'react';

class AddSales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            formTitle: "New Sale",
            customerName: "Enter name here.",
            productName: "Enter Address here",
            storeName: "Enter Product Name",
            dateSold: "Enter date of sale.",
            customerList: [],
            productList: [],
            storeList: []

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch('api/Customers/GetCustomer')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    customerList: json,
                })
            });
        console.log(this.state.customerList.length);

        fetch('api/Products/GetProduct')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    productList: json,
                })
            });
        console.log(this.state.productList.length);

        fetch('api/Store/GetStore')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    storeList: json,
                })
            });
        console.log(this.state.storeList.length);

    }

    handleChange(event) {
        if (this.props.salesId > 0) {
            this.setState({
                productName: this.props.productName,
                customerName: this.props.customerName,
                storeName: this.props.storeName,
                dateSold: this.props.dateSold
            });
        }
        if (event.target.name == "Product") {
            this.setState({ productName: event.target.value });
        }
        else if (event.target.name == "Customer") {
            this.setState({ customerName: event.target.value });
        }
        else if (event.target.name == "Store") {
            this.setState({ storeName: event.target.value });
        }
        else {
            this.setState({ dateSold: event.target.value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('id', this.state.salesId);
        data.append('customer', this.state.customerName);
        data.append('product', this.state.productName);
        data.append('store', this.state.storeName);
        data.append('datesold', this.state.dateSold);

        if (this.props.salesId > 0) {
            fetch('api/Sales/PutSales', {
                method: 'PUT',
                body: data
            })
                .then(json => {
                    // console.log(this.props.history);
                    //this.props.history.push("/GetCustomer");
                });

        } else {
            fetch('api/Sales/PostSales', {
                method: 'POST',
                body: data
            })
                .then(response => response.json())
                .then(json => {
                    //this.props.history.push("/GetCustomer");

                });
            // this.props.history.push("api/Customers/PostCustomer/" + customerData);
        }
    }

    render() {
        let customerList = this.state.customerList;
        let customerData = null;

        if (customerList !== "") {
            customerData = customerList.map(customer =>
                <option key={customer.id} value="customer.id">{customer.customerName}</option>
            )
        }
        let productList = this.state.productList;
        let productData = null;

        if (productList !== "") {
            productData = productList.map(product =>
                <option value="product.id" key={product.id}>{product.productName}</option>
            )
        }
        let storeList = this.state.storeList;
        let storeData = null;

        if (storeList !== "") {
            storeData = storeList.map(store =>
                <option value="store.id" key={store.id}>{store.storeName}</option>
            )
        }

        return (
            this.props.showForm &&
            <div className="popup">
                <form className="popup_inner" id="createedit" onSubmit={this.handleSubmit} key="{this.props.salesIs}">
                    <h1>{this.props.formTitle}</h1>
                    <label>Date Sold: </label>
                    <input type="text" id="datesold" name="Datesold" defaultValue={this.props.dateSold} onChange={this.handleChange} />

                    <label>Customer : </label>
                    <select>{customerData}</select>
                    <label>Product : </label>
                    <select>{productData}</select>
                    <label>Store : </label>
                    <select>{storeData}</select>
        
                    <input type="submit" value="submit" />
                    <input type="button" value="Cancel"></input>
                </form>
            </div>

        );
    }

}
export default AddSales