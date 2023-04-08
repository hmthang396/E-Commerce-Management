import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../components/common/Breadcrumb'
import Datatable2 from '../components/common/Datatable_Product'
import { getFetch } from '../config/fetchData'

const ProductList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getFetch(`/api/server/product/all`)
      .then((result) => {
        console.log(result.Data)
        let list = result.Data.map((element) => {
          return {
            id: element.id,
            title: element.title,
            status: element.status ? <i className="fa fa-circle font-success f-12" /> : <i className="fa fa-circle font-danger f-12" />,
            brand: element?.Brand?.title,
            category: element.Category.title,
            discount: element.Discount.discount,
            color: element?.Colors.map((color) => {
              return <i key={color.id} className="fa fa-circle f-12" style={{ color: `${color.color}`}} title={color.id}/>
            }),
            images: element?.Colors.map((color) => {
              return (
                <img key={color?.Images[0].id} alt={`${color?.color}`} src={`${process.env.REACT_APP_API_HOST}/Product/${color?.Images[0].src}`} style={{ width: 50, height: 50 }} />
              );
            }),
          }
        })
        setData(list);
      })
  }, []);
  return (
    <Fragment>
      <Breadcrumb title="Product List" parent="Product" />
      <Container fluid="true">
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Product Lists</h5>
              </CardHeader>
              <CardBody>
                <div className="btn-popup pull-right">
                  <Link
                    to={`${process.env.PUBLIC_URL}/products/add-product`}
                    className="btn btn-secondary"
                  >
                    Add Product
                  </Link>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  {
                    data.length > 0 &&
                    <Datatable2
                      multiSelectOption={false}
                      myData={data}
                      pageSize={10}
                      pagination={true}
                      urlDelete={`/api/server/product`}
                      class="-striped -highlight"
                    />
                  }
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default ProductList