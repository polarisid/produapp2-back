import { Request, Response } from "express";
import userService from "../services/userServices.js";
import dayjs from "dayjs";
import JsonFind from "json-find";
import { UserRegisterType, UserLoginType } from "../types/userTypes.js";

async function SignUp(req: Request, res: Response) {
	const user = {
		...res.locals,
		email: res.locals.email.toLowerCase(),
		name: res.locals.name.toLowerCase(),
	} as UserRegisterType;
	await userService.createAndVerifyNewUser(user);
	res.status(201).send("User created");
}

async function SignIn(req: Request, res: Response) {
	const user = {
		...res.locals,
		email: res.locals.email.toLowerCase(),
	} as UserLoginType;
	const token = await userService.authenticateUser(user);
	res.status(200).send({ token });
}

// export async function getUser(req: Request, res: Response) {
// 	const { user } = res.locals;

// 	try {
// 		res.send(user);
// 	} catch (error) {
// 		console.log(error);
// 		return res.sendStatus(500);
// 	}
// }

// export async function createAdmin(req, res) {
// 	const user = req.body;

// 	try {
// 		const existingUsers = await connection.query(
// 			"SELECT * FROM admins WHERE email=$1",
// 			[user.email]
// 		);
// 		if (existingUsers.rowCount > 0) {
// 			return res.sendStatus(409);
// 		}

// 		const passwordHash = bcrypt.hashSync(user.password, 10);

// 		await connection.query(
// 			`
//       INSERT INTO
//         admins(name, email, password)
//       VALUES ($1, $2, $3)
//     `,
// 			[user.name, user.email, passwordHash]
// 		);

// 		res.sendStatus(201);
// 	} catch (error) {
// 		console.log(error);
// 		return res.sendStatus(500);
// 	}
// }
// export async function getUserAdmin(req, res) {
// 	const { user } = res.locals;
// 	try {
// 		res.send(user);
// 	} catch (error) {
// 		console.log(error);
// 		return res.sendStatus(500);
// 	}
// }

// function padTo2Digits(num) {
// 	return num.toString().padStart(2, "0");
// }
// function dateNow(date) {
// 	return [
// 		date.getFullYear(),
// 		padTo2Digits(date.getDate()),
// 		padTo2Digits(date.getMonth() + 1),
// 	].join("/");
// }
// export async function getRank(req, res) {
// 	try {
// 		const rank = await connection.query(`
//       SELECT
//         users.id,
//         name,
//         COUNT("typeId")
//       FROM
//         users
//         JOIN item on item."userId" = users.id
//       WHERE
//         item.datetime>'${dayjs().format("YYYY/MM/DD")} 00:00:00.000'
//         AND
//         (item."typeId" = 1
//         OR item."typeId" = 2
//         OR item."typeId" = 3)
//       GROUP BY
//         users.id
//       ORDER BY
//         count DESC
//       LIMIT
//         3;
//     `);

// 		res.send(rank.rows);
// 	} catch (error) {
// 		console.log(error);
// 		return res.sendStatus(500);
// 	}
// }
// export async function getRank2(req, res) {
// 	try {
// 		const usersIds = await connection.query(`SELECT id,name FROM users;`);
// 		const item1 = await connection.query(`
//     SELECT
//     users.id,
//     name,
//     COUNT("typeId")
//   FROM
//     users
//     JOIN item ON users.id=item."userId"
//   WHERE
//     item."typeId" = 1
//   GROUP BY
//     users.id
//   ORDER BY
//     users.id ASC;
//     `);
// 		const item2 = await connection.query(`
//     SELECT
//     users.id,
//     name,
//     COUNT("typeId")
//   FROM
//     users
//     JOIN item ON users.id=item."userId"
//   WHERE
//     item."typeId" = 2
//   GROUP BY
//     users.id
//   ORDER BY
//     users.id ASC;

