import React, { Fragment, useState } from "react";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";
import { putFetch } from "../../config/fetchData";

const Datatable = ({ myData, myClass, multiSelectOption, pagination }) => {
    const [open, setOpen] = useState(false);
    const [checkedValues, setCheckedValues] = useState([]);
    const [data, setData] = useState(myData);
    const [status, setStatus] = useState(null);
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
            del.splice(index, 1);
            setData([...del]);
        }
        toast.success("Successfully Deleted !");
    };

    const onOpenModal = () => {
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
