import React, { useState } from 'react';
import Aside from 'components/aside';
import Content from 'components/content';
import History from 'components/history';

const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="main">
      <aside className="left">
        <Aside
          setData={setData}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
        <History data={data} setData={setData} />
      </aside>
      <Content data={data} isLoading={isLoading} />
    </main>
  );
};

export default App;
