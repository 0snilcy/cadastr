import React, { useState } from 'react';
import './style.scss';
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
});

const setRequest = async (query, setData, setIsLoading, setStatus) => {
  try {
    const { data, status, statusText } = await api.post('/', {
      query,
      grouped: 0,
    });
    setStatus(`${status} ${statusText}`);
    return data;
  } catch (err) {
    console.log(err);
    setStatus(err.message);
    setIsLoading(false);
  }
};

const onSubmitHandler = async (evt, setData, setIsLoading, setStatus) => {
  setIsLoading(true);
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const queryText = formData.get('query');
  let query = queryText || {
    region_code: formData.get('region_code'),
    raion: formData.get('raion'),
    settlement: formData.get('settlement'),
    street: formData.get('street'),
    house: formData.get('house'),
    building: formData.get('building'),
    block: formData.get('block'),
    flat: formData.get('flat'),
  };

  setStatus(null);
  setData(null);

  try {
    if (queryText) {
      const data = await setRequest(
        queryText,
        setData,
        setIsLoading,
        setStatus
      );
      console.log(data);
      query = data.objects[0].ADDRESS;
    }

    const resp = await setRequest(query, setData, setIsLoading, setStatus);
    resp.query = query.trim();
    resp.date = Date.now();

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
          <button disabled={isLoading}>Найти</button> {status}
        </footer>
      </form>
    </section>
  );
}

export default Aside;
