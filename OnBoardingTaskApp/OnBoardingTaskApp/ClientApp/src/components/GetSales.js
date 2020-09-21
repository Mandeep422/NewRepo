import React from 'react';
import AddSales from './AddSales';
import { Pagination } from 'semantic-ui-react';

export class GetSales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            salesList: [],
            showForm: false,
            formTitle: "Create Sale",
            customerName: "Select customer",
            productName: "Select product",
            storeName: "Select store",
            salesId:0,
            customerId: 0,
            productId: 0,
            storeId: 0,
            dateSold: new Date(),

            salesDatas: [],
            begin: 0,
            end: 5,
            activePage: 1
        };
        this.loadData = this.loadData.bind(this);
        this.delete = this.delete.bind(this);
        this.CreatePopup = this.CreatePopup.bind(this);
        this.editPopup = this.editPopup.bind(this);
        this.ClearState = this.ClearState.bind(this);
        this.baseState = this.state
        this.onPaginate = this.onPaginate.bind(this);
    }

    async onPaginate(event,
        data) {
        await this.setState({ activePage: data.activePage });
        await this.setState({ begin: this.state.activePage * 5 - 5 });
        await this.setState({ end: this.state.activePage * 5 });
        this.setState({
            salesDatas: this.state.salesList.slice(this.state.begin, this.state.end),
        });
    }

    resetForm = () => {
        this.setState(this.baseState)
    }

    async componentDidMount() {
        this.setState({ salesList: [] });
        await this.loadData();
        this.setState({
            salesDatas: this.state.salesList.slice(this.state.begin, this.state.end),
        });
    }

    editPopup(id) {
        console.log("inside edit");
        let Data = this.state.salesList.find(data => data.id === id);
        this.setState({
            showForm: true,
            formTitle: "Edit Sales",
            salesId: Data.id,
            customerId: Data.customerId,
            productId: Data.productId,
            storeId: Data.storeId,
            dateSold: Data.dateSold.split('T')[0]
        });
        console.log("inside edit" + this.state.salesId);
    }

    CreatePopup() {
        this.setState({
            showForm: !this.state.showForm,
        });
    }

    ClearState() {
        ////this.setState({
        ////    salesId: 0,
        ////    customerId: 0,
        ////    productId: 0,
        ////    storeId:0
        ////});
    }

    async loadData() {
        await fetch('api/Sales/GetSales')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    salesList: json,
                })
            });
    }

    delete(id) {
        let Data = this.state.salesList.find(data => data.id === id);
        if (!window.confirm("Do you want to delete sale: "))
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

        let salesList = this.state.salesDatas;
        let showForm = this.state.showForm;
        let tableData = null;

        if (salesList !== "") {
            tableData = salesList.map(sale =>
                <tr key={sale.id}>
                    <td className="two wide">{sale.customerName}</td>
                    <td className="ten wide">{sale.productName}</td>
                    <td className="two wide">{sale.storeName}</td>
                    <td className="ten wide">{sale.dateSold.split('T')[0]}</td>
                    <td className="four wide">
                        <button class="edit_btn" onClick={() => this.editPopup(sale.id)}>Edit</button>
                    </td>

                    <td className="four wide">
                        <button class="delete_btn" onClick={() => this.delete(sale.id)}>Delete</button>
                    </td>
                </tr>
            )

        }
        return (
            <React.Fragment>
                <button onClick={this.CreatePopup.bind(this)}>New Sale</button>
                <table className="tablelist">
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
                <Pagination className="pagination"
                    defaultActivePage={1}
                    activePage={this.state.activePage}
                    totalPages={Math.ceil(this.state.salesList.length / 5)}
                    onPageChange={this.onPaginate}
                />
                <div>{this.state.showForm && <AddSales clearState={this.resetForm} loadData={this.loadData} togglepopup={this.CreatePopup} showForm={this.state.showForm} formTitle={this.state.formTitle} salesId={this.state.salesId} customerId={this.state.customerId} productId={this.state.productId} storeId={this.state.storeId} dateSold={this.state.dateSold} />}</div>

            </React.Fragment>
        )
    }
}
export default GetSales

