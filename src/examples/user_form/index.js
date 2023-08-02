
import { useState } from "react";
import UserForm from "./UserForm"
import UserList from "./UserList";


export default () => {

    const [users, setUsers] = useState([]);

    const onUserAdd = (user) => {
        setUsers([...users, user])
    };

    return (
        <div>
            <UserForm onUserAdd={onUserAdd} />
            <hr />
            <UserList users={users} />
        </div>
    );
}
