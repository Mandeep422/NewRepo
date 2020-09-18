import React, { Component } from 'react';

class AddSales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            formTitle: "Create Sale",
            customerName: "",
            productName: "",
            storeName: "",
            dateSold: new Date().toISOString().slice(0, 19),
            customerList: [],
            productList: [],
            storeList: [],
            sale: null,
            id:0,
            customerId: 0,
            productId: 0,
            storeId: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }

    handleCancel(event) {
        this.props.togglepopup();
        this.props.clearState();
    }

    componentDidMount() {
        this.createSelectItems();
        if (this.props.salesId > 0) {
            this.setState({
                id: this.props.salesId,
                productId: this.props.productId,
                customerId: this.props.customerId,
                storeId: this.props.storeId,
                dateSold: this.props.dateSold.split('T')[0]
            });
        }
        console.log(this.state.dateSold);
    }


    handleChange(event) {
        if (event.target.name == "Product") {
            this.setState({ productId: event.target.value });
        }
        else if (event.target.name == "Customer") {
            this.setState({ customerId: event.target.value });
        }
        else if (event.target.name == "Store") {
            this.setState({ storeId: event.target.value });
        }
        else {
            this.setState({ dateSold: event.target.value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('Id', this.state.id);
        data.append('ProductId', this.state.productId);
        data.append('CustomerId', this.state.customerId);
        data.append('StoreId', this.state.storeId);
        data.append('DateSold', this.state.dateSold);

        if (this.props.salesId > 0) {

            fetch('api/Sales/PutSales', {
                method: 'PUT',
                body: data
            })
                .then(json => {
                    this.props.togglepopup();
                    this.props.clearState();
                    this.props.loadData();
                });

        } else {
         
            fetch('api/Sales/PostSales', {
                method: 'POST',
                body: data
            })
                .then(response => response.json())
                .then(json => {
                    this.props.clearState();
                    this.props.loadData();
                });
        }
    }

    createSelectItems() {
        fetch('api/Customers/GetCustomer')
            .then(res => res.json())
            .then(json => {
                let list = json.map(customer => {
                    return { value: customer.id, display: customer.name }
                });
                this.setState({
                    customerList: [{ value: '', display: '(Select a customer)' }].concat(list)
                });
            });
                    //forEach(({ id, name }) => list.push({ id, name }));
                //let uniqueSet = [...new Set(list.map(customer => customer.name))];
                
               
        fetch('api/Products/GetProduct')
            .then(res => res.json())
            .then(json => {
                let list = json.map(p => {
                    return { value: p.id, display: p.name }
                });
                this.setState({
                    productList: [{ value: '', display: '(Select a product)' }].concat(list)
                });
                //let list = [];
                //json.forEach(({ id, name }) => list.push({ id, name }));
                //let uniqueSet = [...new Set(list.map(customer => customer.name))];
                //let sortedList = uniqueSet.sort()
                //    .map((name, index) => <option key={index}>{name}</option>);
                //this.setState({ productList: sortedList });
            });
        fetch('api/Store/GetStore')
            .then(res => res.json())
            .then(json => {
                let list = json.map(s => {
                    return { value: s.id, display: s.name }
                });
                this.setState({
                    storeList: [{ value: '', display: '(Select a store)' }].concat(list)
                });
                //let list = [];
                //json.forEach(({ id, name }) => list.push({ id, name }));
                //let uniqueSet = [...new Set(list.map(customer => customer.name))];
                //let sortedList = uniqueSet.sort()
                //    .map((name, index) => <option key={index}>{name}</option>);
                //this.setState({ storeList: sortedList });
            });
    }  


    render() {

        return (
            <div className="popup">
                <form className="popup_inner" id="createedit" onSubmit={this.handleSubmit} key="{this.props.salesIs}">
                    <h1>{this.props.formTitle}</h1>
                    <label>Date Sold: </label>
                    <input type="date" id="datesold" name="Datesold" value={this.state.dateSold} onChange={this.handleChange} />
                    <br />
                    <label>Customer : </label>
                    <select value={this.state.customerId} name="Customer"
                        onChange={this.handleChange}>
                        {this.state.customerList.map((c) => <option key={c.value} value={c.value}>{c.display}</option>)}
                    </select>
                    <br />
                    <label>Product : </label>
                    <select value={this.state.productId} name="Product"
                        onChange={this.handleChange}>
                        {this.state.productList.map((p) => <option key={p.value} value={p.value}>{p.display}</option>)}
                    </select>
                    <br />
                    <label>Store : </label>
                    <select value={this.state.storeId} name="Store"
                        onChange={this.handleChange}>
                        {this.state.storeList.map((s) => <option key={s.value} value={s.value}>{s.display}</option>)}
                    </select>
                    <br />
                    <input class="btn cancel" type="button" value="Cancel" onClick={this.handleCancel}></input>
                    <input class="btn" type="submit" value="submit" />
                </form>
            </div>

        );
    }

}
export default AddSales