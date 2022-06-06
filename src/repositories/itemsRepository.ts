import { prisma } from "../database.js";
import {
	createItemType,
	Status,
	createHistoricType,
} from "../types/itensTypes.js";

async function Insert(item: createItemType) {
	const result = await prisma.item.create({
		data: item,
	});
	return result;
}

async function FindItembyOs(os: string) {
	const result = await prisma.item.findUnique({
		where: {
			os,
		},
	});
	return result;
}
async function UpdateHistoric(historic: createHistoricType) {
	const result = await prisma.historic.create({
		data: historic,
	});
	return result;
}
async function FindById(id: number) {
	const result = await prisma.item.findUnique({
		where: { id },
	});
	return result;
}

async function GetItemsByUserIdAndIsOpen(userId: number) {
	const result = await prisma.item.findMany({
		where: {
			OR: [
				{
					OR: [
						{ status: "PendingSaw" },
						{ status: "PendingCost" },
						{ status: "PendingParts" },
						{ status: "PendingOthers" },
					],
				},
				{
					AND: [
						{
							OR: [
								{ status: "Avaliation" },
								{ status: "InRepair" },
								{ status: "OQCFail" },
							],
						},
						{ userIdUpdated: userId },
					],
				},
			],
		},
		include: {
			userChanged: { select: { name: true, id: true } },
		},
	});
	return result;
}

async function UpdateStatus(id: number, status: Status, userId: number) {
	const result = await prisma.item.update({
		where: { id },
		data: {
			status: { set: status },
			updateTime: { set: new Date() },
			userIdUpdated: { set: userId },
		},
	});

	return result;
}

async function UpdateElapsedTime(id: number, elapsedTime: number) {
	const result = await prisma.item.update({
		where: { id },
		data: { elapsedTime: { set: elapsedTime } },
	});
	return result;
}

async function FindByOs(os: string) {
	const result = await prisma.item.findMany({
		where: { os },
	});
	return result;
}
export default {
	UpdateHistoric,
	Insert,
	FindByOs,
	GetItemsByUserIdAndIsOpen,
	UpdateStatus,
	UpdateElapsedTime,
	FindById,
	FindItembyOs,
};
