import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Fragment } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import Breadcrumb from '../components/common/Breadcrumb'
import Datatable from '../components/common/Datatable_Discount'
import { getFetch, postFetch } from '../config/fetchData'
import Moment from 'react-moment'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Discount = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState(false);

    const [discount, setDiscount] = useState(null);
    const [beginAt, setBeginAt] = useState(null);
    const [endAt, setEndAt] = useState(null);

    const onOpenModal = () => {
        setOpen(true);
    };

    const onCloseModal = () => {
        setOpen(false);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        setUpdate(true);
        postFetch(`/api/server/discount`, { discount, beginAt, endAt })
            .then((result) => {
                if (result.ErrorCode === 0) {
                    setData([...data,{
                        id: result.Data.id,
                        discount: result.Data.discount,
                        status: result.Data.status ? <i className="fa fa-circle font-success f-12" /> : <i className="fa fa-circle font-danger f-12" />,
                        start: <Moment date={result.Data.beginAt} format="DD/MM/YYYY" />,
                        end: <Moment date={result.Data.endAt} format="DD/MM/YYYY" />
                    }])
                    toast.success("Successfully Added !");
                } else {
                    toast.error(`${result.Message}`);
                }
                setUpdate(false);
            })
            .catch((error) => {
                setUpdate(false);
            })
    }

    useEffect(() => {
        getFetch(`/api/server/discount/all`)
            .then((result) => {
                if (result.ErrorCode === 0) {
                    let list = result.Data.map((element) => {
                        return {
                            id: element.id,
                            discount: element.discount,
                            status: element.status ? <i className="fa fa-circle font-success f-12" /> : <i className="fa fa-circle font-danger f-12" />,
                            start: <Moment date={element.beginAt} format="DD/MM/YYYY" />,
                            end: <Moment date={element.endAt} format="DD/MM/YYYY" />
                        }
                    })
                    setData(list);
                } else {
                    toast.error(`${result.Message}`);
                }

            });
    }, [update]);

    return (
        <Fragment>
            <Breadcrumb title="Discounts" parent="Discounts" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>Discounts</h5>
                            </CardHeader>
                            <CardBody>
                                <div className="btn-popup pull-right">
                                    <Button
                                        type="button"
                                        color="primary"
                                        onClick={onOpenModal}
                                        data-toggle="modal"
                                        data-original-title="test"
                                        data-target="#exampleModal"
                                    >
                                        Add Discount
                                    </Button>
                                    <Modal isOpen={open} toggle={onCloseModal}>
                                        <ModalHeader toggle={onCloseModal}>
                                            <p className="modal-title f-w-600" style={{ fontSize: "16px", color: "#222222", letterSpacing: "0.05em" }}>
                                                Add Discount
                                            </p>
                                        </ModalHeader>
                                        <Form onSubmit={submitHandler}>
                                            <ModalBody>
                                                <FormGroup>
                                                    <Label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        Discount :
                                                    </Label>
                                                    <Input type="text"
                                                        className="form-control"
                                                        placeholder='xxxxxxx or 40%'
                                                        required
                                                        onChange={(e) => { setDiscount(e.target.value) }}
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        Starting time :
                                                    </Label>
                                                    <Input type="date"
                                                        className="form-control"
                                                        required
                                                        onChange={(e) => { setBeginAt(e.target.value) }}
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        End time :
                                                    </Label>
                                                    <Input type="date"
                                                        className="form-control"
                                                        required
                                                        onChange={(e) => { setEndAt(e.target.value) }}
                                                    />
                                                </FormGroup>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button
                                                    type="submit"
                                                    color="primary"
                                                    onClick={() => onCloseModal("VaryingMdo")}
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    type="button"
                                                    color="secondary"
                                                    onClick={() => onCloseModal("VaryingMdo")}
                                                >
                                                    Close
                                                </Button>
                                            </ModalFooter>
                                        </Form>
                                    </Modal>
                                </div>
                                <div className="clearfix"></div>
                                <div id="basicScenario" className="product-physical">
                                    {
                                        data.length > 0 && !update &&
                                        <Datatable
                                            myData={data}
                                            multiSelectOption={false}
                                            pageSize={10}
                                            pagination={true}
                                            url={`/api/server/discount`}
                                            class="-striped -highlight"
                                        />
                                    }
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </Fragment>
    )
}

export default Discount