//     `);
// 		const item3 = await connection.query(`
//     SELECT
//     users.id,
//     name,
//     COUNT("typeId")
//   FROM
//     users
//     JOIN item ON users.id=item."userId"
//   WHERE
//     item."typeId" = 3
//   GROUP BY
//     users.id
//   ORDER BY
//     users.id ASC;

//     `);
// 		const item4 = await connection.query(`
//     SELECT
//     users.id,
//     name,
//     COUNT("typeId")
//   FROM
//     users
//     JOIN item ON users.id=item."userId"
//   WHERE
//     item."typeId" = 4
//   GROUP BY
//     users.id
//   ORDER BY
//     users.id ASC;

//     `);
// 		const item5 = await connection.query(`
//     SELECT
//     users.id,
//     name,
//     COUNT("typeId")
//   FROM
//     users
//     JOIN item ON users.id=item."userId"
//   WHERE
//     item."typeId" = 5
//   GROUP BY
//     users.id
//   ORDER BY
//     users.id ASC;

//     `);
// 		const item6 = await connection.query(`
//     SELECT
//     users.id,
//     name,
//     COUNT("typeId")
//   FROM
//     users
//     JOIN item ON users.id=item."userId"
//   WHERE
//     item."typeId" = 6
//   GROUP BY
//     users.id
//   ORDER BY
//     users.id ASC;

//     `);
// 		//  let myRow =[item1.rowCount,item2.rowCount,item3.rowCount,item4.rowCount,item5.rowCount,item6.rowCount];
// 		//  let max = myRow.reduce(function(a, b) {
// 		//   return Math.max(a, b);
// 		// }, -Infinity);
// 		let tec = [];
// 		// let ids =[];
// 		for (let i = 0; i < usersIds.rowCount; i++) {
// 			tec.push({
// 				id: usersIds.rows[i].id,
// 				name: usersIds.rows[i].name,
// 				Trocas: item1.rows.find((item) => item.id == usersIds.rows[i].id)
// 					? item1.rows.find((item) => item.id == usersIds.rows[i].id).count
// 					: 0,
// 				Avaliações: item2.rows.find((item) => item.id == usersIds.rows[i].id)
// 					? item2.rows.find((item) => item.id == usersIds.rows[i].id).count
// 					: 0,
// 				"Avaliação e troca": item3.rows.find(
// 					(item) => item.id == usersIds.rows[i].id
// 				)
// 					? item3.rows.find((item) => item.id == usersIds.rows[i].id).count
// 					: 0,
// 				Fechamento: item4.rows.find((item) => item.id == usersIds.rows[i].id)
// 					? item4.rows.find((item) => item.id == usersIds.rows[i].id).count
// 					: 0,
// 				"NPC s/ OS": item5.rows.find((item) => item.id == usersIds.rows[i].id)
// 					? item5.rows.find((item) => item.id == usersIds.rows[i].id).count
// 					: 0,
// 				SW: item6.rows.find((item) => item.id == usersIds.rows[i].id)
// 					? item6.rows.find((item) => item.id == usersIds.rows[i].id).count
// 					: 0,
// 				sum: this.Trocas + this.Avaliações,
// 			});
// 		}

// 		res.send(tec);
// 	} catch (error) {
// 		console.log(error);
// 		return res.sendStatus(500);
// 	}
// }

// export async function getUsers(req, res) {
// 	try {
// 		const users = await connection.query(`
//       SELECT id,name,email FROM users;
//     `);
// 		res.send(users.rows);
// 	} catch (error) {
// 		console.log(error);
// 		return res.sendStatus(500);
// 	}
// }
// export async function getResume(req, res) {
// 	const { user } = res.locals;

// 	try {
// 		const item1 = await connection.query(
// 			`
//     SELECT
//     users.id,
//     name,
//     COUNT("typeId")
//   FROM
//     users
//     JOIN item ON users.id=item."userId"
//   WHERE
//     item."typeId" = 1 AND item."userId"= $1
//   GROUP BY
//     users.id;

