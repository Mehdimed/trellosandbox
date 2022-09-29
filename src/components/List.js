import styled, { keyframes } from "styled-components";
import Card from "./Card";
import {  Droppable, Draggable } from "react-beautiful-dnd";
import React, { useState } from "react";
import { TabsContext } from "../utils/context";
import { X, Plus } from "phosphor-react";




const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #42414d;
    color: white;
    border-radius: 5px;
    min-height: 50px;
    height: fit-content;
    min-width: 200px;
    padding: 10px;
    margin: 10px;
    transition: all 0.2s ease-in-out;
`;

const Title = styled.div`
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 20px;
`;

const clickAnimation = keyframes`
    0% {
      background: linear-gradient(145deg, #3b3b45, #474652);
      box-shadow:  3px 3px 6px #2b2a32,
                  -3px -3px 6px #595868;
    }
    50% {
      background: #42414d;
      box-shadow:  none;
    }
    100% {
      background: #42414d;
      box-shadow: inset 3px 3px 6px #2b2a32,
                  inset -3px -3px 6px #595868;
    }
`;
const declickAnimation = keyframes`
    0% {
          background: #42414d;
          box-shadow: inset 3px 3px 6px #2b2a32,
                      inset -3px -3px 6px #595868;
        }
    50% {
      background: #42414d;
      box-shadow:  none;
    }
    100% {
      background: linear-gradient(145deg, #3b3b45, #474652);
      box-shadow:  3px 3px 6px #2b2a32,
                  -3px -3px 6px #595868;
    }
    
`;


const AddButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    min-width: 100px;
    height: 20px;
    border-radius: 5px;
    color: white;
    animation: all 0.5s ease-in-out;
    cursor: pointer;
    background: linear-gradient(145deg, #474652, #3b3b45);
    box-shadow:  3px 3px 6px #2b2a32,
             -3px -3px 6px #595868;
    &:not(:active):hover {
      background: linear-gradient(145deg, #3b3b45, #474652);
      box-shadow:  3px 3px 6px #2b2a32,
                  -3px -3px 6px #595868;
    }
    &:active {
      animation: ${clickAnimation} 0.1s linear;
      background: #42414d;
      box-shadow: inset 3px 3px 6px #2b2a32,
                  inset -3px -3px 6px #595868;
    }
    &:not(:active) {
      animation: ${props => props.isClicked ? declickAnimation : null} 0.1s linear ;
      background: linear-gradient(145deg, #474652, #3b3b45);
      box-shadow:  3px 3px 6px #2b2a32,
              -3px -3px 6px #595868;
    }
`;

const ImgContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 5px;
    top: 5px;
    border-radius: 5px;
    width: 32px;
    height: 32px;
    cursor: pointer;
    &:hover {
        background-color: #55545f;
    }
`;

export default function List({ list, prefix }) {

  let [isClicked, setIsClicked] = useState(false);
  

  const db = React.useContext(TabsContext);

    return (
        
        <Droppable droppableId={`cards-${prefix}`}>
        {(provided, snapshot) => (
            <Container
              key={list.id}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
                <Title>{list.title}</Title>
              {list.cards.map((card, index) => (
                <Draggable
                  key={card.id}
                  draggableId={card.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card card={card} parent={list}/>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <AddButton 
                onClick={() => setTimeout(() => db.addCard(list), 200)} 
                isClicked={isClicked}
                onMouseDown={() => setIsClicked(true)}
                onMouseUp={() => setTimeout(() => setIsClicked(false), 200)}
                >
                <Plus size={20} />
              </AddButton>
              <ImgContainer onClick={() => db.deleteList(list)}>
                <X size="24px" />
              </ImgContainer>
            </Container>
          )}
      </Droppable>
    )
  }