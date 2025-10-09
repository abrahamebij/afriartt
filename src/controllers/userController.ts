import { userModel } from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

// signup controller
export const signupUser = async (req: NextRequest) => {
  const { email, password } = await req.json();
  try {
    //search if there is no user before
    const userExist = await userModel.getByEmail(email);

    if (userExist) {
      return NextResponse.json(
        { success: false, message: "user already registered" },
        { status: 400 }
      );
    }
    //hash password
    const hashedPassword = bcrypt.hashSync(password, 10);
    //create account
    const user = await userModel.create({ email, password: hashedPassword });

    // return response
    return NextResponse.json(
      { success: true, message: "user created successfully", data: user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error signing up" },
      { status: 500 }
    );
  }
};

// login controller
export const loginUser = async (req: NextRequest) => {
  const { email, password } = await req.json();
  try {
    //check if user exist
    const userExist = await userModel.getByEmail(email);

    if (!userExist) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    // check if password is right
    const validPassword = bcrypt.compareSync(password, userExist.password);

    if (!validPassword) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 400 }
      );
    }
    //generate token
    const token =
      process.env.JWT_SECRET &&
      jwt.sign(userExist, process.env.JWT_SECRET, {
        expiresIn: "12h",
      });
    //return token
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "error login in" },
      { status: 500 }
    );
  }
};
