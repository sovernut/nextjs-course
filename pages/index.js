import MeetUpList from "../components/meetups/MeetupList";
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
function HomePage() {
  return <MeetUpList meetups={DUMMY_MEETUPS} />;
}

export default HomePage;
