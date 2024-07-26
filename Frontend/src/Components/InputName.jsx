export function InputName({title , placeholder , doChange})
{
    return <>
    <div className="text-ms font-semibold text-left py-2">{title}</div>
    <input onChange={doChange} placeholder={placeholder} className="w-full  px-2 py-1 border rounded border-slate-200"  ></input>
    </>
}