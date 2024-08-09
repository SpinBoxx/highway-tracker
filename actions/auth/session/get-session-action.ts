"use server";

import type jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { getUserAction } from "@/actions/user/get-user";
import { db } from "@/lib/prisma";
import * as jose from "jose";
import type { CustomJwtPayload } from "jsonwebtoken";

declare module "jsonwebtoken" {
	export interface CustomJwtPayload extends jwt.JwtPayload {
		user: {
			id: string;
			username: string;
			createdAt: Date;
			updatedAt: Date;
		};
	}
}

const encodedSecret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
export const getSession = async () => {
	const token = cookies().get("token");

	if (!token) {
		return null;
	}

	const { JWT_SECRET_KEY } = process.env;
	if (!JWT_SECRET_KEY) {
		return null;
	}

	const decoded = await jose.jwtVerify<CustomJwtPayload>(
		token.value,
		encodedSecret,
	); // details to  encode in the token

	if (!decoded.payload) {
		return null;
	}

	const user = await getUserAction({
		userId: decoded.payload.user.id,
	});

	if (!user?.data) {
		return null;
	}
	console.log(decoded.payload);

	return decoded.payload;
};
