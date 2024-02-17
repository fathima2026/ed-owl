import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Users from "./Users";
const Admin = () => {
    return (
        <section>
            <h1>Admins Page</h1>
            <br />
            <br />
            <div className="flexGrow">
            <Button as={Link} to={'/user'}></Button>            </div>
        </section>
    )
}

export default Admin