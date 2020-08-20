import React, { useState } from "react";
import "./style.scss";

const onSubmitHandler = async (evt, setData, setIsLoading, setStatus) => {
  setIsLoading(true);
  evt.preventDefault();
  const region = new FormData(evt.target).get("region");
  const city = new FormData(evt.target).get("city");
  const street = new FormData(evt.target).get("street");
  const house = new FormData(evt.target).get("house");
  const flat = new FormData(evt.target).get("flat");
  console.log(region, city, street, house);

  if (!street || !city || !street || !house) {
    setIsLoading(false);
    return;
  }

  try {
    const data = await fetch("https://apirosreestr.ru/api/cadaster/search", {
      method: "POST",
      headers: {
        "Access-Control-Request-Headers": "Content-Type,Token",
        "Access-Control-Request-Method":
          "GET, PUT, POST, DELETE, HEAD, OPTIONS",
        Token: "GRGW-EZEB-K7SH-YTSL",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: {
          region_code: region,
          raion: city,
          settlement: "",
          street,
          house,
          building: "",
          block: "",
          flat,
        },
        grouped: 0,
      }),
    });
    const resp = await data.json();
    console.log(resp);
    setStatus([data.status, data.statusText]);
    setData(resp);
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
  }
};

function Aside({ setData, isLoading, setIsLoading }) {
  const [status, setStatus] = useState(null);

  return (
    <div className="Aside">
      <form
        onSubmit={(evt) =>
          onSubmitHandler(evt, setData, setIsLoading, setStatus)
        }
      >
        <label>
          Регион*
          <input
            name="region"
            type="text"
            placeholder="Регион"
            defaultValue="57"
          />
        </label>
        <label>
          Город*
          <input
            name="city"
            type="text"
            placeholder="Город"
            defaultValue="Орел"
          />
        </label>
        <label>
          Улица*
          <input name="street" type="text" placeholder="Улица" />
        </label>
        <label>
          Дом*
          <input name="house" type="text" placeholder="Дом" />
        </label>
        <label>
          Квартира
          <input name="flat" type="text" placeholder="Квартира" />
        </label>
        <footer>
          <button disabled={isLoading}>Найти</button>{" "}
          {status && status.join(" ")}
        </footer>
      </form>
    </div>
  );
}

export default Aside;
