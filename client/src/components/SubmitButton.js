function SubmitButton(props) {
  return (
    <button
      className="bg-teal-700 dark:bg-white py-1 px-4 text-lg rounded-lg text-teal-200 dark:text-black hover:bg-teal-900 dark:hover:bg-gray-300"
      type="submit"
    >
      {props.text}
    </button>
  );
}

export default SubmitButton;
