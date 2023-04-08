import React, { Fragment, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Breadcrumb from '../components/common/Breadcrumb';
import Datatable from '../components/common/Datatable_Collection';
import { getFetch, postFetch } from '../config/fetchData';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CollectionList = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [brands, setBrands] = useState([]);

    const [title, setTitle] = useState(null);
    const [brandId, setBrandId] = useState(null);
    const [update, setUpdate] = useState(false);
    const onOpenModal = () => {
        setOpen(true);
    };

    const onCloseModal = () => {
        setOpen(false);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setUpdate(true);
        postFetch(`/api/server/collection`, { title, brandId })
            .then((result) => {
                console.log(result);
                if (result.ErrorCode === 0) {
                    setData([...data, {
                        id: result.Data.id,
                        title: result.Data.title,
                        brand: brands.find(e => e.id === result.Data.brandId).title
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
        getFetch(`/api/server/collection/all`)
            .then((result) => {
                if (result.ErrorCode === 0) {
                    let list = result.Data.map((element) => {
                        return {
                            id: element.id,
                            title: element.title,
                            brand: element?.Brand?.title
                        }
                    })
                    setData(list);
                } else {
                    toast.error(`${result.Message}`);
                }
            });
        getFetch(`/api/server/brand/all`)
            .then((result) => {
                setBrands(result.Data);
            })
    }, []);
    return (
        <Fragment>
            <Breadcrumb title="Collections" parent="Collections" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>Collections</h5>
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
                                        Add Collection
                                    </Button>
                                    <Modal isOpen={open} toggle={onCloseModal}>
                                        <ModalHeader toggle={onCloseModal}>
                                            <p className="modal-title f-w-600" style={{ fontSize: "16px", color: "#222222", letterSpacing: "0.05em" }}>
                                                Add Collection
                                            </p>
                                        </ModalHeader>
                                        <Form onSubmit={submitHandler}>
                                            <ModalBody>
                                                <FormGroup>
                                                    <Label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        Title :
                                                    </Label>
                                                    <Input type="text" className="form-control" onChange={(e) => { setTitle(e.target.value) }} />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        Brand :
                                                    </Label>
                                                    <select className="form-control" required onChange={(e) => { setBrandId(e.target.value) }}>
                                                        <option>--Select--</option>
                                                        {
                                                            brands.length > 0 &&
                                                            brands.map((brand) => {
                                                                return <option value={brand.id} key={brand.id}>{brand.title}</option>
                                                            })

                                                        }
                                                    </select>
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
                                            url={`/api/server/collection`}
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

export default CollectionList