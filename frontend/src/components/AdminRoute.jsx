import { Outlet , Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
    const { userInfo } = useSelector((state) => state.user);
    return userInfo && userInfo.data.isAdmin ? <Outlet /> : <Navigate to="/login" />;
}
export default AdminRoute;