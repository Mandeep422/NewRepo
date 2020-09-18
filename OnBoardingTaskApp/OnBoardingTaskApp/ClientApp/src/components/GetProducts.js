import React from 'react';
import AddProduct from './AddProduct';

export class GetProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            showForm: false,
            formTitle: "Create Product",
            productName: "",
            productPrice: null,
            productId: 0
        };
        this.loadData = this.loadData.bind(this);
        this.delete = this.delete.bind(this);
        this.CreatePopup = this.CreatePopup.bind(this);
        this.editPopup = this.editPopup.bind(this);
        this.ClearState = this.ClearState.bind(this);
        this.baseState = this.state
    }

    resetForm = () => {
        this.setState(this.baseState)
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        fetch('api/Products/GetProduct')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    productList: json,
                })
            });
    }

    editPopup(id) {
        let Data = this.state.productList.find(data => data.id === id);
        this.setState({
            showForm: !this.state.showForm,
            formTitle: "Edit Product",
            productId: Data.id,
            productName: Data.name,
            productPrice: Data.price

        });
        console.log("the price is " + this.state.productPrice);
    }

    CreatePopup() {
        this.setState({
            showForm: !this.state.showForm,
        });
    }

    ClearState() {
        //this.setState({
        //    productId: 0,
        //    productName: "",
        //    productPrice:0
        //});
    }


    delete(id) {
        let Data = this.state.productList.find(data => data.id === id);
        if (!window.confirm("Do you want to delete product: " + Data.name))            return;
        else {
            fetch('api/Products/DeleteProduct/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        productList: this.state.productList.filter((data) => {
                            return (data.id != id);
                        })
                    });
            });
        }
    }

    render() {

        let productList = this.state.productList;
        let showForm = this.state.showForm;
        let tableData = null;

        if (productList !== "") {
            tableData = productList.map(product =>
                <tr key={product.id}>
                    <td className="two wide">{product.name}</td>
                    <td className="ten wide">{product.price}</td>
                    <td className="four wide">
                        <button class="edit_btn" onClick={() => this.editPopup(product.id)}>Edit</button>
                    </td>

                    <td className="four wide">
                        <button class="delete_btn" onClick={() => this.delete(product.id)}>Delete</button>
                    </td>
                </tr>
            )

        }
        return (
            <React.Fragment>
                <button onClick={this.CreatePopup.bind(this)}>New Product</button>
                <table className="tablelist">
                    <thead>
                        <tr>
                            <th className="two wide">Name</th>
                            <th className="ten wide">Price</th>
                            <th className="four wide">Actions</th>
                            <th className="four wide">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData}
                    </tbody>
                </table>
                <div>{this.state.showForm && <AddProduct clearState={this.resetForm} loadData={this.loadData} togglepopup={this.CreatePopup} showForm={this.state.showForm} formTitle={this.state.formTitle} productId={this.state.productId} productPrice={this.state.productPrice} productName={this.state.productName} />}</div>

            </React.Fragment>
        )
    }
}

export default GetProducts