//     `,
// 			[user.id]
// 		);
// 		const item2 = await connection.query(
// 			`
//     SELECT
//     users.id,
//     name,
//     COUNT("typeId")
//   FROM
//     users
//     JOIN item ON users.id=item."userId"
//   WHERE
//     item."typeId" = 2 AND item."userId"= $1
//   GROUP BY
//     users.id;

//     `,
// 			[user.id]
// 		);
// 		const item3 = await connection.query(
// 			`
//     SELECT
//     users.id,
//     name,
//     COUNT("typeId")
//   FROM
//     users
//     JOIN item ON users.id=item."userId"
//   WHERE
//     item."typeId" = 3 AND item."userId"= $1
//   GROUP BY
//     users.id;
//     `,
// 			[user.id]
// 		);
// 		const item4 = await connection.query(
// 			`
//     SELECT
//     users.id,
//     name,
//     COUNT("typeId")
//   FROM
//     users
//     JOIN item ON users.id=item."userId"
//   WHERE
//     item."typeId" = 4 AND item."userId"= $1
//   GROUP BY
//     users.id;
//     `,
// 			[user.id]
// 		);
// 		const item5 = await connection.query(
// 			`
//     SELECT
//     users.id,
//     name,
//     COUNT("typeId")
//   FROM
//     users
//     JOIN item ON users.id=item."userId"
//   WHERE
//     item."typeId" = 5 AND item."userId"= $1
//   GROUP BY
//     users.id;
//     `,
// 			[user.id]
// 		);
// 		const item6 = await connection.query(
// 			`
//     SELECT
//     users.id,
//     name,
//     COUNT("typeId")
//   FROM
//     users
//     JOIN item ON users.id=item."userId"
//   WHERE
//     item."typeId" = 6 AND item."userId"= $1
//   GROUP BY
//     users.id;

//     `,
// 			[user.id]
// 		);

// 		res.send({
// 			Trocas: item1.rowCount > 0 ? item1.rows[0].count : 0,
// 			Avaliações: item2.rowCount > 0 ? item2.rows[0].count : 0,
// 			"Avaliação e troca": item3.rowCount > 0 ? item3.rows[0].count : 0,
// 			Fechamento: item4.rowCount > 0 ? item4.rows[0].count : 0,
// 			"NPC s/ OS": item5.rowCount > 0 ? item5.rows[0].count : 0,
// 			SW: item6.rowCount > 0 ? item6.rows[0].count : 0,
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		return res.sendStatus(500);
// 	}
// }

// export async function getTotalResume(req, res) {
// 	try {
// 		const usersIds = await connection.query(`SELECT id,name FROM users;`);
// 		const item1 = await connection.query(`
//     SELECT
//     users.id,
//     name,
//     COUNT("typeId")
//   FROM
//     users
//     JOIN item ON users.id=item."userId"
//   WHERE
//     item."typeId" = 1
//   GROUP BY
//     users.id
//   ORDER BY
//     users.id ASC;
//     `);
// 		const item2 = await connection.query(`
//     SELECT
//     users.id,
//     name,
//     COUNT("typeId")
//   FROM
//     users
//     JOIN item ON users.id=item."userId"
//   WHERE
//     item."typeId" = 2
//   GROUP BY
//     users.id
//   ORDER BY
//     users.id ASC;

//     `);
// 		const item3 = await connection.query(`
//     SELECT
//     users.id,
//     name,
//     COUNT("typeId")
//   FROM
//     users
//     JOIN item ON users.id=item."userId"
//   WHERE
//     item."typeId" = 3
//   GROUP BY
//     users.id
//   ORDER BY
//     users.id ASC;

