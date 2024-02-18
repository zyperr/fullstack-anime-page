
// eslint-disable-next-line react/prop-types
function Paragraph({text,children, className}) {
  return (
    <p className={className}>
        {text}
        {children}
    </p>
  )
}

export {Paragraph}