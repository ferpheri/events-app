import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
const SingleEvent = ({ data }) => {
  const inputEmail = useRef();
  const router = useRouter();
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (message !== "" && message !== null) {
      console.log("Message changed, displaying alert:", message);
      alert(message);
    }
  }, [message]);
    // const setMessage = (newMessage) => {
    //   console.log("Setting message:", newMessage);
    //   setMessage(newMessage);
    // };
  const onSubmit = async (e) => {
    e.preventDefault();
    const emailValue = inputEmail.current.value;
    const eventId = router?.query.id;
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    console.log("Submitting form...");
    if (!emailValue.match(validRegex)) {
      console.log("Invalid email format, setting message...");
      setMessage("Please introduce a correct email address");
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
      console.log("Setting message from response data...");
      setMessage(responseData.message);
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
      {/* <alert>{message}</alert> */}
    </div>
  );
};
export default SingleEvent;
