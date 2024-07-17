import React from "react";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { Card, HStack, Text, VStack } from "@gluestack-ui/themed";

import { Player } from "../types/player";
import { fixPlayerHeight } from "../helpers/index";

const PlayerCard = ({ player, index }: { player: Player; index: number }) => {
	return (
		<Link
			href={{ pathname: `/players/${player.player_id}`, params: { ...player } }}
			asChild
		>
			<Pressable>
				<Card
					testID={`playerCard-${index}`}
					key={player.player_id}
					height={"$20"}
					marginVertical={"$1"}
					paddingVertical={"$3"}
					style={{
						borderWidth: 1,
						borderColor: player.active
							? "rgba(0,120,0, 0.6)"
							: "rgba(120,120,120, 0.3)",
					}}
				>
					<HStack w="$full" flex={1} alignItems="center">
						<VStack h={"$full"} justifyContent="space-between">
							<Text w={"$12"} fontSize={"$sm"}>
								Nr.
							</Text>
							<Text w={"$12"} fontSize={"$3xl"}>
								{player.number}
							</Text>
						</VStack>

						<HStack
							height={"$full"}
							flex={1}
							flexGrow={1}
							justifyContent="space-between"
							alignContent="space-between"
						>
							<VStack
								justifyContent="space-between"
								paddingHorizontal={"$3"}
								width={"$full"}
								flex={1}
							>
								<Text fontSize={"$xl"} fontWeight={"$semibold"}>
									{player.full_name}
								</Text>
								<HStack justifyContent="space-between">
									<Text>Age: {player.age}</Text>

									<HStack marginLeft={"auto"}>
										<Text>H: {fixPlayerHeight(player.height)}</Text>
									</HStack>
								</HStack>
							</VStack>

							<VStack
								w={"$10"}
								h={"$full"}
								justifyContent="space-between"
								alignItems="center"
							>
								<Text fontSize={"$sm"}>Pos.</Text>
								<Text fontSize={"$2xl"}>{player.position}</Text>
							</VStack>
						</HStack>
					</HStack>
				</Card>
			</Pressable>
		</Link>
	);
};

export default PlayerCard;
