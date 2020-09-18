import React, { Component } from 'react';

class AddStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            formTitle: "Create Store",
            storeName: "",
            storeAddress: "",
            storeId: 0
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
    }

    handleChange(event) {
        if (this.props.storeId > 0) {
            this.setState({
                storeId: this.props.storeId,
                storeName: this.props.storeName,
                storeAddress: this.props.storeAddress
            });
        }
        if (event.target.name == "Name") {
            this.setState({ storeName: event.target.value });
        }
        else {
            this.setState({ storeAddress: event.target.value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const Data = new FormData();
        Data.append('id', this.state.storeId);
        Data.append('name', this.state.storeName);
        Data.append('address', this.state.storeAddress);

        if (this.props.storeId > 0) {
            fetch('api/Store/PutStore', {
                method: 'PUT',
                body: Data
            })
                .then(json => {
                    this.props.togglepopup();
                    this.props.clearState();
                });

        } else {
            fetch('api/Store/PostStore', {
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
            this.props.showForm &&
            <div className="popup">
                <form className="popup_inner" id="createedit" onSubmit={this.handleSubmit} key="{this.props.storeId}">
                    <h1>{this.props.formTitle}</h1>
                    <label>Name: </label>
                    <input type="text" id="name" name="Name" defaultValue={this.props.storeName} onChange={this.handleChange} />

                    <label>Address : </label>
                    <input type="text" id="address" name="Address" defaultValue={this.props.storeAddress} onChange={this.handleChange}></input>
                    <input class="btn cancel" type="button" value="Cancel" onClick={this.handleCancel}></input>
                    <input class="btn" type="submit" value="submit" />
                </form>
            </div>

        );
    }

}
export default AddStore