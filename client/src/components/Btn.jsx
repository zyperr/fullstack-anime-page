/* eslint-disable react/prop-types */
import "../styles/components/btn.css"
function Btn({text,fn}) {
  const handleSubmit = (e) => {
    fn(e)    
  }
  return (
    <button className="btn" onSubmit={handleSubmit}>
        {text}
    </button>
  )
}

export default Btn