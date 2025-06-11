import { Request } from "express";

import { Order } from "../../models/Order";

export async function changeOrderStatus(req: Request, res: any) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["WAITING", "IN_PRODUCTION", "DONE"].includes(status)) {
      return res.status(400).json({
        error: "Status should be one these: WAITING, IN_PRODUCTION_DONE",
      });
    }

    await Order.findByIdAndUpdate(orderId, { status });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
