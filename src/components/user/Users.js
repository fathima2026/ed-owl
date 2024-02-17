import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Users = () => {
    const [users, setUsers] = useState();
    const navigate = useNavigate();
    const refresh = useRefreshToken();
    const axiosPrivate = useAxiosPrivate();
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('http://localhost:8000/api/teacher', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            isMounted && controller.abort()
        }
    }, [])

    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.email}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }

            <Button as={Link} to={'/admin'}></Button>
          <Button onClick={()=>refresh()}>refresh</Button>
        
        </article> 


       
    );
};

export default Users;