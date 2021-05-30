import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient,ObjectId } from "mongodb";

function MeetupDetails(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      address={props.meetupData.address}
      description={props.meetupData.description}
      title={props.meetupData.title}
    ></MeetupDetail>
  );
}
export async function getStaticPaths(context) {
  // pre
  const client = await MongoClient.connect(
    `mongodb+srv://merchant01:${process.env.MONGO_PASS}@cluster0.q8khg.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close()
  return {
    fallback: false, // set to "true" generate if not have path below
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log(meetupId);
  const client = await MongoClient.connect(
    `mongodb+srv://merchant01:${process.env.MONGO_PASS}@cluster0.q8khg.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
  console.log("selected = ",selectedMeetup)
  client.close()
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
