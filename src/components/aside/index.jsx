import React, { useState } from "react";
import "./style.scss";

const onSubmitHandler = async (evt, setData, setIsLoading, setStatus) => {
  setIsLoading(true);
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const query = formData.get("query") || {
    region_code: formData.get("region_code"),
    raion: formData.get("raion"),
    settlement: formData.get("settlement"),
    street: formData.get("street"),
    house: formData.get("house"),
    building: formData.get("building"),
    block: formData.get("block"),
    flat: formData.get("flat"),
  };

  setStatus(null);
  setData(null);

  try {
    const data = await fetch("https://apirosreestr.ru/api/cadaster/search", {
      method: "POST",
      headers: {
        Token: "GRGW-EZEB-K7SH-YTSL",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        grouped: 0,
      }),
    });
    setStatus([data.status, data.statusText]);
    const resp = await data.json();
    resp.query = query;
    resp.date = Date.now();
    console.log(resp);
    setData(resp);
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
  }
};

function Aside({ setData, isLoading, setIsLoading }) {
  const [status, setStatus] = useState(null);
  const [isNumberType, setNumberType] = useState(false);

  return (
    <section className="Aside">
      <h2>Поиск</h2>
      <label>
        По кадастровому номеру
        <input
          type="checkbox"
          checked={isNumberType}
          onChange={(evt) => setNumberType(evt.target.checked)}
          name="isNumberType"
        />
      </label>
      <form
        onSubmit={(evt) =>
          onSubmitHandler(evt, setData, setIsLoading, setStatus)
        }
      >
        {isNumberType ? (
          <label>
            кадастровый номер
            <input
              name="query"
              type="text"
              required
              placeholder="кадастровый номер"
            />
          </label>
        ) : (
          <>
            <label>
              номер региона, обязательно
              <input
                name="region_code"
                type="text"
                required
                placeholder="номер региона, обязательно"
                defaultValue="57"
              />
            </label>
            <label>
              название города или района
              <input
                name="raion"
                type="text"
                placeholder="название города или района"
                defaultValue="Орел"
              />
            </label>
            <label>
              населенный пункт, без типа
              <input
                name="settlement"
                type="text"
                placeholder="населенный пункт, без типа"
              />
            </label>
            <label>
              улица, без указания типа
              <input
                name="street"
                type="text"
                placeholder="улица, без указания типа"
              />
            </label>
            <label>
              номер дома
              <input name="house" type="text" placeholder="номер дома" />
            </label>
            <label>
              строение
              <input name="building" type="text" placeholder="строение" />
            </label>
            <label>
              корпус
              <input name="block" type="text" placeholder="корпус" />
            </label>
            <label>
              квартира или помещение
              <input
                name="flat"
                type="text"
                placeholder="квартира или помещение"
              />
            </label>
          </>
        )}

        <footer>
          <button disabled={isLoading}>Найти</button>{" "}
          {status && status.join(" ")}
        </footer>
      </form>
    </section>
  );
}

export default Aside;
