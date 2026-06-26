import { Request, Response, NextFunction } from "express";
import isEmail from "validator/lib/isEmail.js";
import {
  createUser,
  verifyUser,
  getUserById,
} from "../services/authService.js";
import { ConflictError } from "../errors/ConflictError.js";

const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({
        status: "error",
        message: "username, email and password are required",
      });
      return;
    }

    if (!isEmail(email)) {
      res.status(400).json({
        status: "error",
        message: "Please enter a valid email address",
      });
      return;
    }

    const user = await createUser(username, email, password);

    await new Promise<void>((resolve, reject) => {
      req.session.regenerate((err) => (err ? reject(err) : resolve()));
    });

    req.session.userId = user.id;

    await new Promise<void>((resolve, reject) => {
      req.session.save((err) => (err ? reject(err) : resolve()));
    });

    res.status(201).json(user);
  } catch (error) {
    if (error instanceof ConflictError) {
      res.status(409).json({ status: "error", error });
      return;
    }
    next(error);
  }
};

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ status: "error", message: "email and password are required" });
      return;
    }

    const user = await verifyUser(email, password);

    await new Promise<void>((resolve, reject) => {
      req.session.regenerate((err) => (err ? reject(err) : resolve()));
    });

    req.session.userId = user.id;

    await new Promise<void>((resolve, reject) => {
      req.session.save((err) => (err ? reject(err) : resolve()));
    });

    res.status(200).json(user);
  } catch (error) {
    const message = (error as Error).message;
    if (message === "Invalid credentials") {
      res.status(401).json({ status: "error", message: "Invalid credentials" });
      return;
    }
    next(error);
  }
};

const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await new Promise<void>((resolve, reject) => {
      req.session.destroy((err) => (err ? reject(err) : resolve()));
    });
    res.clearCookie("connect.sid");
    res.status(200).json({ status: "ok" });
  } catch (error) {
    next(error);
  }
};

const getMeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.session.userId) {
      res.status(200).json({ user: null });
      return;
    }
    const user = await getUserById(req.session.userId);
    res.status(200).json({ user: user ?? null });
  } catch (error) {
    next(error);
  }
};

export { signupController, loginController, logoutController, getMeController };
