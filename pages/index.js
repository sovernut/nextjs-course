import MeetUpList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://static.wikia.nocookie.net/a-place-further-from-the-universe/images/e/eb/Parka_Hinata_1.PNG",
    address: "Some Address 123456 City",
    description: "first meetup",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://static.wikia.nocookie.net/a-place-further-from-the-universe/images/e/eb/Parka_Hinata_1.PNG",
    address: "Some Address 123456 City",
    description: "first meetup",
  },
];

function HomePage(props) {
  return <MeetUpList meetups={props.meetups} />;
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
    revalidate: 10, // nextJs will re-generate html page every 10 seconds (if page accessed)
  };
}

export default HomePage;
