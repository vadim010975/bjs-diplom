"use strict"

const userForm = new UserForm();
userForm.loginFormCallback = function(data) {
  ApiConnector.login(data, response => response.success ? location.reload() : this.setLoginErrorMessage(responsewer.error));
}
userForm.registerFormCallback = function(data) {
  ApiConnector.register(data, response => response.success ? location.reload() : this.setRegisterErrorMessage(responsewer.error));
}

