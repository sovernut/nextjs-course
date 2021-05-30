import MeetUpList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from 'next/head'
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Meetup</title>
        <meta name="description" content="Browse a huge list of meetups" />
      </Head>
      <MeetUpList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) { // run on serverSide every times on request
//     const req = context.req
//     const res = context.res
//     // fetch data from an API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
  // run on build process
  // fetch data from an API
  const client = await MongoClient.connect(
    `mongodb+srv://merchant01:${process.env.MONGO_PASS}@cluster0.q8khg.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1, // nextJs will re-generate html page every 1 seconds (if page accessed)
  };
}

export default HomePage;
