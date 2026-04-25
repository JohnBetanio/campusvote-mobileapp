import { Tabs } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Colors } from '@/constants/Colors';
import { Text } from 'react-native';

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: focused ? 24 : 20, opacity: focused ? 1 : 0.6 }}>
      {emoji}
    </Text>
  );
}

export default function TabLayout() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const tabBarColor = isAdmin ? Colors.adminPrimary : Colors.primary;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: tabBarColor,
          borderTopWidth: 0,
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      {/* Student tabs */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          href: isAdmin ? null : undefined,
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="elections"
        options={{
          title: 'Elections',
          href: isAdmin ? null : undefined,
          tabBarIcon: ({ focused }) => <TabIcon emoji="🗳️" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: 'Results',
          href: isAdmin ? null : undefined,
          tabBarIcon: ({ focused }) => <TabIcon emoji="📊" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          href: isAdmin ? null : undefined,
          tabBarIcon: ({ focused }) => <TabIcon emoji="👤" focused={focused} />,
        }}
      />

      {/* Admin tabs */}
      <Tabs.Screen
        name="admin-dashboard"
        options={{
          title: 'Dashboard',
          href: isAdmin ? undefined : null,
          tabBarIcon: ({ focused }) => <TabIcon emoji="📋" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="admin-students"
        options={{
          title: 'Students',
          href: isAdmin ? undefined : null,
          tabBarIcon: ({ focused }) => <TabIcon emoji="👥" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="admin-elections"
        options={{
          title: 'Elections',
          href: isAdmin ? undefined : null,
          tabBarIcon: ({ focused }) => <TabIcon emoji="🗳️" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="admin-profile"
        options={{
          title: 'Profile',
          href: isAdmin ? undefined : null,
          tabBarIcon: ({ focused }) => <TabIcon emoji="🛡️" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
