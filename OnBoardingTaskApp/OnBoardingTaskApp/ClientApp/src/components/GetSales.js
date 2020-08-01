import React from 'react';
import AddSales from './AddSales';

export class GetSales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            salesList: [],
            showForm: false,
            formTitle: "New Sale",
            customerName: null,
            productName: null,
            storeName: null,
            salesId:0,
            customerId: 0,
            productId: 0,
            storeId: 0,
            dateSold: null
        };
        this.loadData = this.loadData.bind(this);
        this.delete = this.delete.bind(this);
        this.CreatePopup = this.CreatePopup.bind(this);
        this.editPopup = this.editPopup.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    editPopup(id) {
        let Data = this.state.salesList.find(data => data.id === id);
        this.setState({
            showForm: true,
            formTitle: "Edit Sales",
            salesId: Data.id,
            customerId: Data.customerId,
            productId: Data.productId,
            storeId: Data.storeId,
            dateSold: Data.datesold
        });
    }

    CreatePopup() {
        this.setState({
            showForm: true,
        });
    }

    loadData() {
        fetch('api/Sales/GetSales')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    salesList: json,
                })
            });
    }

    delete(id) {
        if (!Window.confirm("Do you want to delete sale: " + id))
            return;
        else {
            fetch('api/Sales/DeleteSales/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        salesList: this.state.salesList.filter((data) => {
                            return (data.id != id);
                        })
                    });
            });
        }
    }

    render() {

        let salesList = this.state.salesList;
        let showForm = this.state.showForm;
        let tableData = null;

        if (salesList !== "") {
            tableData = salesList.map(sale =>
                <tr key={sale.id}>
                    <td className="two wide">{sale.customerName}</td>
                    <td className="ten wide">{sale.productName}</td>
                    <td className="two wide">{sale.storeName}</td>
                    <td className="ten wide">{sale.datesold}</td>
                    <td className="four wide">
                        <button onClick={() => this.editPopup(sale.id)}>Edit</button>
                    </td>

                    <td className="four wide">
                        <button onClick={() => this.delete(sale.id)}>Delete</button>
                    </td>
                </tr>
            )

        }
        return (
            <React.Fragment>
                <button onClick={this.CreatePopup.bind(this)}>New Sale</button>
                <table className="ui striped table">
                    <thead>
                        <tr>
                            <th className="two wide">Customer</th>
                            <th className="ten wide">Product</th>
                            <th className="four wide">Store</th>
                            <th className="four wide">Date Sold</th>
                            <th className="four wide">Action</th>
                            <th className="four wide">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {tableData}
                    </tbody>
                </table>
                <div>{<AddSales showForm={this.state.showForm} formTitle={this.state.formTitle} customerId={this.state.customerId} productId={this.state.productId} storeId={this.state.storeId} datesold={this.state.datesold} />}</div>

            </React.Fragment>
        )
    }
}
export default GetSales

