import React from 'react';
import './style.scss';

const KEY = 'history';

export const getQueryFromObject = (obj) =>
  Object.values(obj)
    .filter((el) => el)
    .join(`, `);

const loadData = () => {
  try {
    const data = JSON.parse(localStorage.getItem(KEY)) || [];
    data.sort((a, b) => a.date - b.date);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const saveData = (data) => {
  const loadedData = loadData().filter((item) => {
    if (typeof data.query === 'string') {
      return item.query !== data.query;
    }

    return getQueryFromObject(data) !== getQueryFromObject(item);
  });
  localStorage.setItem(KEY, JSON.stringify([...loadedData, data]));
};

const History = ({ data, setData }) => {
  if (data) {
    saveData(data);
  }

  const loadedData = loadData();

  return (
    <section className="History">
      <h2>История</h2>
      {loadedData.map((item, id) => {
        const { objects, query } = item;

        return (
          <button
            key={objects[0].CADNOMER + id}
            type="button"
            title={objects[0].ADDRESS}
            onClick={() => setData(item)}
          >
            {typeof query === 'string' ? query : getQueryFromObject(query)}
          </button>
        );
      })}
    </section>
  );
};

export default History;
