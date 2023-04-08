import React, { Fragment, useState } from "react";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";
import { deleteFetch, putFetch } from "../../config/fetchData";

const Datatable = ({ myData, myClass, multiSelectOption, pagination, url, urlUpdate }) => {
    const [open, setOpen] = useState(false);
    const [checkedValues, setCheckedValues] = useState([]);
    const [data, setData] = useState(myData);
    const [title, setTitle] = useState();
    const [categoryId, setCategoryId] = useState(null);
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
            deleteFetch(`${url}`, { id: index.id })
                .then((result) => {
                    if (result.Data === 1) {
                        let arr = del.filter(element => { return element.id !== index.id; })
                        setData(arr);
                        toast.success("Successfully Deleted !");
                    }
                })
                .catch((error) => {
                    toast.error(`${error}`);
                })
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const del = data;
        putFetch(`${url}`, { categoryId: categoryId, title: title })
            .then((result) => {
                if (result.ErrorCode === 0 && result.Data[0] === 1) {
                    let arr = del.map((e) => {
                        if (e.id === categoryId) {
                            return {
                                id: e.id,
                                title: title
                            }
                        } else {
                            return e;
                        }
                    })
                    setData(arr);
                    toast.success("Successfully Update !");
                } else {
                    toast.success("Failed Update !");
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const onOpenModal = (row) => {
        setCategoryId(row.id)
        setOpen(true);
    };

    const onCloseModal = () => {
        setOpen(false);
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
                            onClick={() => { onOpenModal(row) }}
                            className="fa fa-pencil"
                            style={{
                                width: 35,
                                fontSize: 20,
                                padding: 11,
                                color: "rgb(40, 167, 69)",
                            }}
                        ></i>
                        <Modal
                            isOpen={open}
                            toggle={onCloseModal}
                            style={{ overlay: { opacity: 0.1 } }}
                        >
                            <ModalHeader toggle={onCloseModal} >
                                <p className="modal-title f-w-600" style={{ fontSize: "16px", color: "#222222", letterSpacing: "0.05em" }}>
                                    Update Category
                                </p>
                            </ModalHeader>
                            <Form onSubmit={submitHandler}>
                                <ModalBody>
                                    <FormGroup>
                                        <Label htmlFor="recipient-name" className="col-form-label">
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

export default Datatable;
