import React from 'react';
import styled from 'styled-components';
import iconDelete from '../../../assets/img/icon-delete.png'; // Ajusta la ruta según tu estructura
import iconEdit from '../../../assets/img/icon-edit.png'; // Ajusta la ruta según tu estructura
import { useGlobalContext } from '../../../contexts/GlobalContext';


const FrontendContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const CategoryStyled = styled.section`
  /* Estilos de tu categoría */
`;

const CardsFrontendStyled = styled.section`
  display: flex;
  flex-direction: row;
  gap: 30px;
  flex-wrap: wrap;
`;

const CardStyled = styled.div`
  /* Estilos de tus tarjetas */
`;

const ButtonStyled = styled.button`
  width: 432px;
  height: 70px;
  border-radius: 15px;
  background: var(--FrontEnd, #FFBA05);
  border: none;
  font-weight: 800;
  font-size: 32px;
  line-height: 37.5px;
  text-align: center;
  color: #f5f5f5;
  font-family: 'Roboto';
`;

const VideoCard = styled.div`
  width: 429.19px;
  height: 260.85px;
`;

const DyEContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 70px;
  padding: 15px 0;
`;

const DeleteyEdit = styled.div`
  display: flex;
  width: 440px;
  height: 59px;
  border-radius: 0px 0px 15px 15px;
  border-style: solid;
  border-color: var(--FrontEnd, #FFBA05);
  box-shadow: 0px -4px 5px 3px #FFBA05 inset;
  background-color: #000000e5;
  justify-content: center;
`;

const Delete = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  color: #ffffff;
  font-family: 'Roboto';
  font-weight: 800;
  font-size: 16px;
  line-height: 18.75px;
`;

const Edit = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  color: #ffffff;
  font-family: 'Roboto';
  font-weight: 800;
  font-size: 16px;
  line-height: 18.75px;
  cursor: pointer;
`;

const InnoyGest = () => {
   
  const { useVideos, openModal } = useGlobalContext();

  // Filtrar los videos por la categoría "INNOVACIÓN Y GESTIÓN"
  const iygVideos = useVideos.filter(video => video.Categoria === 'INNOVACIÓN Y GESTIÓN');

  return (
    <FrontendContainer>
      <CategoryStyled>
        <ButtonStyled>INNOVACIÓN Y GESTIÓN</ButtonStyled>
      </CategoryStyled>
      <CardsFrontendStyled>
        {iygVideos.map(video => (
          <CardStyled key={video.id}>
            <VideoCard>
              <img src={video.ImagenURL} alt={`imgcard-${video.id}`} />
            </VideoCard>
            <DeleteyEdit>
              <DyEContainer>
                <Delete>
                  <img src={iconDelete} alt="iconoBorrar" />
                  <p>BORRAR</p>
                </Delete>
                <Edit onClick={openModal}>
                  <img src={iconEdit} alt="iconoEditar" />
                  <p>EDITAR</p>
                </Edit>
              </DyEContainer>
            </DeleteyEdit>
          </CardStyled>
        ))}
      </CardsFrontendStyled>
    </FrontendContainer>
  );
};

export default InnoyGest;