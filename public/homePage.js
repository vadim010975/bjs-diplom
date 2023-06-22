"use strict"

const logoutButton = new LogoutButton();
logoutButton.action = () => {
  ApiConnector.logout(answer => answer ? location.reload() : false);
}

ApiConnector.current(answer => answer.success ? ProfileWidget.showProfile(answer.data) : false);

const ratesBoard = new RatesBoard();
ApiConnector.getStocks(answer => {
  if (answer.success) {
    ratesBoard.clearTable();
    ratesBoard.fillTable(answer.data);
  }
});

const moneyManager = new MoneyManager();
const showProfileAndMassage = function (str, obj) {
  if (obj.success) {
    ProfileWidget.showProfile(obj.data);
    this.setMessage(obj.success, str);
  } else {
    this.setMessage(obj.success, obj.error);
  }
}

moneyManager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, showProfileAndMassage.bind(moneyManager, 'Ок. Пополнение счета выполнено!'));
}

moneyManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, showProfileAndMassage.bind(moneyManager, 'Ок. Конвертирование валюты выполнено!'));
}

moneyManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, showProfileAndMassage.bind(moneyManager, 'Ок. Перевод средств выполнен!'));
}

const favoritesWidget = new FavoritesWidget();
const fillTableAndUpdateUsersList = function (obj) {
  if (obj.success) {
    this.clearTable();
    this.fillTable(obj.data);
    moneyManager.updateUsersList(obj.data);
  }
}

ApiConnector.getFavorites(fillTableAndUpdateUsersList.bind(favoritesWidget));

favoritesWidget.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, fillTableAndUpdateUsersList.bind(favoritesWidget));
}

favoritesWidget.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(data, fillTableAndUpdateUsersList.bind(favoritesWidget));
}
