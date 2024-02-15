/* eslint-disable react/prop-types */
import "../styles/components/btn.css"
function Btn({text}) {
  return (
    <button className="btn">
        {text}
    </button>
  )
}

export default Btn