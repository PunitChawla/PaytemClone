import { Link } from "react-router-dom";

export function BottomWrapping({lable, buttontext, to})
{
    return <div className="py-2 text-sm flex justify-center ">
        <div>{lable}</div>
        <Link className=" underline pl-1 cursor-pointer" to={to}>{buttontext}</Link>
    </div>
}