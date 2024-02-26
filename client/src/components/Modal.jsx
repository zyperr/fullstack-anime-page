// eslint-disable-next-line react/prop-types
function Modal({children,className}) {
  return (
    <div className={className}>
        {children}
    </div>
  )
}

export {Modal}