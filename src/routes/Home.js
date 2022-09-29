import React from "react";
import { TabsContext } from "../utils/context";
import styled from "styled-components";
import List from "../components/List.js";
import { DragDropContext } from "react-beautiful-dnd";
import { Plus } from "phosphor-react";



const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

const AddButton = styled.div`
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    min-width: 44px;
    background-color: #2b2a33;
    height: 126px;
    color: white;
    cursor: default;
    // underline active tab
    &:hover {
        background-color: #42414d;
    }
`;


export default function Home() {

    const db = React.useContext(TabsContext);

    const onCardDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const newTab = { ...db.activeTab };
        const sourceId = result.source.droppableId.split("-")[1];
        const destinationId = result.destination.droppableId.split("-")[1];        
        const sourceList = newTab.lists.find((list) => list.id.toString() === sourceId);
        const destinationList = newTab.lists.find((list) => list.id.toString() === destinationId);
        const [removed] = sourceList.cards.splice(result.source.index, 1);
        destinationList.cards.splice(result.destination.index, 0, removed);

        const newTabs = [...db.tabs].map((tab) => {
            if (tab.id === newTab.id) {
                return newTab;
            }
            return tab;
        });
        
        

        // make a post request to update the data
        fetch(`http://localhost:3000/tabs/${newTab.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTab),
        }).then(() => {
          db.updateTabs(newTabs);
          db.updateActiveTab(newTab);
        });
        
    };

    return (
      <Container>
        <Row>
          <DragDropContext onDragEnd={onCardDragEnd}>
            {db.activeTab?.lists && db.activeTab.lists.map((item, index) => (
              <List key={item.id} list={item} prefix={item.id}/>
            ))}
          </DragDropContext>
          {db.activeTab && 
            <AddButton onClick={() => db.addList(db.activeTab)}>
              <Plus size={24} />
            </AddButton>
          }
        </Row>
      </Container>
    );
    
  }