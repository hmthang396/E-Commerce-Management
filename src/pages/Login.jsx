import React, { Fragment, useEffect } from "react";
import { ArrowLeft } from "react-feather";
import Slider from "react-slick";
import stats from "../assets/images/dashboard/stats.png";
import "../assets/scss/slick.scss";
import "../assets/scss/slick-theme.scss";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import LoginTabset from "../components/auth/LoginTabset";
import { Link, useNavigate } from "react-router-dom";
import { AccountState } from "../context/Account";

const Login = () => {
	const { account, setAccount } = AccountState();
	const history = useNavigate();
	useEffect(() => {
		if (account) history(`${process.env.PUBLIC_URL}/dashboard`);
	}, [])
	const logout = () => {
		setAccount(null);
		localStorage.removeItem("userInfo");
	}

	return (
		<Fragment>
			{!account &&
				<div className="page-wrapper">
					<div className="authentication-box">
						<Container>
							<Row>
								<Col className="col-md-12 p-0">
									<Card className="tab2-card">
										<CardBody>
											<LoginTabset />
										</CardBody>
									</Card>
								</Col>
							</Row>
						</Container>
					</div>
				</div>
			}
			{account &&
				<div className="page-wrapper">
					<div className="authentication-box">
						<Container>
							<Row style={{ textAlign: "center" }}>
								<Col className="col-md-12 p-0 card-right">
									<Button onClick={logout}>Logout</Button>
								</Col>
							</Row>
						</Container>
					</div>
				</div>
			}
		</Fragment>
	);
};

export default Login;
