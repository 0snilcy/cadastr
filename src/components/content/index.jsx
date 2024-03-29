import React, { useRef } from 'react';
import './style.scss';

const ContentItem = ({ CADNOMER, ADDRESS }) => {
  return (
    <tr className="Content__item">
      <th>{CADNOMER}</th>
      <td>{ADDRESS}</td>
    </tr>
  );
};

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log('Async: Copying to clipboard was successful!');
    },
    function (err) {
      console.error('Async: Could not copy text: ', err);
    }
  );
}

const copyItems = async (value) => {
  try {
    copyTextToClipboard(value);
  } catch (err) {
    console.log(err);
  }
};

const Content = ({ data, isLoading }) => {
  const table = useRef(null);
  const error = !!data?.error?.length;

  // data = {
  //   found: 77,
  //   objects: [{ CADNOMER: 123 }, { CADNOMER: 777 }],
  // };

  return (
    <section className={`Content ${isLoading ? 'Content--loading' : ''}`}>
      <h2>Результат</h2>
      {error && <div>Ошибка {JSON.stringify(data.error)} </div>}
      {data && data.found && (
        <div>
          <div>
            Найдено: {data.found}, Найдены все: {data.found_all ? '✅' : '❌'}
            <button
              className="Content__copy"
              onClick={(evt) => {
                evt.preventDefault();
                copyItems(
                  data.objects.map(({ CADNOMER }) => CADNOMER).join(' ')
                );
              }}
            >
              Копировать кадастровые номера
            </button>
            <button
              className="Content__copy"
              onClick={(evt) => {
                evt.preventDefault();
                const selection = document.getSelection();
                selection.setBaseAndExtent(
                  table.current,
                  0,
                  table.current,
                  table.current.childNodes.length
                );
              }}
            >
              Выделить таблицу
            </button>
          </div>
          <hr />
          <div className="Content__list" ref={table}>
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
    </section>
  );
};

export default Content;
