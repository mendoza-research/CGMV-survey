import { NextApiRequest, NextApiResponse } from "next";
import { getClientIp } from "@supercharge/request-ip";

// Serverless lambda to find user IP
// Normally, we can use a free service like http://ip-api.com/json
// However, Netlify blocks outgoing API requests for non-encrypted URLs
export default async function getIPAddress(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const ip = getClientIp(req);
    return res.json({ status: "success", ip });
  } catch (err) {
    return res.status(500).json({
      message: "fail",
      ip: null,
    });
  }
}
