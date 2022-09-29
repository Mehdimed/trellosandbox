// basic header
import React from "react";
import styled from "styled-components";
import { TabsContext } from "../utils/context";
import { Plus, X } from "phosphor-react";


const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #1c1b22;
    color: white;
    height: 50px;
    padding-top: 4px;
    padding-bottom: 4px;
`;

const HeaderButton = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    margin-left: 3px;
    margin-right: 3px;
    justify-content: ${props => props.small ? "center" : "normal"};
    min-width: ${props => props.small ? "44px" : "200px"};
    background-color: ${props => props.active ? "#42414d" : "#1c1b22"};
    height: 100%;
    color: white;
    padding-left: ${props => props.small ? "0px" : "5px"};
    cursor: default;
    // underline active tab
    &:hover {
        background-color: ${props => props.small ? "#52525e" : props.active ? "#42414d" : "#35343a"}
    }
`;

const Title = styled.div`
    font-weight: 300;
`;


const ImgContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 10px;
    border-radius: 5px;
    width: 25px;
    height: 25px;
    &:hover {
        background-color: ${props => props.active ? "#55545f" : "#4a494e"}
    }
`;

const Header = () => {
    
    const db = React.useContext(TabsContext);
    return (
        <Container>
            {db.tabs.map((tab) => (
                <HeaderButton key={tab.id} onClick={() => db.updateActiveTab(tab)} active={tab === db.activeTab}>
                    <Title>{tab.title}</Title>
                    <ImgContainer active={tab === db.activeTab} onClick={() => db.deleteTab(tab)}>
                        <X size={16}/>
                    </ImgContainer>
                </HeaderButton>
            ))}
            <HeaderButton onClick={() => db.addTab()} small>
                <Plus size={24} />
            </HeaderButton>
        </Container>
    )
}

export default Header;