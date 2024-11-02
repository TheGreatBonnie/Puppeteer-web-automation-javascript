const ecommerceUrl = "https://ecommerce-playground.lambdatest.io/";

class AddToCart {
  constructor(page) {
    this.page = page;
    this.url = ecommerceUrl;
    this.categoryButton = 'xpath///a[normalize-space()="Shop by Category"]';
    this.phonesCategoryButton =
      'xpath///span[normalize-space()="Phone, Tablets & Ipod"]';
    this.HTCButton =
      'xpath///a[@class="text-ellipsis-2"][normalize-space()="HTC Touch HD"]';
    this.addToCartButton =
      'xpath///div[@id="entry_216842"]//button[@title="Add to Cart"][normalize-space()="Add to Cart"]';
    this.cartButton = 'xpath///a[@class="btn btn-primary btn-block"]';
    this.itemNameText =
      'xpath///td[@class="text-left"]//a[contains(text(),"HTC Touch HD")]';
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async addToCart() {
    await this.page.click(this.categoryButton);
    await this.page.click(this.phonesCategoryButton);
    await this.page.waitForSelector(this.HTCButton, { visible: true });
    await this.page.click(this.HTCButton);
    await this.page.waitForSelector(this.addToCartButton, { visible: true });
    await this.page.click(this.addToCartButton);
    await this.page.waitForSelector(this.cartButton, { visible: true });
    await this.page.click(this.cartButton);
    await this.page.waitForSelector(this.itemNameText, { visible: true });
  }

  async getItemText() {
    return await this.page.$eval(this.itemNameText, (el) => el.textContent);
  }
}

module.exports = AddToCart;
