
import styled from 'styled-components';
import hexToRgba from 'hex-to-rgba';
import Banner from '../../components/Banner';
import Cards from '../../components/Cards/Index';
import Modal from '../../components/Modal';

const MainStyled = styled.main`
  width: 100%;
  height: auto;
  background-color: ${hexToRgba('#000000', 0.90)};
  padding: 125px 0 0 0;
`;

function Home() {
  return (
    <MainStyled>
      <Banner />
      <Cards />
      <Modal />
    </MainStyled>
  );
}

export default Home;