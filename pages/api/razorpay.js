const Razorpay = require("razorpay");
const shortid = require("shortid");

export default async function handlerOrderCreate(req, res) {
    if (req.method === "POST") {
      let bodyData = JSON.parse(req.body);
      // Initialize razorpay object
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET,
      });

      // Create an order -> generate the OrderID -> Send it to the Front-end
      // Also, check the amount and currency on the backend (Security measure)
      const payment_capture = 1;
      const amount = bodyData.amount;
      const currency = bodyData.currency;
      const options = {
        amount: (amount * 100).toString(),
        currency,
        receipt: shortid.generate(),
        payment_capture,
      };
      try {
        const response = await razorpay.orders.create(options);
        res.status(200).json({
          success:true,
          data: {
            id: response.id,
            currency: response.currency,
            amount: response.amount,
            orderId: bodyData?.orderId,
            name:bodyData?.name,
            profileDetails:bodyData?.profileDetails
          }
        });
      } catch (err) {
        res.status(400).json({success:false, message: err});
      }
    }
}