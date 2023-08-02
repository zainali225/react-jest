import { useState } from "react"

export default function UserForm({ onUserAdd }) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        onUserAdd({ name, email })
        setName("");
        setEmail("")
    };

    return (
        <form onSubmit={handleSubmit}>
            <div >
                <label htmlFor="name" >Enter Name</label>
                <input id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div >
                <label htmlFor="email" >Enter Email</label>
                <input id="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <button  >Add User</button>
        </form>
    )
}