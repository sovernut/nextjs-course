import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails() {
  return (
    <MeetupDetail
      image="https://static.wikia.nocookie.net/a-place-further-from-the-universe/images/e/eb/Parka_Hinata_1.PNG"
      address="Some Address 123456 City"
      description="descriptiiiiion"
      title="first meetup"
    ></MeetupDetail>
  );
}
export async function getStaticPaths(context) { // pre
  return {
    fallback: false, // set to "true" generate if not have path below
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log(meetupId);
  return {
    props: {
      meetupData: {
        image:
          "https://static.wikia.nocookie.net/a-place-further-from-the-universe/images/e/eb/Parka_Hinata_1.PNG",
        address: "Some Address 123456 City",
        description: "descriptiiiiion",
        title: "first meetup",
        id: meetupId,
      },
    },
  };
}

export default MeetupDetails;
