import { prisma } from "../database.js";
import { createItemType, Status } from "../types/itensTypes.js";

async function Insert(item: createItemType) {
	const result = await prisma.item.create({
		data: item,
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
			userId: { equals: userId },
			NOT: { status: "Finished" },
		},
	});
	return result;
}

async function UpdateStatus(id: number, status: Status) {
	const result = await prisma.item.update({
		where: { id },
		data: { status: { set: status }, updateTime: { set: new Date() } },
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
	Insert,
	FindByOs,
	GetItemsByUserIdAndIsOpen,
	UpdateStatus,
	UpdateElapsedTime,
	FindById,
};
