"use strict"

const userForm = new UserForm();
userForm.loginFormCallback = function(data) {
  ApiConnector.login(data, answer => answer.success ? location.reload() : this.setLoginErrorMessage(answerwer.error));
}
userForm.registerFormCallback = function(data) {
  ApiConnector.register(data, answer => answer.success ? location.reload() : this.setRegisterErrorMessage(answerwer.error));
}

