import Image from "next/image";
import Link from "next/link";
const CatEvents = ({ data, city }) => {
  return (
    <div className="cat-events">
      <h1>Events in {city.toUpperCase()}</h1>
      <div className="content">
        {data.map((ev) => (
          <Link
            className="card"
            key={ev.id}
            href={`/events/${ev.city}/${ev.id}`}
          >
            <div className="image">
              <Image
                // width={300}
                // height={300}
                src={ev.image}
                alt={ev.title}
                layout="fill"
                objectFit="cover"
                priority="true"
              />
            </div>
            <h2>{ev.title}</h2>
            <p>{ev.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default CatEvents;
