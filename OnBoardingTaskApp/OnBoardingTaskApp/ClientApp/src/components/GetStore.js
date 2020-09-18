import React from 'react';
import AddStore from './AddStore';

export class GetStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storeList: [],
            showForm: false,
            formTitle: "New Store",
            storeName: null,
            storeAddress: null,
            storeId: 0
        };
        this.loadData = this.loadData.bind(this);
        this.delete = this.delete.bind(this);
        this.CreatePopup = this.CreatePopup.bind(this);
        this.editPopup = this.editPopup.bind(this);
        this.ClearState = this.ClearState.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        fetch('api/Store/GetStore')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    storeList: json,
                })
            });
    }

    editPopup(id) {
        let Data = this.state.storeList.find(data => data.id === id);
        this.setState({
            showForm: true,
            formTitle: "Edit Store",
            storeId: Data.id,
            storeName: Data.name,
            storeAddress: Data.address
        });
    }

    CreatePopup() {
        this.setState({
            showForm: !this.state.showForm,
        });
    }

    ClearState() {
        this.setState({
            storeId: 0,
            storeName: "",
            storeAddress: ""
        });
    }


    delete(id) {
        let Data = this.state.storeList.find(data => data.id === id);
        if (!window.confirm("Do you want to delete store: " + Data.name))
            return;
        else {
            fetch('api/Store/DeleteStore' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        storeList: this.state.storeList.filter((data) => {
                            return (data.id != id);
                        })
                    });
            });
        }
    }

    render() {

        let storeList = this.state.storeList;
        let showForm = this.state.showForm;
        let tableData = null;

        if (storeList !== "") {
            tableData = storeList.map(store =>
                <tr key={store.id}>
                    <td className="two wide">{store.name}</td>
                    <td className="ten wide">{store.address}</td>
                    <td className="four wide">
                        <button class="edit_btn" onClick={() => this.editPopup(store.id)}>Edit</button>
                    </td>

                    <td className="four wide">
                        <button class="delete_btn" onClick={() => this.delete(store.id)}>Delete</button>
                    </td>
                </tr>
            )

        }
        return (
            <React.Fragment>
                <button onClick={this.CreatePopup.bind()}>New Store</button>
                <table className="tablelist">
                    <thead>
                        <tr>
                            <th className="two wide">Name</th>
                            <th className="ten wide">Address</th>
                            <th className="four wide">Actions</th>
                            <th className="four wide">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData}
                    </tbody>
                </table>
                <div>{this.state.showForm && <AddStore clearState={this.ClearState} loadData={this.loadData} togglepopup={this.CreatePopup} showForm={this.state.showForm} formTitle={this.state.formTitle} storeId={this.state.storeId} storeName={this.state.storeName} storeAddress={this.state.storeAddress} />}</div>

            </React.Fragment>
        )
    }
}

export default GetStore