import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
	DrawerContentScrollView,
	createDrawerNavigator,
} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import HomeScreen from './components/HomeScreen';
import CreatorScreen from './components/CreatorScreen';
import AboutScreen from './components/AboutScreen';
import {
	Center,
	HStack,
	Heading,
	Icon,
	NativeBaseProvider,
	Pressable,
	Text,
	VStack,
	extendTheme,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const theme = extendTheme({});

const getIcon = (screenName: string) => {
	switch (screenName) {
		case 'Home':
			return 'home';
		case 'About':
			return 'information';
		case 'Creator':
			return 'fire';
		default:
			return undefined;
	}
};

const CustomDrawerContent = (props: any) => {
	return (
		<DrawerContentScrollView {...props}>
			<Center>
				<Heading color={'secondary.600'}>Menu</Heading>
			</Center>
			<VStack m={2} mx={1} space={3}>
				{props.state.routeNames.map((name: string, index: number) => (
					<Pressable
						key={index}
						px={5}
						py={3}
						rounded={'md'}
						onPress={event => props.navigation.navigate(name)}
						bg={
							index === props.state.index
								? 'secondary.100'
								: 'transparent'
						}>
						<HStack p={2} space={5} alignItems={'center'}>
							<Icon
								fontWeight={500}
								color={
									index === props.state.index
										? 'secondary.600'
										: 'gray.700'
								}
								as={
									<MaterialCommunityIcons
										name={getIcon(
											name
										)}></MaterialCommunityIcons>
								}></Icon>
							<Text
								fontWeight={500}
								color={
									index === props.state.index
										? 'secondary.600'
										: 'gray.700'
								}>
								{name}
							</Text>
						</HStack>
					</Pressable>
				))}
			</VStack>
		</DrawerContentScrollView>
	);
};

export default function App() {
	const headerStyle = {
		headerStyle: {
			backgroundColor: theme.colors.secondary[600],
		},
		headerTintColor: '#fff',
	};

	return (
		<NativeBaseProvider theme={theme}>
			<SafeAreaProvider>
				<NavigationContainer>
					<Drawer.Navigator
						drawerContent={props => (
							<CustomDrawerContent {...props} />
						)}
						initialRouteName='Home'>
						<Drawer.Screen
							name='Home'
							component={HomeScreen}
							options={{
								title: 'Trending Memes',
								...headerStyle,
							}}
						/>
						<Drawer.Screen
							name='Creator'
							component={CreatorScreen}
							options={{
								title: 'Meme Generator',
								...headerStyle,
							}}
						/>
						<Drawer.Screen
							name='About'
							component={AboutScreen}
							options={{
								title: 'About the App',
								...headerStyle,
							}}
						/>
					</Drawer.Navigator>
				</NavigationContainer>
			</SafeAreaProvider>
		</NativeBaseProvider>
	);
}
