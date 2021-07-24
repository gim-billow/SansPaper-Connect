import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onRegister: function (token) {
    console.log('Token:', token);
  },
  onNotification: function (notification) {
    console.log('Notification:', notification);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});
