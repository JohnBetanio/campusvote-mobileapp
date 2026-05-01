import { Tabs } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Colors } from '@/constants/Colors';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function TabIcon({ name, focused }: { name: any; focused: boolean }) {
    return (
        <View
            style={{
                width: 40,
                height: 36,
                borderRadius: 18,
                backgroundColor: focused ? 'rgba(255,255,255,0.2)' : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Ionicons
                name={name}
                size={focused ? 22 : 20}
                color={focused ? '#fff' : 'rgba(255,255,255,0.6)'}
            />
        </View>
    );
}

export default function DashboardLayout() {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: Colors.primary,
                    borderTopWidth: 0,
                    height: 54,
                    paddingBottom: 0,
                    paddingTop: 2,
                },
                tabBarActiveTintColor: '#ffffff',
                tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
            }}
        >
            {/* Auto-discovered hidden routes */}
            <Tabs.Screen name="index" options={{ tabBarButton: () => null }} />
            <Tabs.Screen name="(admin)/AdminEditElection" options={{ tabBarButton: () => null }} />

            {/* Student tabs */}
            <Tabs.Screen
                name="(voter)/VoterDashboard"
                options={{
                    title: 'Home',
                    href: isAdmin ? null : undefined,
                    tabBarIcon: ({ focused }) => <TabIcon name="home-outline" focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="(voter)/VoterVote"
                options={{
                    title: 'Vote Now',
                    href: isAdmin ? null : undefined,
                    tabBarIcon: ({ focused }) => <TabIcon name="grid-outline" focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="(voter)/VoterVotes"
                options={{
                    title: 'View Votes',
                    href: isAdmin ? null : undefined,
                    tabBarIcon: ({ focused }) => <TabIcon name="refresh-outline" focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="(voter)/VoterResults"
                options={{
                    title: 'Results',
                    href: isAdmin ? null : undefined,
                    tabBarIcon: ({ focused }) => <TabIcon name="bar-chart-outline" focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="(voter)/VoterProfile"
                options={{
                    title: 'Profile',
                    href: isAdmin ? null : undefined,
                    tabBarIcon: ({ focused }) => <TabIcon name="person-outline" focused={focused} />,
                }}
            />

            {/* Admin tabs */}
            <Tabs.Screen
                name="(admin)/AdminDashboard"
                options={{
                    title: 'Home',
                    href: isAdmin ? undefined : null,
                    tabBarIcon: ({ focused }) => <TabIcon name="home-outline" focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="(admin)/AdminElections"
                options={{
                    title: 'Elections',
                    href: isAdmin ? undefined : null,
                    tabBarIcon: ({ focused }) => <TabIcon name="options-outline" focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="(admin)/AdminCreateElection"
                options={{
                    title: 'Create',
                    href: isAdmin ? undefined : null,
                    tabBarIcon: ({ focused }) => <TabIcon name="add-outline" focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="(admin)/AdminVoters"
                options={{
                    title: 'Voters',
                    href: isAdmin ? undefined : null,
                    tabBarIcon: ({ focused }) => <TabIcon name="people-outline" focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="(admin)/AdminResults"
                options={{
                    title: 'Results',
                    href: isAdmin ? undefined : null,
                    tabBarIcon: ({ focused }) => <TabIcon name="bar-chart-outline" focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="(admin)/AdminAnnouncements"
                options={{
                    title: 'Announcements',
                    href: isAdmin ? undefined : null,
                    tabBarIcon: ({ focused }) => <TabIcon name="notifications-outline" focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="(admin)/AdminProfile"
                options={{
                    href: null,
                    tabBarIcon: ({ focused }) => <TabIcon name="person-outline" focused={focused} />,
                }}
            />
        </Tabs>
    );
}
