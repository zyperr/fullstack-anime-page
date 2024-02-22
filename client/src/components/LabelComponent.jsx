/* eslint-disable react/prop-types */
import "../styles/components/label.css"
export default function LabelComponent({text,forHtml,children}) {
  return (
        <label 
        className="label" 
        htmlFor={forHtml}
        >
            {text}
            {children}
        </label>
  )
}
