export const Toast = (props) => {
  return (
    <div className="toast">
        <div className="toast-message-container">
            <span className="toast-message-main"> {props.mainMessage} </span>
            <span className="toast-message"> {props.subMessage} </span>
        </div>
    </div>
  )
}
