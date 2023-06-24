'use strict'

const logoutButton = new LogoutButton();
const favoritesWidget = new FavoritesWidget();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();

const showProfileAndMessage = function (str, obj) {
  if (obj.success) {
    ProfileWidget.showProfile(obj.data);
    this.setMessage(obj.success, str);
  } else {
    this.setMessage(obj.success, obj.error);
  }
}

const fillTableAndUpdateUsersList = function (obj) {
  if (obj.success) {
    this.clearTable();
    this.fillTable(obj.data);
    moneyManager.updateUsersList(obj.data);
  }
}

const showTable = () => ApiConnector.getStocks((response) => {
  if (response.success) {
    ratesBoard.clearTable();
    ratesBoard.fillTable(response.data);
  }
});

logoutButton.action = () => {
  clearInterval(interval);
  ApiConnector.logout(response => response && location.reload());
}

moneyManager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, showProfileAndMessage.bind(moneyManager, 'Ок. Пополнение счета выполнено!'));
}

moneyManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, showProfileAndMessage.bind(moneyManager, 'Ок. Конвертирование валюты выполнено!'));
}

moneyManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, showProfileAndMessage.bind(moneyManager, 'Ок. Перевод средств выполнен!'));
}

favoritesWidget.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, fillTableAndUpdateUsersList.bind(favoritesWidget));
}

favoritesWidget.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(data, fillTableAndUpdateUsersList.bind(favoritesWidget));
}

ApiConnector.current(response => response.success && ProfileWidget.showProfile(response.data));

showTable();

let interval = setInterval(() => {
  showTable();
}, 60000);

ApiConnector.getFavorites(fillTableAndUpdateUsersList.bind(favoritesWidget));

