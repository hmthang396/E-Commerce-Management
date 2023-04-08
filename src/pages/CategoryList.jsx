import React, { Fragment, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import Breadcrumb from '../components/common/Breadcrumb'
import Datatable from '../components/common/Datatable_Category';
import { getFetch, postFetch } from '../config/fetchData';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryList = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [title, setTitle] = useState(null);
    const [update, setUpdate] = useState(false);

    const onOpenModal = () => {
        setOpen(true);
    };

    const onCloseModal = () => {
        setOpen(false);
    };

    useEffect(() => {
        getFetch(`/api/server/category/all`)
            .then((result) => {
                if (result.ErrorCode === 0) {
                    let list = result.Data.map((element) => {
                        return {
                            id: element.id,
                            title: element.title
                        }
                    })
                    setData(list);
                } else {
                    toast.error(`${result.Message}`);
                }
            })
    }, []);
    const submitHandler = (e) => {
        e.preventDefault();
        setUpdate(true);
        postFetch(`/api/server/category`, { title })
            .then((result) => {
                if (result.ErrorCode === 0) {
                    setData([...data, result.Data]);
                    toast.success(`${result.Message}`);
                } else {
                    toast.error(`${result.Message}`);
                }
                setUpdate(false);
            })
            .catch((error) => {
                toast.error(`${error}`);
                setUpdate(false);
            })
    }
    return (
        <Fragment>
            <Breadcrumb title="Category" parent="Product" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>Categories</h5>
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
                                        Add Category
                                    </Button>
                                    <Modal isOpen={open} toggle={onCloseModal}>
                                        <ModalHeader toggle={onCloseModal}>
                                            <p className="modal-title f-w-600" style={{ fontSize: "16px", color: "#222222", letterSpacing: "0.05em" }}>
                                                Add Category
                                            </p>
                                        </ModalHeader>
                                        <Form onSubmit={submitHandler}>
                                            <ModalBody>
                                                <FormGroup>
                                                    <Label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        Category Name :
                                                    </Label>
                                                    <Input type="text" className="form-control" onChange={(e) => { setTitle(e.target.value) }} />
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
                                            url={`/api/server/category`}
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

export default CategoryList