import styled from "styled-components";
import { Backspace, Trash } from "phosphor-react";
import React from "react";
import { TabsContext } from "../utils/context";

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    border-radius: 10px;
    padding: 5px;
    margin-bottom: 15px;
    background: #42414d;
    box-shadow:  3px 3px 6px #2b2a32,
             -3px -3px 6px #595868;
`;

const Title = styled.div`
    font-size: 12px;
    font-weight: 600;
`;

const Description = styled.div`
    font-size: 10px;
    font-weight: 400;
`;

const iconStyle = {
  color: 'red',
}

const ImgContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 5px;
    border-radius: 5px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    &:hover {
        background-color: #55545f;
    }
`;


export default function Card({ card, parent }) {

  const db = React.useContext(TabsContext);

    return (
      <Container>
        <Title>{card.title}</Title>
        <Description>{card.description}</Description>
        {/* red cross to delete the card */}
        <ImgContainer onClick={() => db.deleteCard(card, parent)}>
          <Trash style={iconStyle} />
        </ImgContainer>
      </Container>
    )
  }