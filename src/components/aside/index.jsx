import React, { useState } from 'react';
import './style.scss';
import { getQueryFromObject } from 'components/history';

const onSubmitHandler = async (evt, request) => {
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

  try {
    if (queryText) {
      const data = await request(queryText);
      console.log(data);
      query = data.objects[0].ADDRESS;
    }

    const resp = await request(query);
    console.log(resp);
    resp.query =
      typeof query === 'string'
        ? query.trim()
        : getQueryFromObject(query).trim();
    resp.date = Date.now();
    return resp;
  } catch (err) {
    console.log(err);
  }
};

function Aside({ request, isLoading, status, setData }) {
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
        onSubmit={async (evt) => {
          evt.preventDefault();
          setData(null);
          const data = await onSubmitHandler(evt, request);
          setData(data);
        }}
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
