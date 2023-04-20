
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, { Fragment, useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Breadcrumb from '../components/common/Breadcrumb';
import { getFetch, putFetch } from '../config/fetchData';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TYPES } from '../constants/type';

const DetailProduct = () => {
    const navigate = useNavigate();
    let { productId } = useParams();
    let { colorId } = useParams();

    const [display, setDisplay] = useState(false);
    const [categories, setCategories] = useState(null);
    const [subCategories, setSubCategories] = useState(null);
    const [brands, setBrands] = useState(null);
    const [collections, setCollections] = useState(null);

    const [dummyimgs, setDummyimgs] = useState([
        { img: null },
        { img: null },
        { img: null },
        { img: null },
        { img: null },
        { img: null },
    ]);
    const [quantity, setQuantity] = useState(1);

    const [files, setFiles] = useState([]);
    const [file, setFile] = useState();
    const [title, setTitle] = useState(null);
    const [price, setPrice] = useState(0);
    const [status, setStatus] = useState(true);
    const [news, setNews] = useState(true);
    const [stock, setStock] = useState(1);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(null);
    const [subCategory, setSubCategory] = useState(null);
    const [brand, setBrand] = useState(null);
    const [collection, setCollection] = useState(null);
    const [color, setColor] = useState(null);
	const [type, setType] = useState(null);

    useEffect(() => {
        if (!categories) {
            getFetch("/api/server/category/all")
                .then((data) => { setCategories(data.Data); });
        }

        if (!brands) {
            getFetch("/api/server/brand/all")
                .then((data) => { setBrands(data.Data); });
        }

        getFetch(`/api/server/product/${productId}/${colorId}`)
            .then((result) => {
                if (result.ErrorCode === 0 && result.Data) {
                    setDisplay(true);
                    let colorFilter = result.Data.Images.filter(element => { return element.Variant.colorId == colorId });
                    setDummyimgs(colorFilter.map((element) => {
                        return {
                            img: `${process.env.REACT_APP_API_HOST}/Product/${element.src}`,
                            id: element.id
                        }
                    }));
                    setTitle(result.Data.title);
                    setPrice(result.Data.Colors[0].price);
                    setCategory(result.Data.categoryId);
                    setSubCategory(result.Data.subCategoryId);
                    setBrand(result.Data.brandId);
                    setCollection(result.Data.collectionId);
                    setColor(result.Data.Colors[0].color);
                    setStatus(result.Data.status);
                    setNews(result.Data.isNew);
                    setQuantity(result.Data.Colors[0].stock)
                    setDescription(result.Data.description);
                    setType(result.Data.type);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        if (category) {
            getFetch(`/api/server/subcategory/all/${category}`, "GET")
                .then((data) => { setSubCategories(data.Data); });
        }
    }, [category])

    useEffect(() => {
        if (brand) {
            getFetch(`/api/server/collection/all/${brand}`, "GET")
                .then((data) => { setCollections(data.Data); });
        }
    }, [brand])

    const _handleImgChange = (e, i, img) => {
        e.preventDefault();
        let reader = new FileReader();
        const image = e.target.files[0];
        files.push(e.target.files[0]);
        setFile(files);
        reader.onload = () => {
            dummyimgs[i].img = reader.result;
            setFile({ file: file });
            setDummyimgs(dummyimgs);
        };
        reader.readAsDataURL(image);

        const data = new FormData();
        let accessToken = JSON.parse(localStorage.getItem("userInfo")).accessToken;
        data.append("file", e.target.files[0]);
        data.append("imageId", img.id);

        fetch(`${process.env.REACT_APP_API_HOST}/api/server/image`, {
            method: "put",
            headers: {
                'x-access-token': accessToken
            },
            body: data
        }).then(response => {
            let res = response.json();
            return res;
        }).then(response => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    };

    const categoryChangeHandler = (e) => {
        setCategory(e.target.value);
    };

    const brandChangeHandler = (e) => {
        setBrand(e.target.value);
    };

    const statusChangeHandler = () => {
        let a = document.getElementsByName("rdo-ani");
        setStatus(a[0].checked);
    };

    const newsChangeHandler = () => {
        let a = document.getElementsByName("rdo-ani1");
        setNews(a[0].checked);
    };

    const IncrementItem = () => {
        if (quantity < 9) {
            setQuantity(quantity + 1);
            setStock(quantity + 1);
        } else {
            return null;
        }
    };

    const DecreaseItem = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
            setStock(quantity - 1);
        } else {
            return null;
        }
    };

    const handleChange = (event) => {
        setStock(event.target.value);
        setQuantity(event.target.value);
    };

    const handleValidSubmit = (e) => {
        e.preventDefault();
        putFetch(`/api/server/product`, { title,type, description, price, sale: status, stock, news, productId, colorId, categoryId: category, subCategoryId: subCategory, brandId: brand, collectionId: collection, color })
            .then((result) => {
                console.log(result);
                navigate(`${process.env.PUBLIC_URL}/products/product-list`);
            })
            .catch((error) => {
                toast.error(`Error!!!`);
            })
    };
    return (
        <Fragment>
            <Breadcrumb title="Update Product" parent="Product" />
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>Update Product</h5>
                            </CardHeader>
                            {
                                display &&
                                <CardBody>
                                    <Row className="product-adding">
                                        <Col xl="5">
                                            <div className="add-product">
                                                <Row>
                                                    <Col xl="9 xl-50" sm="6 col-9">
                                                        <img
                                                            src={(dummyimgs[0] ? dummyimgs[0].img : null)}
                                                            alt=""
                                                            className="img-fluid image_zoom_1 blur-up lazyloaded"
                                                        />
                                                    </Col>
                                                    <Col xl="3 xl-50" sm="6 col-3">
                                                        <ul className="file-upload-product">
                                                            {dummyimgs.map((res, i) => {
                                                                return (
                                                                    <li key={i}>
                                                                        <div className="box-input-file">
                                                                            <Input
                                                                                className="upload"
                                                                                type="file"
                                                                                onChange={(e) => _handleImgChange(e, i, res)}
                                                                            />
                                                                            <img
                                                                                alt=""
                                                                                src={res.img}
                                                                                style={{ width: 50, height: 50 }}
                                                                            />
                                                                        </div>
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col xl="7">
                                            <Form
                                                className="needs-validation add-product-form"
                                                onSubmit={handleValidSubmit}
                                            >
                                                <div className="form form-label-center">
                                                    <FormGroup className="form-group mb-3 row">
                                                        <Label className="col-xl-3 col-sm-4 mb-0">
                                                            Title
                                                        </Label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <Input
                                                                className="form-control"
                                                                name="title"
                                                                id="title"
                                                                type="text"
                                                                required
                                                                onChange={(e) => { setTitle(e.target.value); }}
                                                                value={title}
                                                            />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </FormGroup>
                                                    <FormGroup className="form-group mb-3 row">
                                                        <Label className="col-xl-3 col-sm-4 mb-0">
                                                            Price
                                                        </Label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <Input
                                                                className="form-control mb-0"
                                                                name="price"
                                                                id="price"
                                                                type="number"
                                                                required
                                                                onChange={(e) => { setPrice(e.target.value); }}
                                                                value={price}
                                                            />
                                                        </div>
                                                        <div className="valid-feedback" >Looks good!</div>
                                                    </FormGroup>
                                                </div>
                                                <FormGroup className="form-group row">
                                                    <Label className="col-xl-3 col-sm-4 mb-0">
                                                        Category
                                                    </Label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <select
                                                            className="form-control digits"
                                                            id="category"
                                                            name="category"
                                                            onChange={categoryChangeHandler}
                                                        >
                                                            <option value={null} key={null}>{`Choose Your Category`}</option>
                                                            {categories &&
                                                                categories.map((element) => {
                                                                    if (element.id === category) {
                                                                        return (<option selected value={element.id} key={element.id}>{element.title}</option>);
                                                                    } else {
                                                                        return (<option value={element.id} key={element.id}>{element.title}</option>);
                                                                    }
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </FormGroup>
                                                <FormGroup className="form-group row">
                                                    <Label className="col-xl-3 col-sm-4 mb-0">
                                                        Sub-Category
                                                    </Label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <select
                                                            className="form-control digits"
                                                            id="subCategory"
                                                            name="subCategory"
                                                            onChange={(e) => { setSubCategory(e.target.value); }}
                                                        >
                                                            <option value={null} key={null}>{`Choose Your Sub-Category`}</option>
                                                            {subCategories &&
                                                                subCategories.map((element) => {
                                                                    if (element.id === subCategory) {
                                                                        return (<option selected value={element.id} key={element.id}>{element.title}</option>);
                                                                    } else {
                                                                        return (<option value={element.id} key={element.id}>{element.title}</option>);
                                                                    }
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </FormGroup>
                                                <FormGroup className="form-group row">
                                                    <Label className="col-xl-3 col-sm-4 mb-0">
                                                        Brand
                                                    </Label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <select
                                                            className="form-control digits"
                                                            id="brand"
                                                            name="brand"
                                                            onChange={brandChangeHandler}
                                                        >
                                                            <option value={null} key={null}>{`Choose Your Brand`}</option>
                                                            {brands &&
                                                                brands.map((element) => {
                                                                    if (element.id === brand) {
                                                                        return (<option selected value={element.id} key={element.id}>{element.title}</option>);
                                                                    } else {
                                                                        return (<option value={element.id} key={element.id}>{element.title}</option>);
                                                                    }

                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </FormGroup>
                                                <FormGroup className="form-group row">
                                                    <Label className="col-xl-3 col-sm-4 mb-0">
                                                        Collection
                                                    </Label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <select
                                                            className="form-control digits"
                                                            id="collection"
                                                            name="collection"
                                                            onChange={(e) => { setCollection(e.target.value); }}
                                                        >
                                                            <option value={null} key={null}>{`Choose Your Collection`}</option>
                                                            {collections &&
                                                                collections.map((element) => {
                                                                    if (element.id === collection) {
                                                                        return (<option selected value={element.id} key={element.id}>{element.title}</option>);
                                                                    } else {
                                                                        return (<option value={element.id} key={element.id}>{element.title}</option>);
                                                                    }

                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </FormGroup>
                                                <FormGroup className="form-group row">
                                                    <Label className="col-xl-3 col-sm-4 mb-0">
                                                        Color
                                                    </Label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <Input
                                                            className="form-control"
                                                            name="color"
                                                            id="color"
                                                            type="color"
                                                            required
                                                            value={color}
                                                            onChange={(e) => { setColor(e.target.value); }}
                                                        />
                                                    </div>
                                                </FormGroup>
                                                <FormGroup className="form-group row">
                                                    <Label className="col-xl-3 col-sm-4 mb-0">
                                                        Type
                                                    </Label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <select
                                                            className="form-control digits"
                                                            id="collection"
                                                            name="collection"
                                                            onChange={(e) => { setType(e.target.value); }}
                                                        >
                                                            <option value={null} key={null}>{`Choose Your Type`}</option>
                                                            {TYPES &&
                                                                TYPES.map((element) => {
                                                                    if (element.value === type) {
                                                                        return (<option selected value={element.value} key={element.id}>{element.title}</option>);
                                                                    } else {
                                                                        return (<option value={element.value} key={element.id}>{element.title}</option>);
                                                                    }
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </FormGroup>
                                                <FormGroup className="form-group row">
                                                    <Label className="col-xl-3 col-sm-4 mb-0">
                                                        Status
                                                    </Label>
                                                    <div className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated col-xl-8 col-sm-7">
                                                        <Label className="d-block">
                                                            <Input
                                                                className="radio_animated"
                                                                id="edo-ani"
                                                                type="radio"
                                                                name="rdo-ani"
                                                                onChange={statusChangeHandler}
                                                                checked={status}
                                                            />
                                                            Enable
                                                        </Label>
                                                        <Label className="d-block">
                                                            <Input
                                                                className="radio_animated"
                                                                id="edo-ani1"
                                                                type="radio"
                                                                name="rdo-ani"
                                                                onChange={statusChangeHandler}
                                                                checked={!status}
                                                            />
                                                            Disable
                                                        </Label>
                                                    </div>
                                                </FormGroup>
                                                <FormGroup className="form-group row">
                                                    <Label className="col-xl-3 col-sm-4 mb-0">
                                                        New
                                                    </Label>
                                                    <div className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated col-xl-8 col-sm-7">
                                                        <Label className="d-block">
                                                            <Input
                                                                className="radio_animated"
                                                                id="edo-ani"
                                                                type="radio"
                                                                name="rdo-ani1"
                                                                onChange={newsChangeHandler}
                                                                checked={news}
                                                            />
                                                            Enable
                                                        </Label>
                                                        <Label className="d-block">
                                                            <Input
                                                                className="radio_animated"
                                                                id="edo-ani1"
                                                                type="radio"
                                                                name="rdo-ani1"
                                                                onChange={newsChangeHandler}
                                                                checked={!news}
                                                            />
                                                            Disable
                                                        </Label>
                                                    </div>
                                                </FormGroup>
                                                <FormGroup className="form-group row">
                                                    <Label className="col-xl-3 col-sm-4 mb-0">
                                                        Total Products
                                                    </Label>
                                                    <fieldset className="qty-box ml-0 ">
                                                        <div className="input-group bootstrap-touchspin">
                                                            <div className="input-group-prepend">
                                                                <Button
                                                                    className="btn btn-primary btn-square bootstrap-touchspin-down"
                                                                    type="button"
                                                                    onClick={DecreaseItem}
                                                                >
                                                                    <i className="fa fa-minus"></i>
                                                                </Button>
                                                            </div>
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text bootstrap-touchspin-prefix"></span>
                                                            </div>
                                                            <Input
                                                                className="touchspin form-control input-group-prepend"
                                                                type="text"
                                                                value={quantity}
                                                                onChange={handleChange}
                                                                style={{ "height": "auto" }}
                                                            />
                                                            <div className="input-group-append">
                                                                <span className="input-group-text bootstrap-touchspin-postfix"></span>
                                                            </div>
                                                            <div className="input-group-append ml-0">
                                                                <Button
                                                                    className="btn btn-primary btn-square bootstrap-touchspin-up"
                                                                    type="button"
                                                                    onClick={IncrementItem}
                                                                >
                                                                    <i className="fa fa-plus"></i>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                </FormGroup>
                                                <FormGroup className="form-group row">
                                                    <Label className="col-xl-3 col-sm-4">
                                                        Add Description
                                                    </Label>
                                                    <div className="col-xl-8 col-sm-7 description-sm">
                                                        {/* {
															<CKEditors
																activeClass="p10"
																events={{
																	"blur": onBlur,
																	"afterPaste": afterPaste,
																	"change": onChange
																}}
															/>
														} */}
                                                        <CKEditor
                                                            editor={ClassicEditor}
                                                            data={description}
                                                            onReady={editor => {
                                                                // You can store the "editor" and use when it is needed.
                                                                console.log('Editor is ready to use!', editor);
                                                            }}
                                                            onChange={(event, editor) => {
                                                                const data = editor.getData();
                                                                setDescription(data)
                                                                console.log({ event, editor, data });
                                                            }}
                                                            onBlur={(event, editor) => {
                                                                console.log('Blur.', editor);
                                                            }}
                                                            onFocus={(event, editor) => {
                                                                console.log('Focus.', editor);
                                                            }}
                                                        />
                                                    </div>
                                                </FormGroup>
                                                <div className="offset-xl-3 offset-sm-4">
                                                    <Button type="submit" color="primary">
                                                        Add
                                                    </Button>
                                                    <Button type="button" color="light">
                                                        Discard
                                                    </Button>
                                                </div>
                                            </Form>
                                        </Col>
                                    </Row>
                                </CardBody>
                            }

                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default DetailProduct