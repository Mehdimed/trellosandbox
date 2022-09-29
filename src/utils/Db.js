export default class Db {

    constructor(tabs, updateTabs, activeTab, updateActiveTab) {
        this.tabs = tabs;
        this.updateTabs = updateTabs;
        this.activeTab = activeTab;
        this.updateActiveTab = updateActiveTab;
    }


    addTab = () => {
        const newTab = {
          id: Math.floor(Math.random() * 10000000),
          title: "New Tab",
          lists: [
            {
              id: Math.floor(Math.random() * 10000000),
              title: "List 1",
              cards: [
                {
                  id: Math.floor(Math.random() * 10000000),
                  title: "Card 1",
                  description: "Description 1",
                }
              ]
            }
          ]
        };
        // fetch("http://localhost:3000/tabs", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(newTab),
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
            this.updateTabs([...this.tabs, newTab]);
            this.updateActiveTab(newTab);
          // });
      }
    
      deleteTab = (tab) => {
        // fetch(`http://localhost:3000/tabs/${tab.id}`, {
        //   method: "DELETE",
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
            const newTabs = [...this.tabs].filter((item) => item.id !== tab.id);
            this.updateTabs(newTabs);
            // redirect to the first tab if the deleted tab is the active tab
            this.updateActiveTab(this.activeTab.id === tab.id ? newTabs[0] : this.activeTab);
          // });
      }
    
    
    
      addList = (tab) => {
        const newTab = { ...tab };
        const listId = Math.floor(Math.random() * 10000000);
        const newCard = {
          id: listId,
          title: `List ${listId}`,
          cards: [
            {
              id: Math.floor(Math.random() * 10000000),
              title: `Card 1`,
              description: `Description 1`,
            }
          ],
        };
        newTab.lists.push(newCard);
        // fetch(`http://localhost:3000/tabs/${newTab.id}`, {
        //   method: "PUT",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(newTab),
        // }).then(() => {
            this.updateTabs([...this.tabs].map((item) => {
            if (item.id === tab.id) {
              return newTab;
            }
            return item;
          }));
          this.updateActiveTab(newTab);
        // })
      }
    
      deleteList = (list) => {
        const newTab = { ...this.activeTab };
        newTab.lists = newTab.lists.filter((item) => item.id !== list.id);
        
        // fetch(`http://localhost:3000/tabs/${newTab.id}`, {
        //   method: "PUT",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(newTab),
        // }).then(()=> {
            this.updateTabs([...this.tabs].map((item) => {
            if (item.id === this.activeTab.id) {
              return newTab;
            }
            return item;
          }));
          this.updateActiveTab(newTab);
        // })
      }
    
    
      addCard = (list) => {
        const newTab = { ...this.activeTab };
        const newList = newTab.lists.find((item) => item.id === list.id);
        // generate a random id with 8 digits
        const cardId = Math.floor(Math.random() * 10000000);
        const newCard = {
          id: cardId,
          title: `Card ${cardId}`,
          description: `Description ${cardId}`,
        };
        newList.cards.push(newCard);
        // fetch(`http://localhost:3000/tabs/${newTab.id}`, {
        //   method: "PUT",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(newTab),
        // }).then(() => {
            this.updateTabs([...this.tabs].map((item) => {
            if (item.id === newTab.id) {
              return newTab;
            }
            return item;
          }));
          this.updateActiveTab(newTab);
        // })
      }
    
      deleteCard = (card , listParent) => {
        const newTab = { ...this.activeTab };
        const newList = newTab.lists.find((item) => item.id === listParent.id);
        newList.cards = newList.cards.filter((item) => item.id !== card.id);
        
        // fetch(`http://localhost:3000/tabs/${newTab.id}`, {
        //   method: "PUT",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(newTab),
        // }).then(()=> {
            this.updateTabs([...this.tabs].map((item) => {
            if (item.id === newTab.id) {
              return newTab;
            }
            return item;
          }));
          this.updateActiveTab(newTab);
        // })
      }
}