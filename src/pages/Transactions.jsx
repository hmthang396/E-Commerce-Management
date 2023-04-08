import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Fragment } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../components/common/Breadcrumb'
import Datatable4 from '../components/common/Datatable4'
import { getFetch } from '../config/fetchData'
import moment from 'moment'
const checkStatus = (status)=>{
    if(status === "Hoàn thành") return <span className="badge badge-success">Hoàn thành</span>; 
    if(status === "Đang gửi") return <span className="badge badge-primary">Đang gửi</span>;
    if(status === "Đang chờ gửi") return <span className="badge badge-secondary">Đang chờ gửi</span>;
    if(status === "Chờ xác thực") return <span className="badge badge-warning">Chờ xác thực</span>; 
    return <span className="badge badge-danger">Hủy</span>;
};
const Transactions = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        if(data.length < 1){
            getFetch(`/api/server/transaction/all`)
            .then((result) => {
                setData(result.Data.map((element) => {
                    console.log(element);
                    return {
                        order_code: `#${element.Order.code}`,
                        transaction_code: `#${element.code}`,
                        date: moment(element.Order.createdAt).format("DD/MM/yyyy"),
                        payment_method: element.Order.method,
                        //status: checkStatus(element.Order.status),
                        quanlity: (element.quanlity),
                        price: new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(parseFloat(element.price))
                    }
                }))
            })
            .catch((error) => {
            })
        }
    }, []);
    return (
        <Fragment>
            <Breadcrumb title="Orders" parent="Sales" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>Manage Transaction</h5>
                            </CardHeader>
                            <CardBody className="order-datatable">
                                {
                                    data.length > 0 &&
                                    <Datatable4
                                        multiSelectOption={false}
                                        myData={data}
                                        pageSize={10}
                                        pagination={true}
                                        class="-striped -highlight"
                                    />
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default Transactions