const { browserEndPoint } = require("../pages/config");
const SignupPage = require("../pages/createAccount");
const AddToCart = require("../pages/addToCart");
const CheckOut = require("../pages/checkout");

describe("E-Commerce Site Automated Tests", () => {
  let browser;
  let page;
  let signupPage;
  let addToCart;
  let checkOut;

  beforeAll(async () => {
    browser = await browserEndPoint;
    page = await browser.newPage();
    signupPage = new SignupPage(page);
    addToCart = new AddToCart(page);
    checkOut = new CheckOut(page);

    await page.setViewport({ width: 1920, height: 1080 });
  });

  it("Should signup and create a user account", async () => {
    await signupPage.navigate();
    await signupPage.createAccount(
      "Mary",
      "Smith",
      "hey@marysmith.com", //Note: Use a different email for this test to pass
      "0712345678",
      "154S7fWTNP",
      "154S7fWTNP"
    );

    const successMessage = await signupPage.successMessageTxt();
    expect(successMessage).toBe(" Your Account Has Been Created!");
  });

  it("Should add item to cart successfully", async function () {
    await addToCart.navigate();
    await addToCart.addToCart();

    const itemName = await addToCart.getItemText();
    expect(itemName).toBe("HTC Touch HD");
  });

  it("Should checkout items added to cart successfully", async function () {
    await checkOut.navigate();
    await checkOut.checkOut(
      "Mary",
      "Smith",
      "JohnSmith",
      "40, Street Road",
      "London",
      "60600"
    );

    const confirmOrderMessage = await checkOut.confirmOrderText();
    expect(confirmOrderMessage).toBe(" Your order has been placed!");
  });

  afterAll(async () => {
    await browser.close();
  });
});
