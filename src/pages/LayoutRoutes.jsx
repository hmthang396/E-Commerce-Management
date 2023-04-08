import React from 'react'
import { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import AddProduct from './AddProduct'
import BrandList from './BrandList'
import CategoryList from './CategoryList'
import CollectionList from './CollectionList'
import Dashboard from './Dashboard'
import DetailProduct from './DetailProduct'
import Discount from './Discount'
import Order from './Order'
import ProductList from './ProductList'
import SubCategoryList from './SubCategoryList'
import Transactions from './Transactions'

const LayoutRoutes = () => {
  return (
    <Fragment>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path={`${process.env.PUBLIC_URL}/dashboard`}
            element={<Dashboard />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/add-product`}
            element={<AddProduct />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/:productId/:colorId`}
            element={<DetailProduct />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/product-list`}
            element={<ProductList />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/category`}
            element={<CategoryList />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/products/sub-category`}
            element={<SubCategoryList />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/brands/list-brands`}
            element={<BrandList />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/collections/list-collections`}
            element={<CollectionList />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/discounts/list-discounts`}
            element={<Discount />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/sales/orders`}
            element={<Order />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/sales/transactions`}
            element={<Transactions />}
          />
        </Route>
      </Routes>
    </Fragment>
  )
}

export default LayoutRoutes