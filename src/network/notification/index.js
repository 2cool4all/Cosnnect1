import PushNotification from 'react-native-push-notification';

const showNotification = (title, message) => {
    PushNotification.localNotification({
        title: title,
        message: message,
    });
};


export default showNotification;