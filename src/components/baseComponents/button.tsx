import type { JSX } from "react"

type ButtonArgumants<A> = {
    Text: string,
    onClick: () => A,
}
type Button = <A>(data: ButtonArgumants<A>) => JSX.Element


const Button: Button = (d) => {
    return (
        <button className=" px-6 py-3 rounded-xl font-semibold tracking-wide
                            transition-all duration-300 ease-in-out 
                           bg-teal-700 text-white 
                           shadow-lg shadow-blue-200/50
                           hover:bg-teal-800 hover:shadow-blue-300/50 hover:-translate-y-0.5
                           active:scale-95
                           dark:bg-slate-400 dark:text-blue-50 
                           dark:shadow-none
                           dark:hover:bg-slate-300 dark:hover:text-slate-500" 
                           onClick={d.onClick} >
            {
                d.Text
            }
        </button>
    )
}
export default Button