export default class NotificationManager {
  constructor() {
    this.activeNotifications = {};
  }

  push(notification) {
    if (this.activeNotifications[notification.message] === undefined) {
      const newNotification = {};
      newNotification.element = this.createElement(notification);
      newNotification.stations = [notification.station_name];
      newNotification.timer = setTimeout(() => {
        newNotification.element.close();
        delete this.activeNotifications[notification.message];
      }, 15000);
      this.activeNotifications[notification.message] = newNotification;
    } else {
      const existingNotification = this.activeNotifications[notification.message];
      if (!existingNotification.stations.includes(notification.station_name)) {
        existingNotification.stations.push(notification.station_name);
        existingNotification.element.update('title', `${existingNotification.stations.length} stations`);
        clearTimeout(existingNotification.timer);
        existingNotification.timer = setTimeout(() => {
          existingNotification.element.close();
          delete this.activeNotifications[existingNotification.message];
        }, 15000);
      }
    }
  }

  clear(notificationMessage) {
    if (this.activeNotifications[notificationMessage] !== undefined) {
      const notification = this.activeNotifications[notificationMessage];
      clearTimeout(notification.timer);
      delete this.activeNotifications[notificationMessage];
    }
  }

  createElement(notification) {
    const types = {
      info: 'success',
      warning: 'warning',
      error: 'danger',
    };

    const icons = {
      info: 'fa-info-circle',
      warning: 'fa-exclamation-triangle',
      error: 'fa-exclamation-circle',
    };

    return $.notify({
      title: notification.station_name,
      message: notification.message,
      icon: `fa ${icons[notification.type] || 'fa-info-circle'}`,
    }, {
      type: types[notification.type] || 'info',
      offset: { x: 10, y: $('.navbar').height() + 5 },
      delay: -1,
      onClosed: () => {
        this.clear(notification.message);
      },
    });
  }
}
