import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
const SingleEvent = ({ data }) => {
  const inputEmail = useRef();
  const router = useRouter();
  const [message, setMessage] = useState("");
const [messageClass,setMessageClass] = useState('')
  const onSubmit = async (e) => {
    e.preventDefault();
    const emailValue = inputEmail.current.value;
    const eventId = router?.query.id;
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailValue.match(validRegex)) {
      setMessage("Please introduce a correct email address");
      setMessageClass("message-error")
      return;
    }
    try {
      const response = await fetch("/api/email-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailValue, eventId }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const responseData = await response.json();
      setMessage(responseData.message);
      setMessageClass("message-success");
      inputEmail.current.value = "";
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  return (
    <div className="event-single-page">
      <h1>{data.title}</h1>
      <Image
        width={1000}
        height={300}
        src={data.image}
        alt={data.title}
        priority="true"
      />
      <p>{data.description}</p>
      <form onSubmit={onSubmit} className="email-registration">
        <label>Get registered for this event!</label>
        <input
          ref={inputEmail}
          id="email"
          placeholder="Please insert your email"
        />
        <button type="submit">Submit</button>
      </form>
      <p className={messageClass}>{message}</p>
    </div>
  );
};
export default SingleEvent;
