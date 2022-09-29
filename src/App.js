import {
  Routes,
  Route
} from "react-router-dom";
import {Home, About , User} from './routes';
import Layout from './components/Layout';
import React from "react";
import { TabsContext } from "./utils/context";
import { useDB } from "./hooks/useDB";



function App() {

  const db = useDB();

  return (
    <TabsContext.Provider value={db}>
      <Layout>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/user" element={<User />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </TabsContext.Provider>
  );
}

export default App;
