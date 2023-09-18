import { connect } from "react-redux";
import Header from "../components/header";
import { addTodo } from "../slices/todos";

export default connect(null, { addTodo })(Header);
