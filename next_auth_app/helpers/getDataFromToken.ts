import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = async (req: NextRequest) => {
    try {
        const encodedTokenData = req.cookies.get("token")?.value || "";
        const decodedTokenData: any = jwt.verify(
            encodedTokenData,
            process.env.TOKEN_SECRET!,
        );
        return decodedTokenData.id;
    } catch (err: any) {
        throw new Error(err.message);
    }
};