//     `);
// 		const item4 = await connection.query(`
//     SELECT
//     users.id,
//     name,
//     COUNT("typeId")
//   FROM
//     users
//     JOIN item ON users.id=item."userId"
//   WHERE
//     item."typeId" = 4
//   GROUP BY
//     users.id
//   ORDER BY
//     users.id ASC;

//     `);
// 		const item5 = await connection.query(`
//     SELECT
//     users.id,
//     name,
//     COUNT("typeId")
//   FROM
//     users
//     JOIN item ON users.id=item."userId"
//   WHERE
//     item."typeId" = 5
//   GROUP BY
//     users.id
//   ORDER BY
//     users.id ASC;

//     `);
// 		const item6 = await connection.query(`
//     SELECT
//     users.id,
//     name,
//     COUNT("typeId")
//   FROM
//     users
//     JOIN item ON users.id=item."userId"
//   WHERE
//     item."typeId" = 6
//   GROUP BY
//     users.id
//   ORDER BY
//     users.id ASC;

//     `);
// 		//  let myRow =[item1.rowCount,item2.rowCount,item3.rowCount,item4.rowCount,item5.rowCount,item6.rowCount];
// 		//  let max = myRow.reduce(function(a, b) {
// 		//   return Math.max(a, b);
// 		// }, -Infinity);
// 		let tec = [];
// 		// let ids =[];
// 		for (let i = 0; i < usersIds.rowCount; i++) {
// 			tec.push({
// 				id: usersIds.rows[i].id,
// 				name: usersIds.rows[i].name,
// 				Trocas: item1.rows.find((item) => item.id == usersIds.rows[i].id)
// 					? item1.rows.find((item) => item.id == usersIds.rows[i].id).count
// 					: 0,
// 				Avaliações: item2.rows.find((item) => item.id == usersIds.rows[i].id)
// 					? item2.rows.find((item) => item.id == usersIds.rows[i].id).count
// 					: 0,
// 				"Avaliação e troca": item3.rows.find(
// 					(item) => item.id == usersIds.rows[i].id
// 				)
// 					? item3.rows.find((item) => item.id == usersIds.rows[i].id).count
// 					: 0,
// 				Fechamento: item4.rows.find((item) => item.id == usersIds.rows[i].id)
// 					? item4.rows.find((item) => item.id == usersIds.rows[i].id).count
// 					: 0,
// 				"NPC s/ OS": item5.rows.find((item) => item.id == usersIds.rows[i].id)
// 					? item5.rows.find((item) => item.id == usersIds.rows[i].id).count
// 					: 0,
// 				SW: item6.rows.find((item) => item.id == usersIds.rows[i].id)
// 					? item6.rows.find((item) => item.id == usersIds.rows[i].id).count
// 					: 0,
// 			});
// 		}

// 		res.send(tec);
// 	} catch (error) {
// 		console.log(error);
// 		return res.sendStatus(500);
// 	}
// }

// export async function getTotalResumeByDate(req, res) {
// 	let dateEnd = req.query.endDate
// 		? req.query.endDate + " 23:59:59.599"
// 		: dayjs().format("YYYY/MM/DD") + " 23:59:59.599";
// 	let dateStart = req.query.startDate
// 		? req.query.startDate + " 00:00:00.000"
// 		: dayjs().subtract(1, "day").format("YYYY/MM/DD") + " 00:00:00.000";
// 	// let dateEnd =req.query.endDate+' 23:59:59.599'
// 	try {
// 		const usersIds = await connection.query(`SELECT id,name FROM users;`);
// 		const item1 = await connection.query(
// 			`
//     SELECT
//     users.id,
//     name,
//     COUNT("typeId")
//   FROM
//     users
//     JOIN item ON users.id=item."userId"
//   WHERE
//   item."typeId" = 1 AND item."datetime" BETWEEN $1 AND $2
//   GROUP BY
//     users.id
//   ORDER BY
//     users.id ASC;
//     `,
// 			[dateStart, dateEnd]
// 		);
// 		const item2 = await connection.query(
// 			`
//     SELECT
//     users.id,
//     name,
//     COUNT("typeId")
//   FROM
//     users
//     JOIN item ON users.id=item."userId"
//   WHERE
//   item."typeId" = 2 AND item."datetime" BETWEEN $1 AND $2
//   GROUP BY
//     users.id
//   ORDER BY
//     users.id ASC;

