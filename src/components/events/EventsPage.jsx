import Image from "next/image";
import Link from "next/link";
const EventsPage = ({ data }) => {
  return (
    <div className="events-page">
      {data.map((ev) => (
        <Link className="card" key={ev.id} href={`/events/${ev.id}`}>
          <div className="image">
            <Image
              src={ev.image}
              alt={ev.title}
              priority="true"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h2>{ev.title}</h2>
        </Link>
      ))}
    </div>
  );
};
export default EventsPage;
