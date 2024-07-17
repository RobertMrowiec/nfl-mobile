import { Player } from "../types/player";

export const fetchPlayerById = async (id: string): Promise<Player> => {
	let url = `http://localhost:3000/api/players/${id}`;

	const res = await fetch(url);

	return res.json();
};
