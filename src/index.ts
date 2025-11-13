import express, { Request, Response } from "express";
import cors from "cors";
import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config(); // .env 불러오기

// ------------------------
// DB 연결 (너가 원하는 방식)
// ------------------------
const pgp = pgPromise();
const db = pgp({
    host: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT as string) || 5432,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: { rejectUnauthorized: false } // Azure PostgreSQL 사용 시 필요한 옵션
});

// ------------------------
// Express App
// ------------------------
const app = express();
app.use(cors());
app.use(express.json());

// ------------------------
// GET /clippers
// ------------------------
app.get("/clippers", async (req: Request, res: Response) => {
    try {
        const rows = await db.any(`
            SELECT 
                C.ID AS "clipperID",
                U.firstName || ' ' || U.lastName AS name,
                U.profileImage,
                P.city,
                P.state,
                ROUND(AVG(R.rating), 2) AS "avgRating"
            FROM Clipper C
            JOIN UserAccount U ON C.userID = U.ID
            LEFT JOIN Portfolio P ON C.ID = P.clipperID
            LEFT JOIN Review R ON C.ID = R.clipperID
            GROUP BY C.ID, name, U.profileImage, P.city, P.state;
        `);

        res.status(200).json(rows);
    } catch (err) {
        console.error("GET /clippers error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ------------------------
// Server Start
// ------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Clippd-service running on http://localhost:${port}`);
});
