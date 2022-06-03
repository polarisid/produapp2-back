import itemsRepository from "../repositories/itemsRepository.js";
import { createItemType, Status } from "../types/itensTypes.js";
import { conflictError } from "../utils/errorUtils.js";

async function InsertNewItemOnDB(item: createItemType) {
	const existingOs = await itemsRepository.FindByOs(item.os);
	if (existingOs.length > 0)
		throw conflictError("OS already exists in database");
	const result = await itemsRepository.Insert(item);
	return result;
}

async function GetItemsByUserIdAndIsOpen(userId: number) {
	console.log(userId);
	const result = await itemsRepository.GetItemsByUserIdAndIsOpen(userId);
	return result;
}

async function UpdateStatus(id: number, status: Status, userId: number) {
	const existingid = await itemsRepository.FindById(id);
	if (!existingid) throw conflictError("Item not found");
	if (existingid.userId != userId)
		throw conflictError("You are not the owner of this item");

	const result = await itemsRepository.UpdateStatus(id, status);
	return result;
}

async function UpdateElapsedTime(
	id: number,
	elapsedTime: number,
	userId: number
) {
	const existingid = await itemsRepository.FindById(id);
	if (!existingid) throw conflictError("Item not found");
	if (existingid.userId != userId)
		throw conflictError("You are not the owner of this item");
	const result = await itemsRepository.UpdateElapsedTime(id, elapsedTime);
	return result;
}

export default {
	InsertNewItemOnDB,
	UpdateStatus,
	UpdateElapsedTime,
	GetItemsByUserIdAndIsOpen,
};
