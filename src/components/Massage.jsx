function Message({ massage }) {
  return (
    <p className="text-center text-[1.8rem] w-4/5 mx-auto my-8 font-semibold text-red-600">
      <span role="img" aria-label="wave">
        👋
      </span>{" "}
      {massage}
    </p>
  );
}

export default Message;
