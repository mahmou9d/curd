import { useSelector } from "react-redux";

const withGuard = (Component) => {
  const Wrapper = (props) => {
    // @ts-ignore
    const  access  = useSelector((state) => state.auth.access);

    return access ? <Component {...props} /> : <div>Please logg in first!</div>;
  };
  return Wrapper;
};

export default withGuard;
