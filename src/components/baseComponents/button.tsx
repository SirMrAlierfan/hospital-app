import type { JSX } from "react"

type ButtonArgumants<A> = {
    Text: string,
    style: "DARK" | "WHITE",
    onClick: () => A,
}
type Button = <A>(data: ButtonArgumants<A>) => JSX.Element


const Button: Button = (d) => {
    return (
        <button onClick={d.onClick} className={`${d.style === "DARK" ? "" : ""}`}>
            {
                d.Text
            }
        </button>
    )
}
export default Button