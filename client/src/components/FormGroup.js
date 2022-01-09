function FormGroup(props) {
  return (
    <label className="relative block my-5 first:mt-0">
      <input
        className="bg-teal-200 dark:bg-black text-teal-700 dark:text-white border rounded-lg border-teal-700 dark:border-white focus:border-2 dark:focus-border-2 focus:border-blue-600 dark:focus:border-blue-600 md:text-2xl outline-none px-2 py-1 transition duration-300"
        type={props.inputType}
        name={props.name}
        onChange={props.change}
        value={props.value}
        required
      />
      <span className="absolute top-1 left-3 text-teal-700 dark:text-white transition duration-300 input-text select-none">
        {props.label}
      </span>
    </label>
  );
}

export default FormGroup;
