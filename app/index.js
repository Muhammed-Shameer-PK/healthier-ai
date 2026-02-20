import { Redirect } from 'expo-router';

// Entry point — send users to role selection first
// so both Woman and ASHA flows are accessible from the start.
export default function Index() {
  return <Redirect href="/role-select" />;
}
