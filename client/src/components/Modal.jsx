import "../styles/components/modal.css"
// eslint-disable-next-line react/prop-types
function Modal({className,message,state}) {
  return (
    <div className={state ? `${className} show` : `${className}`}>
        <p className="modal__text">{message}</p>
    </div>
  )
}

export {Modal}