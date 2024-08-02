import { createContext, useState, useContext, useEffect } from 'react';

// Creamos el contexto global
const GlobalContext = createContext();

// Definimos el proveedor global
export const GlobalProvider = ({ children }) => {

    //estado para controlar la seleccion de  los botones
    const [botonSeleccionado, setBotonSeleccionado] = useState('home');

    const handleButtonClick = (buttonName) => {
        setBotonSeleccionado(buttonName);

    }

    //TODO 
    // Estado para almacenar la lista de videos
    const [useVideos, setVideos] = useState([]);



    // Estado para controlar el modal
    const [useModal, setModal] = useState(false);

    // Función para abrir el modal
    const openModal = () => {
        setModal(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setModal(false);
    };

    // Función para obtener la lista de videos desde el servidor
    const fetchVideos = async () => {
        try {
            const response = await fetch('https://my-json-server.typicode.com/fluxdev19/api_info_aluraflix/Videos');
            if (!response.ok) {
                throw new Error('Error al obtener los videos');
            }
            const data = await response.json();
            setVideos(data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    // Efecto para cargar los videos al cargar el componente
    useEffect(() => {
        fetchVideos();
    }, []);

    // Función para añadir un nuevo video
    const postVideo = async (newVideo) => {
        try {
            const response = await fetch('https://my-json-server.typicode.com/fluxdev19/api_info_aluraflix/Videos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newVideo),
            });
            if (!response.ok) {
                throw new Error('Error al agregar el video');
            }
            const data = await response.json();
            console.log('Video added successfully:', data);
            setVideos([...useVideos, data]);
        } catch (error) {
            console.error('Error adding video:', error);
        }
    };

    // Función para editar un video existente
    const editVideo = async (id, updatedFields) => {
        try {
            const response = await fetch(`https://my-json-server.typicode.com/fluxdev19/api_info_aluraflix/Videos/${id}`, {
                method: 'PATCH', // Utilizando PATCH en lugar de PUT
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFields),
            });
            if (!response.ok) {
                throw new Error('Error al editar el video');
            }
            const data = await response.json();
            console.log('Video edited successfully:', data);
            const updatedVideos = useVideos.map(video => (video.id === id ? data : video));
            setVideos(updatedVideos);
        } catch (error) {
            console.error('Error editing video:', error);
            throw error;
        }
    };

    // Función para eliminar un video
    const deleteVideo = async (id) => {
        try {
            const response = await fetch(`https://my-json-server.typicode.com/fluxdev19/api_info_aluraflix/Videos/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el video');
            }
            // Actualizamos la lista de videos eliminando el video con el id especificado
            setVideos(useVideos.filter(video => video.id !== id));
        } catch (error) {
            console.error('Error deleting video:', error);
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await deleteVideo(id); // Llama a la función deleteVideo con el id del video
        } catch (error) {
            console.error('Error deleting video:', error);
        }
    };

    // Proporcionamos el contexto global a los componentes hijos
    return (
        <GlobalContext.Provider value={{ useModal, openModal, closeModal, useVideos, postVideo, editVideo, deleteVideo, botonSeleccionado, handleButtonClick, handleDeleteClick }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Hook personalizado para consumir el contexto global
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};