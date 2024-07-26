export function Button({label , doClick}){
    return <>
    <button onClick={doClick} className="w-full text-white mt-3 pt- pb-1 rounded-lg text-lg bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 ...">{label}</button>
    </>
    
}