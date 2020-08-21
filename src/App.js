import React from 'react';
import Aside from 'components/aside';
import Content from 'components/content';
import History from 'components/history';
import { useApi, useData } from 'hooks';

const App = () => {
  const { request, isLoading, status } = useApi();
  const { data, setData } = useData();

  return (
    <main className="main">
      <aside className="left">
        <Aside
          request={request}
          isLoading={isLoading}
          status={status}
          setData={setData}
        />
        <History data={data} setData={setData} />
      </aside>
      <Content data={data} isLoading={isLoading} />
    </main>
  );
};

export default App;
