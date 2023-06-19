import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TrendingMeme, useApi } from '../hooks/UseApi';
import {
	Center,
	Heading,
	ScrollView,
	Skeleton,
	VStack,
	useTheme,
} from 'native-base';

import Swiper from 'react-native-swiper';

const HomeScreen = () => {
	const theme = useTheme();
	const { getTrending } = useApi();
	const [memes, setMemes] = useState<TrendingMeme[] | null>(null);
	const [loading, setLoading] = useState(true);

	const styles = StyleSheet.create({
		wrapper: {},
		text: {
			color: theme.colors.primary[500],
			fontSize: 30,
			fontWeight: 'bold',
		},
	});

	useEffect(() => {
		const loadMemes = async () => {
			const results = await getTrending();
			setMemes(results);
			setLoading(false);
		};
		loadMemes();
	}, []);
	return (
		<ScrollView>
			{loading && (
				<Center w='100%' mt={8}>
					<VStack w='90%' space={4}>
						<Skeleton.Text px='2' />
						<Skeleton h='40' />
					</VStack>
				</Center>
			)}

			{!loading && (
				<Swiper
					style={styles.wrapper}
					showsButtons={true}
					showsPagination={false}>
					{memes?.map((meme, index) => (
						<View key={index}>
							<VStack alignItems={'center'} space={4} mt={4}>
								<Heading style={styles.text}>
									{meme.title}
								</Heading>
								<Image
									source={{ uri: meme.url }}
									style={{ width: '95%', height: 300 }}
								/>
							</VStack>
						</View>
					))}
				</Swiper>
			)}

			<Heading>Test</Heading>
		</ScrollView>
	);
};
export default HomeScreen;
