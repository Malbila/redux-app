import { useSelector } from "react-redux";
import { selectDisplayText } from "./selectors";

export function Display() {
    const dsiplayText = useSelector(selectDisplayText)

    return <p className="display">{dsiplayText}</p>
}