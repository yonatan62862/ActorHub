import { Request, Response, NextFunction } from "express";

function parseNumericId(param: string = "id") {
    return (req: Request, res: Response, next: NextFunction) => {
        const id = Number(req.params[param]);
        if (Number.isNaN(id)) {
            return res.status(400).json({ success: false, message: `Invalid ${param}` });
        }
        (req as any).numericId = id;
        next();
    };
}
export { parseNumericId };
