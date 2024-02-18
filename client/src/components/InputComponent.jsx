import "../styles/components/input.css"


// eslint-disable-next-line react/prop-types
export default function InputComponent({type,id,placeholder}) {
  return (
        <input 
        type={type} 
        className="input" 
        id={id}
        placeholder={placeholder}
        />
  )
}