//     `,
// 			[dateStart, dateEnd]
// 		);
// 		const item3 = await connection.query(
// 			`
//     SELECT
//     users.id,
//     name,
//     COUNT("typeId")
//   FROM
//     users
//     JOIN item ON users.id=item."userId"
//   WHERE
//     item."typeId" = 3 AND item."datetime" BETWEEN $1 AND $2
//   GROUP BY
//     users.id
//   ORDER BY
//     users.id ASC;

//     `,
// 			[dateStart, dateEnd]
// 		);
// 		const item4 = await connection.query(
// 			`
//     SELECT
//     users.id,
//     name,
//     COUNT("typeId")
//   FROM
//     users
//     JOIN item ON users.id=item."userId"
//   WHERE
//     item."typeId" = 4 AND item."datetime" BETWEEN $1 AND $2
//   GROUP BY
//     users.id
//   ORDER BY
//     users.id ASC;
//   `,
// 			[dateStart, dateEnd]
// 		);
// 		const item5 = await connection.query(
// 			`
//       SELECT
//       users.id,
//       name,
//       COUNT("typeId")
//     FROM
//       users
//       JOIN item ON users.id=item."userId"
//     WHERE
//       item."typeId" = 5 AND item."datetime" BETWEEN $1 AND $2
//     GROUP BY
//       users.id
//     ORDER BY
//       users.id ASC;
//     `,
// 			[dateStart, dateEnd]
// 		);
// 		const item6 = await connection.query(
// 			`
//       SELECT
//       users.id,
//       name,
//       COUNT("typeId")
//     FROM
//       users
//       JOIN item ON users.id=item."userId"
//     WHERE
//       item."typeId" = 6 AND item."datetime" BETWEEN $1 AND $2
//     GROUP BY
//       users.id
//     ORDER BY
//       users.id ASC;
//     `,
// 			[dateStart, dateEnd]
// 		);
// 		let tec = [];
// 		for (let i = 0; i < usersIds.rowCount; i++) {
// 			tec.push({
// 				id: usersIds.rows[i].id,
// 				name: usersIds.rows[i].name,
// 				Trocas: item1.rows.find((item) => item.id == usersIds.rows[i].id)
// 					? item1.rows.find((item) => item.id == usersIds.rows[i].id).count
// 					: 0,
// 				Avaliações: item2.rows.find((item) => item.id == usersIds.rows[i].id)
// 					? item2.rows.find((item) => item.id == usersIds.rows[i].id).count
// 					: 0,
// 				"Avaliação e troca": item3.rows.find(
// 					(item) => item.id == usersIds.rows[i].id
// 				)
// 					? item3.rows.find((item) => item.id == usersIds.rows[i].id).count
// 					: 0,
// 				Fechamento: item4.rows.find((item) => item.id == usersIds.rows[i].id)
// 					? item4.rows.find((item) => item.id == usersIds.rows[i].id).count
// 					: 0,
// 				"NPC s/ OS": item5.rows.find((item) => item.id == usersIds.rows[i].id)
// 					? item5.rows.find((item) => item.id == usersIds.rows[i].id).count
// 					: 0,
// 				SW: item6.rows.find((item) => item.id == usersIds.rows[i].id)
// 					? item6.rows.find((item) => item.id == usersIds.rows[i].id).count
// 					: 0,
// 			});
// 		}
// 		res.send(tec);
// 	} catch (error) {
// 		console.log(error);
// 		return res.sendStatus(500);
// 	}
// }

export default { SignUp, SignIn };
