export default function Button({content, children, onClick, ...restProps}) {

  return (
      <button onClick={onClick} {...restProps}>
        {content !== void 0 ? content : children}
      </button>
  )
}