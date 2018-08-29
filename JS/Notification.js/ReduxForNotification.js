//Here is the reducer for Redux notifications.
const initNotifState = {
    notifForIssue: 0,
    notifForIssueForAdmin: 0
};

const notification = (state = initNotifState, action) => {

    const { payload } = action;
    switch (action.type) {
        case "GET_NEW_NOTIF":
            return {
                ...this.state,
                notifForIssue: payload.notificationResponse.notifForIssue,
                notifForIssueForAdmin: payload.notificationResponse.notifForIssueForAdmin

            };
        default:
            return state;
    }
}

//Here is the action for notifications.
export const getNewNotif = (notificationResponse) => (
    {
        type: "GET_NEW_NOTIF",
        payload: { notificationResponse }
    })
