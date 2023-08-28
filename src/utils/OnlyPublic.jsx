import { useContext } from "react";
import { UserContext } from "../context/useAuth";
import { Navigate } from "react-router-dom";

function OnlyPublic({children}) {
    const userConnection = useContext(UserContext);

    return (
        <>
            {userConnection.isConnected() ? <Navigate to={'/'}/> : children}
        </>
    );
}

export default OnlyPublic;