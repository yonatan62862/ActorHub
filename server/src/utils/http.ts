export const ok = (res: any, data: any) => res.json({ success: true, ...data });
export const fail = (res: any, code: number, message: string) =>
  res.status(code).json({ success: false, message });
