import React, { Fragment, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Breadcrumb from '../components/common/Breadcrumb';
import Datatable from '../components/common/Datatable_Brand';
import { getFetch, postFetch } from '../config/fetchData';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BrandList = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [title, setTitle] = useState(null);
    const [update, setUpdate] = useState(false);
    const [file, setFile] = useState(null);
    const onOpenModal = () => {
        setOpen(true);
    };

    const onCloseModal = () => {
        setOpen(false);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setUpdate(true);
        let form = new FormData();
        form.append("title", title);
        form.append("file", file);
        let accessToken = JSON.parse(localStorage.getItem("userInfo")).accessToken;
        fetch(`${process.env.REACT_APP_API_HOST}/api/server/brand`, {
            method: 'POST',
            headers: {
                'x-access-token': accessToken
            },
            body: form
        })
            .then((res) => { return res.json(); })
            .then((result) => {
                if (result.ErrorCode === 0) {
                    setData([...data, {
                        id: result.Data.id,
                        icon: <img src={`${process.env.REACT_APP_API_HOST}/Icon/${result.Data.icon}`} style={{ width: 50, height: 50 }} />,
                        title: result.Data.title
                    }]);
                    toast.success("Successfully Added !");
                } else {
                    toast.error(`${result.Message}`);
                }
                setUpdate(false);
            })
            .catch((error) => {
                setUpdate(false);
            })
    };

    useEffect(() => {
        getFetch(`/api/server/Brand/all`)
            .then((result) => {
                if (result.ErrorCode === 0) {
                    let list = result.Data.map((element) => {
                        return {
                            id: element.id,
                            icon: <img src={`${process.env.REACT_APP_API_HOST}/Icon/${element.icon}`} style={{ width: 50, height: 50 }} />,
                            title: element.title
                        }
                    })
                    setData(list);
                } else {
                    toast.error(`${result.Message}`);
                }
            })
    }, []);
    return (
        <Fragment>
            <Breadcrumb title="Brands" parent="Brands" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>Brands</h5>
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
                                        Add Brand
                                    </Button>
                                    <Modal isOpen={open} toggle={onCloseModal}>
                                        <ModalHeader toggle={onCloseModal}>
                                            <p className="modal-title f-w-600" style={{ fontSize: "16px", color: "#222222", letterSpacing: "0.05em" }}>
                                                Add Brand
                                            </p>
                                        </ModalHeader>
                                        <Form onSubmit={submitHandler}>
                                            <ModalBody>
                                                <FormGroup>
                                                    <Label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        Brand Name :
                                                    </Label>
                                                    <Input type="text" className="form-control" onChange={(e) => { setTitle(e.target.value) }} />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        Icon :
                                                    </Label>
                                                    <Input type="file" className="form-control" required onChange={(e) => { setFile(e.target.files[0]) }} />
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
                                            url={`/api/server/brand`}
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

export default BrandList