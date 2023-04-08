import React, { StrictMode, useEffect } from 'react'
import { useState } from 'react';
import { Fragment } from 'react'
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import Breadcrumb from '../components/common/Breadcrumb'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import one from "../assets/images/pro3/1.jpg";
import user from "../assets/images/user.png";
import {TYPES} from '../constants/type';
const fetchData = require('../config/fetchData');

const AddProduct = () => {
	const [files, setFiles] = useState([]);
	const [file, setFile] = useState();
	const [dummyimgs, setDummyimgs] = useState([
		{ img: one },
		{ img: user },
		{ img: user },
		{ img: user },
		{ img: user },
		{ img: user },
	]);
	const navigate = useNavigate();
	const [quantity, setQuantity] = useState(1);

	const [categories, setCategories] = useState(null);
	const [subCategories, setSubCategories] = useState(null);
	const [brands, setBrands] = useState(null);
	const [collections, setCollections] = useState(null);


	const [title, setTitle] = useState(null);
	const [price, setPrice] = useState(0);
	const [status, setStatus] = useState(true);
	const [news, setNews] = useState(true);
	const [tags, setTags] = useState('');
	const [stock, setStock] = useState(1);
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState(null);
	const [subCategory, setSubCategory] = useState(null);
	const [brand, setBrand] = useState(null);
	const [collection, setCollection] = useState(null);
	const [color, setColor] = useState(null);
	const [type, setType] = useState(null);


	// Fetch API
	useEffect(() => {
		if (!brands) {
			fetchData.getFetch("/api/server/brand/all")
				.then((data) => { setBrands(data.Data); });
		}
		if (!categories) {
			fetchData.getFetch("/api/server/category/all")
				.then((data) => { setCategories(data.Data); });
		}
	}, []);

	//
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
		};
		reader.readAsDataURL(image);
	};

	const categoryChangeHandler = (e) => {
		setCategory(e.target.value);
		fetchData.getFetch(`/api/server/subcategory/all/${e.target.value}`, "GET")
			.then((data) => { setSubCategories(data.Data); });
	};
	const brandChangeHandler = (e) => {
		setBrand(e.target.value);
		fetchData.getFetch(`/api/server/collection/all/${e.target.value}`, "GET")
			.then((data) => { setCollections(data.Data); });
	};
	const statusChangeHandler = () => {
		let a = document.getElementsByName("rdo-ani");
		setStatus(a[0].checked);
	}
	const newsChangeHandler = () => {
		let a = document.getElementsByName("rdo-ani1");
		setNews(a[0].checked);
	}
	//
	const onChange = (evt) => {
		console.log("onChange fired with event info: ", evt);
		setDescription(evt.target.value)
		var newContent = evt.editor.getData();
		this.setState({
			content: newContent
		})
	}

	const onBlur = (evt) => {
		console.log("onBlur event called with event info: ", evt);
	}

	const afterPaste = (evt) => {
		console.log("afterPaste event called with event info: ", evt);
	}

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
		const data = new FormData();
		files.forEach((element) => {
			data.append("files", element);
		});
		data.append("title", title);
		data.append("price", price);
		data.append("sale", status);
		data.append("news", news);
		data.append("tags", tags);
		data.append("stock", stock);
		data.append("description", description);
		data.append("categoryId", category);
		data.append("subCategoryId", subCategory);
		data.append("brandId", brand);
		data.append("collectionId", collection);
		data.append("color", color);
		data.append("type", type);
		let accessToken = JSON.parse(localStorage.getItem("userInfo")).accessToken;
		fetch(`${process.env.REACT_APP_API_HOST}/api/server/product`, {
			method: "post",
			headers: {
				'x-access-token': accessToken
			},
			body: data
		})
			.then(response => {
				let res = response.json();
				return res;
			})
			.then(response => {
				navigate(`${process.env.PUBLIC_URL}/products/product-list`);
			})
			.catch((error) => {
				console.log(error);
			})
	};
	return (
		<StrictMode>
			<Fragment>
				<Breadcrumb title="Add Product" parent="Physical" />
				<Container fluid={true}>
					<Row>
						<Col sm="12">
							<Card>
								<CardHeader>
									<h5>Add Product</h5>
								</CardHeader>
								<CardBody>
									<Row className="product-adding">
										<Col xl="5">
											<div className="add-product">
												<Row>
													<Col xl="9 xl-50" sm="6 col-9">
														<img
															src={(dummyimgs[0] ? dummyimgs[0].img : one)}
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
																				onChange={(e) => _handleImgChange(e, i)}
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
																	return (<option value={element.id} key={element.id}>{element.title}</option>);
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
																	return (<option value={element.id} key={element.id}>{element.title}</option>);
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
																	return (<option value={element.id} key={element.id}>{element.title}</option>);
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
																	return (<option value={element.id} key={element.id}>{element.title}</option>);
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
															onChange={(e) => { console.log(e.target.value); setColor(e.target.value); }}
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
																	return (<option value={element.value} key={element.id}>{element.title}</option>);
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
																defaultChecked
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
																defaultChecked
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
															/>
															Disable
														</Label>
													</div>
												</FormGroup>
												<FormGroup className="form-group row">
													<Label className="col-xl-3 col-sm-4 mb-0">Tags</Label>
													<div className='col-xl-8 col-sm-7'>
														<textarea
															rows="4"
															style={{ width: "100%" }}
															onChange={(e) => { setTags(e.target.value); }}>
														</textarea>
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
							</Card>
						</Col>
					</Row>
				</Container>
			</Fragment>
		</StrictMode>
	)
}

export default AddProduct