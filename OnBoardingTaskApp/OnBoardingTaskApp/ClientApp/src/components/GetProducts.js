import React from 'react';
import AddProduct from './AddProduct';

export class GetProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            showForm: false,
            formTitle: "New Product",
            productName: null,
            productPrice: null,
            productId: 0
        };
        this.loadData = this.loadData.bind(this);
        this.delete = this.delete.bind(this);
        this.CreatePopup = this.CreatePopup.bind(this);
        this.editPopup = this.editPopup.bind(this);
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
        console.log(this.state.productList);
    }

    editPopup(id) {
        let Data = this.state.productList.find(data => data.id === id);
        this.setState({
            showForm: true,
            formTitle: "Edit Product",
            productId: Data.id,
            productName: Data.name,
            productPrice: Data.Price

        });
    }

    CreatePopup() {
        this.setState({
            showForm: true,
        });
    }

    delete(id) {
        if (!Window.confirm("Do you want to delete product: " + id))
            return;
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
                    <td className="ten wide">{product.Price}</td>
                    <td className="four wide">
                        <button onClick={() => this.editPopup(product.id)}>Edit</button>
                    </td>

                    <td className="four wide">
                        <button onClick={() => this.delete(product.id)}>Delete</button>
                    </td>
                </tr>
            )

        }
        return (
            <React.Fragment>
                <button onClick={this.CreatePopup.bind(this)}>New Product</button>
                <table className="ui striped table">
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
                <div>{<AddProduct showForm={this.state.showForm} formTitle={this.state.formTitle} productId={this.state.productId} productPrice={this.state.productPrice} productName={this.state.productName} />}</div>

            </React.Fragment>
        )
    }
}

export default GetProducts
