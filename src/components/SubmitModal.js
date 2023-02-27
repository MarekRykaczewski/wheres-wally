export const SubmitModal = (props) => {

    return (
        <div className="modal-background">
            <div className="modal-container">
                <button className="modal-close" onClick={() => props.closeModal()}>X</button>
                <div className="title">
                    <h1>Would you like to submit your score?</h1>
                </div>
                <div className="body">
                    <button className="modal-button">Cancel</button>
                    <button className="modal-button">Continue</button>
                </div>
            </div>

        </div>
    )
}
