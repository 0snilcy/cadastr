import React, { useState } from "react";
import Aside from "components/aside";
import Content from "components/content";

const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="main">
      <Aside
        setData={setData}
        setIsLoading={setIsLoading}
        isLoadeng={isLoading}
      />
      <Content data={data} isLoading={isLoading} />
    </div>
  );
};

export default App;
