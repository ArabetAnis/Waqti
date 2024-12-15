import { GetServerSideProps } from 'next';
// Note: `unstable_getServerSession` is used here as per Next-Auth v5 beta docs

export default function Dashboard() {
  return <h1>Team Tasks - Protected Area</h1>;
}