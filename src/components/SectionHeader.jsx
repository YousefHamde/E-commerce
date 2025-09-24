import { Link } from "react-router-dom";
import ButtonView from "./ButtonView";

export default function SectionHeader({children ,button = "" , header , text}) {
  return (
    <>
      <div className="flex items-center justify-between  mx-auto  my-8">
        {/* Left side: text */}
        <div>
          <p className="text-xs text-slate-900 font-medium uppercase">{text}</p>
          <h2 className="text-2xl font-bold text-blue-900">{header}</h2>
        </div>

        {/* <ButtonView /> */}
        {button}
      </div>
      <div>{children}</div>
    </>
  );
}
