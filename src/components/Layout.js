// basic layout component
import styled from "styled-components"
import Header from "./Header";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #2b2a33;
`;

const Layout = ({ children }) => {
    return (
        <Container>
        <Header />
        {children}
        </Container>
    )
};

export default Layout;