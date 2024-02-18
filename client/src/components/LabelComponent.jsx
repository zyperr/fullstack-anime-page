/* eslint-disable react/prop-types */
import "../styles/components/label.css"
export default function LabelComponent({text,forHtml}) {
  return (
        <label 
        className="label" 
        htmlFor={forHtml}
        >
            {text}
        </label>
  )
}
