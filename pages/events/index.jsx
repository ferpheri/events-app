import EventsPage from "@/src/components/events/EventsPage";

const EventsPageIndex = ({ data }) => {
  return <EventsPage data={data} />;
};
export default EventsPageIndex;

export async function getStaticProps() {
  const { events_categories } = await import("../../data/data.json");
  return {
    props: {
      data: events_categories,
    },
  };
}
