import React from "react";
import "./style.scss";

const ContentItem = ({ CADNOMER, ADDRESS }) => {
  return (
    <tr className="Content__item">
      <th>{CADNOMER}</th>
      <td>{ADDRESS}</td>
    </tr>
  );
};

const copyItems = async (value) => {
  try {
    await navigator.clipboard.writeText(value);
    console.log("Copied");
  } catch (err) {
    console.log(err);
  }
};

const Content = ({ data, isLoading }) => {
  const error = !!data?.error?.length;
  // data = {
  //   found: 77,
  //   objects: [{ CADNOMER: 123 }, { CADNOMER: 777 }],
  // };

  return (
    <div className={`Content ${isLoading ? "Content--loading" : ""}`}>
      {error && <div>Ошибка {JSON.stringify(data.error)} </div>}
      {data && data.found && (
        <div>
          <div>
            Найдено: {data.found}
            <button
              className="Content__copy"
              onClick={(evt) => {
                evt.preventDefault();
                copyItems(
                  data.objects.map(({ CADNOMER }) => CADNOMER).join(" ")
                );
              }}
            >
              Копировать кадастровые номера
            </button>
          </div>
          <hr />
          <div className="Content__list">
            <table>
              <tbody>
                {data.objects.map((item) => (
                  <ContentItem key={item.CADNOMER} {...item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
