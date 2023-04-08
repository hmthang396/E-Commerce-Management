import React from 'react'
//Picture User
import man from "../../../assets/images/dashboard/man.png";
import { AccountState } from '../../../context/Account';
const UserPanel = () => {
    const { account } = AccountState();
    console.log(account);
    return (
        <div>
            <div className="sidebar-user text-center">
                <div>
                    <img
                        className="img-60 rounded-circle lazyloaded blur-up"
                        src={account.pic}
                        alt="#"
                    />
                </div>
                <h6 className="mt-3 f-14">{account.fullname}</h6>
                <p>{account.position}</p>
            </div>
        </div>
    )
}

export default UserPanel