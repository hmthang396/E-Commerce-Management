import React, { Fragment, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import Breadcrumb from '../components/common/Breadcrumb'
import Datatable from '../components/common/Datatable_Sub';
import { getFetch, postFetch } from '../config/fetchData';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubCategoryList = () => {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState([]);
    const [title, setTitle] = useState(null);
    const [category, setCategory] = useState(null);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        getFetch(`/api/server/category/all`)
            .then((result) => { setCategories(result.Data); });
        getFetch(`/api/server/subcategory/all`)
            .then((result) => {
                let list = result.Data.map((element) => {
                    return {
                        id: element?.id,
                        title: element?.title,
                        category: element.Category?.title
                    }
                })
                setData(list);

            });
    }, []);
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
        form.append("categoryId", category);
        let accessToken = JSON.parse(localStorage.getItem("userInfo")).accessToken;
        fetch(`${process.env.REACT_APP_API_HOST}/api/server/subcategory`, {
            method: 'POST',
            headers: {
                'x-access-token': accessToken
            },
            body: form
        })
            .then((res) => { return res.json(); })
            .then((res) => {
                console.log(res);
                if (res.ErrorCode === 0) {
                    setData([...data, {
                        id: res.Data.id,
                        title: title,
                        category: categories.filter(element => { return element.id === category; })[0].title,
                    }]);
                    toast.success(`${res.Message}`);
                } else {
                    toast.error(`Code : ${res.ErrorCode} - ${res.Message}`);
                }
                setUpdate(false);
            })
            .catch((error) => {
                console.log(error);
                toast.error(`Code : ${error.ErrorCode} - ${error.Message}`);
                setUpdate(false);
            })
    }
    return (
        <Fragment>
            <Breadcrumb title="Sub Category" parent="Product" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>Sub Category</h5>
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
                                        Add Sub Category
                                    </Button>
                                    <Modal isOpen={open} toggle={onCloseModal}>
                                        <ModalHeader toggle={onCloseModal}>
                                            <p className="modal-title f-w-600" style={{ fontSize: "16px", color: "#222222", letterSpacing: "0.05em" }}>
                                                Add Sub-Category
                                            </p>
                                        </ModalHeader>
                                        <Form onSubmit={submitHandler}>
                                            <ModalBody>
                                                <FormGroup>
                                                    <Label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        Category :
                                                    </Label>
                                                    <select className="form-control" required onChange={(e) => { setCategory(e.target.value) }}>
                                                        <option>--Select--</option>
                                                        {
                                                            categories.length > 0 &&
                                                            categories.map((category) => {
                                                                return <option value={category.id} key={category.id}>{category.title}</option>
                                                            })

                                                        }
                                                    </select>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        Title :
                                                    </Label>
                                                    <Input type="text" className="form-control" required onChange={(e) => { setTitle(e.target.value) }} />
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
                                            url={`/api/server/subcategory`}
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

export default SubCategoryList