import React from 'react'
import { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import man from "../../../assets/images/dashboard/man.png";
import { AccountState } from '../../../context/Account';
const UserMenu = () => {
	const { setAccount } = AccountState();
	const navigate = useNavigate();
	const logout = () => {
		setAccount(null);
		localStorage.removeItem("userInfo");
		navigate(`${process.env.PUBLIC_URL}/auth/login`);
	}
	return (
		<Fragment>
			<li className="onhover-dropdown">
				<div className="media align-items-center">
					<img
						className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
						src={man}
						alt="header-user"
					/>
					<div className="dotted-animation">
						<span className="animate-circle"></span>
						<span className="main-circle"></span>
					</div>
					<ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
						<li>
							<Link to={`${process.env.PUBLIC_URL}/settings/profile`}>
								<i data-feather="user"></i>Edit Profile
							</Link>
						</li>
						<li>
							<Link onClick={logout}>
								<i data-feather="log-out"></i>Logout
							</Link>
						</li>
					</ul>
				</div>
			</li>
		</Fragment>
	)
}

export default UserMenu