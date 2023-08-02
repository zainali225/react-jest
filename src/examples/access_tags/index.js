import { useState } from "react";



export default () => {

    const [email, setEmail] = useState("zain@gmail.com");

    return (
        <form  >

            <h3>Enter Data</h3>

            <div data-testid="image wrapper" >
                <img alt="data" src="data.jpg" />
            </div>

            <label htmlFor="email"  >Email</label>
            <input id="email" value={email} onChange={e => setEmail(e.target.value)} />

            <label htmlFor="color" >Color</label>
            <input id="color" placeholder="Red" />

            <button title="click when ready" >Submit</button>

        </form>
    )
}