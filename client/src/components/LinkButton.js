import { Link } from "react-router-dom";

function LinkButton(props) {
  return (
    <Link
      className="bg-teal-700 text-teal-200 px-5 py-2 rounded-md odd:mr-6 hover:bg-teal-900"
      to={props.to}
    >
      {props.innerText}
    </Link>
  );
}

export default LinkButton;
