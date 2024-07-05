const Notification = ({ message }) => {
    if (message === null) {
        return null;
    }

    if (message.includes('has already been removed from server')) {
        return (
            <div className="errorNotification">
                {message}
            </div>
        );
    }

    else {
        return (
            <div className="notification">
                {message}
            </div>
            );
    }
}

export default Notification;