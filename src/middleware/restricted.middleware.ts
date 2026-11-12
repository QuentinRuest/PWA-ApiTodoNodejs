//CHATGPT

import type { Request, Response, NextFunction } from "express";

const restricted = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.session.userId) {
    res.status(401).json({
      message: "Tu dois être connecté."
    });
    return;
  }

  next();
};

export default restricted;