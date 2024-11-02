const checkoutUrl =
  "https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart";

class Checkout {
  constructor(page) {
    this.page = page;
    this.url = checkoutUrl;
    this.checkOutBtn = 'xpath///a[@class="btn btn-lg btn-primary"]';
    this.guestCheckOut = "xpath///label[@for='input-account-guest']";
    this.firstNameInput = "#input-payment-firstname";
    this.lastNameInput = "#input-payment-lastname";
    this.emailInput = "#input-payment-email";
    this.telephone = "#input-payment-telephone";
    this.companyInput = "#input-payment-company";
    this.addressInput = "#input-payment-address-1";
    this.cityInput = "#input-payment-city";
    this.postCodeInput = "#input-payment-postcode";
    this.country = "#input-payment-country";
    this.zone = "#input-payment-zone";
    this.agreeTerms = "xpath///label[@for='input-agree']";
    this.continueBtn = "xpath///button[@id='button-save']";
    this.confirmBtn = "#button-confirm";
    this.orderPlacedMessage = "xpath///h1[@class='page-title my-3']";
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async checkOut(firstName, lastName, company, address, city, postCode) {
    await this.page.click(this.checkOutBtn);
    await this.page.waitForSelector(this.firstNameInput, { visible: true });
    await this.page.type(this.firstNameInput, firstName);
    await this.page.type(this.lastNameInput, lastName);
    await this.page.type(this.companyInput, company);
    await this.page.type(this.addressInput, address);
    await this.page.type(this.cityInput, city);
    await this.page.type(this.postCodeInput, postCode);
    await this.page.click(this.agreeTerms);
    await this.page.click(this.continueBtn);
    await this.page.waitForSelector(this.confirmBtn, { visible: true });
    await this.page.click(this.confirmBtn);
    await this.page.waitForSelector(this.orderPlacedMessage, { visible: true });
  }

  async confirmOrderText() {
    return await this.page.$eval(
      this.orderPlacedMessage,
      (el) => el.textContent
    );
  }
}

module.exports = Checkout;
