const Notification = ({message, type}) => {
  const notificationStyles = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const notificationType = {
    error: {...notificationStyles, color: "red"},
    success: {...notificationStyles, color: "green"},
  };

  if (!message) {
    return null;
  }

  return (
    <div
      style={
        type === "error" ? notificationType.error : notificationType.success
      }
    >
      {message}
    </div>
  );
};

export default Notification;
