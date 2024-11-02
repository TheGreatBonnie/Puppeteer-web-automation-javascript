const signupUrl =
  "https://ecommerce-playground.lambdatest.io/index.php?route=account/register";

class SignupPage {
  constructor(page) {
    this.page = page;
    this.url = signupUrl;
    this.firstNameInput = "#input-firstname";
    this.lastNameInput = "#input-lastname";
    this.emailInput = "#input-email";
    this.telephoneInput = "#input-telephone";
    this.passwordInput = "#input-password";
    this.confirmPasswordInput = "#input-confirm";
    this.agreePolicyBtn = 'xpath///label[@for="input-agree"]';
    this.submitButton = 'xpath///input[@value="Continue"]';
    this.successMessageText = 'xpath///h1[@class="page-title my-3"]';
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async createAccount(
    firstname,
    lastName,
    email,
    telephone,
    password,
    confirmPassword
  ) {
    await this.page.type(this.firstNameInput, firstname);
    await this.page.type(this.lastNameInput, lastName);
    await this.page.type(this.emailInput, email);
    await this.page.type(this.telephoneInput, telephone);
    await this.page.type(this.passwordInput, password);
    await this.page.type(this.confirmPasswordInput, confirmPassword);
    await this.page.click(this.agreePolicyBtn);
    await this.page.click(this.submitButton);
    await this.page.waitForSelector(this.successMessageText, { visible: true });
  }

  async successMessageTxt() {
    return await this.page.$eval(
      this.successMessageText,
      (el) => el.textContent
    );
  }
}

module.exports = SignupPage;
