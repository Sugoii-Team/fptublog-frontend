import { useSelector } from "react-redux";
import { Route } from "react-router";
export const contains = (role, currentRole) => {
  var result = false;
  if (currentRole?.includes(role) === true) {
    result = true;
  }
  return result;
}
const Privateroute = ({ component: Component, ...rest }) => {
  const loggedInUser = useSelector((state) => state.user.current);
  const resultComponent = (props) => {
    var role = loggedInUser?.role;
    if (contains("ADMIN", role)) {
      return <Component {...props} />;
    } else {
      return <><p className="text-center text-2xl my-10">
        You need permission to acces this page (ONLY FOR ADMIN !)
        </p></>
    }
  }
  return <Route {...rest} render={(props) => resultComponent(props)} />;
}
export default Privateroute;