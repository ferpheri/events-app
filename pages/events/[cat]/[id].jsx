import Image from "next/image";
const SingleEventPage = ({ data }) => {
  console.log(data);
  return (
    <div>
      <Image
        width={1000}
        height={300}
        src={data.image}
        alt={data.title}
        priority="true"
      />
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
};
export default SingleEventPage;

export async function getStaticPaths() {
  const { allEvents } = await import("../../../data/data.json");
  const allPaths = allEvents.map((path) => {
    return {
      params: {
        cat: path.city,
        id: path.id,
      },
    };
  });
  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { allEvents } = await import("../../../data/data.json");
  console.log(context);
  const id = context?.params.id;
  console.log(id);
  const eventData = allEvents.find((ev) => ev.id === id);
  return {
    props: {
      data: eventData,
    },
  };
}
