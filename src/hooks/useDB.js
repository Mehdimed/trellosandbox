import { useEffect, useState } from "react";
import Db from '../utils/Db';

export const useDB = () => {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState({});

  // useEffect(() => {
    // fetch("http://localhost:3000/tabs")
    //   .then((res) => res.json())
    //   .then((data) => {
        // updateTabs(data);
        // updateActiveTab(data[0]);
      // });

  // }, []);

  const updateActiveTab = (tab) => {
    setActiveTab(tab);
  };

  function updateTabs(tabs) {
    setTabs(tabs);
  };

  const db = new Db(tabs, updateTabs, activeTab, updateActiveTab);

  return db;
  
}