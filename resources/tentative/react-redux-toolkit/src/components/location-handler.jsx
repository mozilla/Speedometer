import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setPathname } from "../slices/pathname";

// This component handles mirroring the current pathname to redux so that we can
// use it more easily in selectors
export function LocationHandler() {
    const location = useLocation();
    const dispatch = useDispatch();
    dispatch(setPathname(location.pathname));
}
