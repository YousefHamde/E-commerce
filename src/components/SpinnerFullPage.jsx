import Spinner from "./Spinner";

function SpinnerFullPage() {
//   console.log("Loading...");
  return (
    <div className="m-10 h-[calc(100vh-5rem)] w-[100] bg-white">
      <Spinner />
    </div>
  );
}

export default SpinnerFullPage;
