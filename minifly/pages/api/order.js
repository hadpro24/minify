export default function handler(req, res) {
  if (req.method === "POST") {
    console.log({ body: req.body });
    res.status(200).json({ order_id: "fake-order-id000-from-mock-api" });
  }
}
