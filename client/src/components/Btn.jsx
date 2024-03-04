/* eslint-disable react/prop-types */
import "../styles/components/btn.css"
function Btn({text,fn,isDisabled}) {
  const handleEvent = (e) => {
    fn(e)    
  }
  return (
    <button className="btn" onClick={handleEvent} disabled={isDisabled}>
        {text}
    </button>
  )
}

export default Btn