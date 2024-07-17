import { getPositionShortname } from "../helpers";
import { Player } from "../types/player";

interface FetchPlayersResponse {
	data: Player[];
	hasNextPage: boolean;
	currentPage: number;
}

export const fetchPlayers = async ({
	pageParam,
	searchValue,
	position,
}): Promise<FetchPlayersResponse> => {
	let url = `http://localhost:3000/api/players/page/${pageParam}/limit/10`;

	const position2Char = getPositionShortname(position);

	if (searchValue.length > 0 && position2Char) {
		url += `?search=${searchValue.replaceAll(
			" ",
			""
		)}&position=${position2Char}`;
	} else if (searchValue.length > 0) {
		url += `?search=${searchValue}`;
	} else if (position) {
		url += `?position=${position2Char}`;
	}

	const res = await fetch(url);

	return res.json();
};
