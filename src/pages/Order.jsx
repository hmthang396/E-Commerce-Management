import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Fragment } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Breadcrumb from '../components/common/Breadcrumb'
import Datatable3 from '../components/common/Datatable_Order'
import { getFetch } from '../config/fetchData'
import Image from '../components/common/Image'
import moment from 'moment'

const checkStatus = (status) => {
    if (status === "Hoàn thành") return <span className="badge badge-success">Hoàn thành</span>;
    if (status === "Đang gửi") return <span className="badge badge-primary">Đang gửi</span>;
    if (status === "Đang chờ gửi") return <span className="badge badge-secondary">Đang chờ gửi</span>;
    if (status === "Xác nhận") return <span className="badge badge-secondary">Xác nhận</span>;
    if (status === "Chờ xác thực") return <span className="badge badge-warning">Chờ xác thực</span>;
    return <span className="badge badge-danger">Hủy</span>;
};

const Order = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        if (data.length < 1) {
            getFetch(`/api/server/order/all`)
                .then((result) => {
                    console.log(result.Data);
                    setData(result.Data.map((element) => {
                        return {
                            order_code: `#${element.code}`,
                            image: <Image data={element.Products} />,
                            status: checkStatus(element.status),
                            payment_method: element.method,
                            date: moment(element.createdAt).format("DD/MM/yyyy"),
                            total: new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(parseFloat(element.total))
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
                                <h5>Manage Order</h5>
                            </CardHeader>
                            <CardBody className="order-datatable">
                                {
                                    data.length > 0 &&
                                    <Datatable3
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

export default Order