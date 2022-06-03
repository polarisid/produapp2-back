// import { connection } from "../database.js";

// export async function validateAdminTokenMiddleware(req, res, next) {
//   const authorization = req.headers.authorization;
//   const token = authorization?.replace("Bearer ", "");
//   if (!token) {
//     return res.sendStatus(401);
//   }

//   const { rows: sessions } = await connection.query(`SELECT * FROM adminSessions WHERE token=$1`, [token]);
//   const [session] = sessions;
//   if (!session) {
//     return res.sendStatus(401);
//   }

//   const { rows: users } = await connection.query(`SELECT * FROM admins WHERE id=$1`, [session.userId]);
//   const [user] = users;
//   if (!user) {
//     return res.sendStatus(401);
//   }

//   res.locals.user = user;
//   next();
// }
