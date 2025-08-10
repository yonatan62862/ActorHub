import { Request, Response, NextFunction } from "express";

function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const message = err?.message || "Unknown server error";
  res.status(500).json({ success: false, message });
}
export { errorHandler };
