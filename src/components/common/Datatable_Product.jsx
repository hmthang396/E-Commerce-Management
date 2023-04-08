import React, { Fragment, useState } from "react";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
} from "reactstrap";
import { deleteFetch, getFetch, postFetch, putFetch } from "../../config/fetchData";
import one from "../../assets/images/pro3/1.jpg";
import user from "../../assets/images/user.png";
import { useNavigate } from "react-router-dom";

const Datatable2 = ({ myData, myClass, multiSelectOption, pagination, urlDelete }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openDiscount, setOpenDiscount] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [checkedValues, setCheckedValues] = useState([]);
    const [data, setData] = useState(myData);
    const [discounts, setDiscounts] = useState([]);
    const [colors, setColors] = useState([]);
    const [discountId, setDiscountId] = useState();

    const [productId, setProductId] = useState(null);
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState();
    const [image, setImage] = useState(one);
    const [stock, setStock] = useState(null);
    const [price, setPrice] = useState(0);
    const [color, setColor] = useState(null);
    const [colorId, setColorId] = useState(null);
    const [dummyimgs, setDummyimgs] = useState([
        { img: one },
        { img: one },
        { img: one },
        { img: one },
        { img: one },
        { img: one },
    ]);

    const _handleImgChange = (e, i) => {
        e.preventDefault();
        let reader = new FileReader();
        const image = e.target.files[0];
        files.push(e.target.files[0]);
        setFile(files);
        reader.onload = () => {
            dummyimgs[i].img = reader.result;
            setFile({ file: file });
            setDummyimgs(dummyimgs);
            setImage(reader.result);
        };
        reader.readAsDataURL(image);
    };

    const handleValidSubmit = (e, index) => {
        e.preventDefault();
        const form = new FormData();
        files.forEach((element) => {
            form.append("files", element);
        });
        form.append("color", color);
        form.append("productId", productId);
        form.append("stock", stock);
        form.append("price", price);

        let accessToken = JSON.parse(localStorage.getItem("userInfo")).accessToken;
        fetch(`/api/server/color`, {
            headers: {
                'x-access-token': accessToken,
            },
            method: "post",
            body: form
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                console.log(res);
                if (res.ErrorCode === 0) {
                    toast.success(`Add Option Success!`);
                    setDummyimgs([
                        { img: one },
                        { img: one },
                        { img: one },
                        { img: one },
                        { img: one },
                        { img: one },
                    ]);
                    setFiles([]);
                    setImage(one);
                    toast.success(`Add Option Success!`);
                } else {
                    toast.success(" Add Option Fail!");
                }
                //navigate(`${process.env.PUBLIC_URL}/products/product-list`);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const handleUpdate = (e, index) => {
        e.preventDefault();
        navigate(`${process.env.PUBLIC_URL}/products/${productId}/${colorId}`);
    };

    const handleValidSubmitDiscount = (e, index) => {
        e.preventDefault();
        const form = new FormData();
        form.append("discountId", discountId);
        form.append("productId", productId);
        putFetch(`/api/server/product/addDiscount`, {
            discountId, productId
        })
            .then(data => {
                if (data.ErrorCode === 0) {
                    toast.success(`Add Discount Success!`);
                } else {
                    toast.success(" Add Discount Fail!");
                }

            })
            .catch((error) => {
                console.log(error);
            })
    };

    const selectRow = (e, i) => {
        if (!e.target.checked) {
            setCheckedValues(checkedValues.filter((item, j) => i !== item));
        } else {
            checkedValues.push(i);
            setCheckedValues(checkedValues);
        }
    };


    const handleRemoveRow = () => {
        const updatedData = myData.filter(function (el) {
            return checkedValues.indexOf(el.id) < 0;
        });
        setData([...updatedData]);
        toast.success("Successfully Deleted !");
    };

    const renderEditable = (cellInfo) => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => {
                    data[cellInfo.index][cellInfo.index.id] = e.target.innerHTML;
                    setData({ myData: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: myData[cellInfo.index][cellInfo.index.id],
                }}
            />
        );
    };

    const handleDelete = (index) => {
        if (window.confirm("Are you sure you wish to delete this item?")) {
            const del = data;
            deleteFetch(`${urlDelete}`, { id: index.id })
                .then((result) => {
                    if (result.Data === 1) {
                        let arr = del.filter(element => { return element.id !== index.id; })
                        setData(arr);
                        toast.success("Successfully Deleted !");
                    } else {
                        toast.success("Failed Deleted !");
                    }
                })
        }
    };
    const onOpenModal = (index) => {
        setProductId(index.id);
        setOpen(true);
    };

    const onCloseModal = () => {
        setOpen(false);
    };
    const onOpenDiscount = (index) => {
        setProductId(index.id);
        setOpenDiscount(true);
        getFetch(`/api/server/discount/allIsEnable`)
            .then((result) => {
                setDiscounts(result.Data);
            })
    };
    const onCloseDiscount = () => {
        setOpenDiscount(false);
    };

    const onOpenUpdate = (index) => {
        setProductId(index.id);
        let dataColor = index.color.map((element, index) => {
            return {
                id: element.props.title,
                color: element.props.style.backgroundColor
            }
        })
        setColors(dataColor);
        setOpenUpdate(true);
    };

    const onCloseUpdate = () => {
        setOpenUpdate(false);
    };

    const Capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const columns = [];
    for (const key in myData[0]) {
        let editable = renderEditable;
        if (key === "image") {
            editable = null;
        }
        if (key === "status") {
            editable = null;
        }
        if (key === "avtar") {
            editable = null;
        }
        if (key === "vendor") {
            editable = null;
        }
        if (key === "order_status") {
            editable = null;
        }

        columns.push({
            name: <b>{Capitalize(key.toString())}</b>,
            header: <b>{Capitalize(key.toString())}</b>,
            selector: row => row[key],
            Cell: editable,
            style: {
                textAlign: "center",
            },
        });
    }

    if (multiSelectOption === true) {
        columns.push({
            name: (
                <button
                    className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
                    onClick={(e) => {
                        if (window.confirm("Are you sure you wish to delete this item?"))
                            handleRemoveRow();
                    }}
                >
                    Delete
                </button>
            ),
            id: "delete",
            accessor: (str) => "delete",
            cell: (row) => (
                <div>
                    <span>
                        <input
                            type="checkbox"
                            name={row.id}
                            defaultChecked={checkedValues.includes(row.id)}
                            onChange={(e) => selectRow(e, row.id)}
                        />
                    </span>
                </div>
            ),
            style: {
                textAlign: "center",
            },
            sortable: false,
        });
    } else {
        columns.push({
            name: <b>Action</b>,
            id: "delete",
            accessor: (str) => "delete",
            cell: (row, index) => (
                <div>
                    <span onClick={() => handleDelete(row)}>
                        <i
                            className="fa fa-trash"
                            title={"Delete"}
                            style={{
                                width: 35,
                                fontSize: 20,
                                padding: 11,
                                color: "#e4566e",
                            }}
                        ></i>
                    </span>

                    <span>
                        <i
                            className="fa fa-pencil-square-o"
                            onClick={() => { onOpenUpdate(row) }}
                            title={"Update"}
                            style={{
                                width: 35,
                                fontSize: 20,
                                padding: 11,
                                color: "rgb(40, 167, 69)",
                            }}
                        ></i>
                        <Modal
                            isOpen={openUpdate}
                            toggle={onCloseUpdate}
                            style={{ overlay: { opacity: 0.1 } }}
                        >
                            <ModalHeader toggle={onCloseUpdate}>
                                <p className="modal-title f-w-600" style={{ fontSize: "16px", color: "#222222", letterSpacing: "0.05em" }}>
                                    Choice Product To Update
                                </p>
                            </ModalHeader>
                            <Form onSubmit={(e) => { handleUpdate(e, row) }}>
                                <ModalBody>
                                    <FormGroup>
                                        <Label htmlFor="recipient-name" className="col-form-label">
                                            Color :
                                        </Label>
                                        <select
                                            className="form-control digits"
                                            onChange={(e) => { setColorId(e.target.value) }}
                                        >
                                            <option value={null} key={null}>{`Choose Your Color`}</option>
                                            {colors &&
                                                colors.map((element) => {
                                                    return (<option value={element.id} key={element.id} style={{ color: `${element.color}` }}>
                                                        {element.color}
                                                    </option>);
                                                })
                                            }
                                        </select>
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        onClick={() => onCloseUpdate()}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        type="button"
                                        color="secondary"
                                        onClick={() => onCloseUpdate()}
                                    >
                                        Close
                                    </Button>
                                </ModalFooter>
                            </Form>
                        </Modal>
                    </span>

                    <span>
                        <i
                            onClick={() => { onOpenModal(row) }}
                            className="fa fa-plus-circle"
                            style={{
                                width: 35,
                                fontSize: 20,
                                padding: 11,
                                color: "#fe00fd",
                            }}
                        ></i>
                        <Modal
                            isOpen={open}
                            toggle={onCloseModal}
                            style={{ overlay: { opacity: 0.1 } }}
                        >
                            <ModalHeader toggle={onCloseModal}>
                                <p className="modal-title f-w-600" style={{ fontSize: "16px", color: "#222222", letterSpacing: "0.05em" }}>
                                    Add Color For Product
                                </p>
                            </ModalHeader>
                            <Form onSubmit={(e) => { handleValidSubmit(e, row) }}>
                                <ModalBody>
                                    <FormGroup>
                                        <Label htmlFor="recipient-name" className="col-form-label">
                                            Color :
                                        </Label>
                                        <Input
                                            type="color"
                                            className="form-control"
                                            required
                                            onChange={(e) => { setColor(e.target.value); }} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="recipient-name" className="col-form-label">
                                            Price :
                                        </Label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            required
                                            onChange={(e) => { setPrice(e.target.value); }} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="recipient-name" className="col-form-label">
                                            Stock :
                                        </Label>
                                        <Input
                                            type="number"
                                            className="form-control"
                                            required
                                            min={0}
                                            onChange={(e) => { setStock(e.target.value); }} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="message-text" className="col-form-label">
                                            Image :
                                        </Label>
                                        <Row className="product-adding">
                                            <Col xl="12">
                                                <div className="add-product">
                                                    <Row>
                                                        <Col xl="3 xl-50" sm="6 col-3">
                                                            <ul className="file-upload-product">
                                                                {dummyimgs.map((res, i) => {
                                                                    return (
                                                                        <li key={i}>
                                                                            <div className="box-input-file">
                                                                                <Input
                                                                                    className="upload"
                                                                                    type="file"
                                                                                    onChange={(e) => _handleImgChange(e, i)}
                                                                                />
                                                                                <img
                                                                                    alt=""
                                                                                    src={res.img}
                                                                                    style={{ width: 50, height: 50 }}
                                                                                />
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </Col>
                                                        <Col xl="9 xl-50" sm="6 col-9">
                                                            <img
                                                                src={(image ? image : one)}
                                                                alt=""
                                                                className="img-fluid image_zoom_1 blur-up lazyloaded"
                                                            />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        onClick={() => onCloseModal("VaryingMdo")}
                                    >
                                        Update
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
                    </span>

                    <span>
                        <i
                            onClick={() => { onOpenDiscount(row) }}
                            className="fa fa-tag"
                            style={{
                                width: 35,
                                fontSize: 20,
                                padding: 11,
                                color: "blue",
                            }}
                        ></i>
                        <Modal
                            isOpen={openDiscount}
                            toggle={onCloseDiscount}
                            style={{ overlay: { opacity: 0.1 } }}
                        >
                            <ModalHeader toggle={onCloseDiscount}>
                                <p className="modal-title f-w-600" style={{ fontSize: "16px", color: "#222222", letterSpacing: "0.05em" }}>
                                    Add Discount
                                </p>
                            </ModalHeader>
                            <Form onSubmit={(e) => { handleValidSubmitDiscount(e, index) }}>
                                <ModalBody>
                                    <FormGroup>
                                        <Label htmlFor="recipient-name" className="col-form-label">
                                            Discount :
                                        </Label>
                                        <select
                                            className="form-control digits"
                                            id="category"
                                            name="category"
                                            onChange={(e) => { setDiscountId(e.target.value) }}
                                        >
                                            <option value={null} key={null}>{`Choose Your Category`}</option>
                                            {discounts &&
                                                discounts.map((element) => {
                                                    return (<option value={element.id} key={element.id}>{element.discount}</option>);
                                                })
                                            }
                                        </select>
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        onClick={() => onCloseDiscount("VaryingMdo")}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        type="button"
                                        color="secondary"
                                        onClick={() => onCloseDiscount("VaryingMdo")}
                                    >
                                        Close
                                    </Button>
                                </ModalFooter>
                            </Form>
                        </Modal>
                    </span>

                </div>
            ),
            style: {
                textAlign: "center",
            },
            sortable: false,
        });
    }
    return (
        <div>
            <Fragment>
                <DataTable
                    data={data}
                    columns={columns}
                    className={myClass}
                    pagination={pagination}
                    striped={true}
                    center={true}
                />

                <ToastContainer />
            </Fragment>
        </div>
    );
};

export default Datatable2;
