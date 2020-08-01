import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { GetCustomer } from './components/GetCustomer';
import AddCustomer from './components/AddCustomer';
import GetProducts from './components/GetProducts';
import AddProduct from './components/AddProduct';
import GetStore from './components/GetStore';
import GetSales from './components/GetSales';


import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
        <Route exact path='/' component={GetCustomer} />
        <Route path='/AddCustomer' component={AddCustomer} />
        <Route path='/AddProduct' component={AddProduct} />
            <Route path='/GetProducts' component={GetProducts} />
            <Route path='/GetStore' component={GetStore} />
            <Route path='/GetSales' component={GetSales} />

      </Layout>
    );
  }
}
