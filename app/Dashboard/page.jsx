import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from '../auth'; // Adjust the path according to your auth.js location
// Note: `unstable_getServerSession` is used here as per Next-Auth v5 beta docs

export const getServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default function Dashboard() {
  return <h1>Dashboard - Protected Area</h1>;
}