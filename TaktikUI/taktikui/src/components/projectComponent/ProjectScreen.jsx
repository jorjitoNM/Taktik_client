import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import logo from '../../assets/Taktik.png';
import avatar from '../../assets/Avatar.png';

// Definición de colores
const colors = {
    white: '#FFFFFF',
    text: '#2E2E48',
    lightText: '#6D6D80',
    secondary: '#673DE6',
    border: '#E5E5ED',
    error: '#FF5252'
};

const ProjectScreen = () => {
    const { projectName } = useParams();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [showMemberModal, setShowMemberModal] = useState(false);
    const [newMember, setNewMember] = useState({
        name: '',
        role: '',
        email: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        role: '',
        email: ''
    });

    // Datos de las historias de usuario (sin completed en tasks)
    const [userStories, setUserStories] = useState([
        {
            id: 1,
            title: 'Crear página de inicio',
            description: 'Diseñar y desarrollar la página principal de la aplicación con los componentes básicos.',
            tasks: [
                { id: 1, title: 'Diseñar layout' },
                { id: 2, title: 'Implementar navbar' },
                { id: 3, title: 'Crear footer' }
            ]
        },
        {
            id: 2,
            title: 'Implementar autenticación',
            description: 'Configurar sistema de autenticación con JWT y roles de usuario.',
            tasks: [
                { id: 1, title: 'Configurar backend para JWT' }
            ]
        },
        {
            id: 3,
            title: 'Diseñar base de datos',
            description: 'Crear el esquema de la base de datos y las relaciones entre entidades.',
            tasks: []
        }
    ]);

    // Datos de los miembros del proyecto
    const [members, setMembers] = useState([
        { id: 1, name: 'Juan Pérez', role: 'Desarrollador', email: 'juan@email.com' },
        { id: 2, name: 'María García', role: 'Diseñadora', email: 'maria@email.com' }
    ]);

    // Estado para la pestaña activa (Backlog o Sprints)
    const [activeTab, setActiveTab] = useState('backlog');

    // Estado para la historia seleccionada
    const [selectedStory, setSelectedStory] = useState(null);

    // Estados para los modales
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showTasksModal, setShowTasksModal] = useState(false);
    const [currentStory, setCurrentStory] = useState(null);
    const [editedData, setEditedData] = useState({
        title: '',
        description: ''
    });

    // Estados para creación
    const [showCreateStoryModal, setShowCreateStoryModal] = useState(false);
    const [showCreateSprintModal, setShowCreateSprintModal] = useState(false);
    const [sprints, setSprints] = useState([]);
    const [newStory, setNewStory] = useState({
        title: '',
        description: '',
        tasks: []
    });
    const [storyErrors, setStoryErrors] = useState({
        title: '',
        description: ''
    });

    // Estados para creación de sprints
    const [newSprint, setNewSprint] = useState({
        name: '',
        startDate: '',
        endDate: ''
    });
    const [sprintErrors, setSprintErrors] = useState({
        name: '',
        startDate: '',
        endDate: ''
    });

    const validateFields = () => {
        let valid = true;
        const newErrors = {
            name: '',
            role: '',
            email: ''
        };

        if (!newMember.name.trim()) {
            newErrors.name = 'El nombre es obligatorio';
            valid = false;
        }

        if (!newMember.role) {
            newErrors.role = 'Debes seleccionar un rol';
            valid = false;
        }

        if (!newMember.email.trim()) {
            newErrors.email = 'El email es obligatorio';
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newMember.email)) {
            newErrors.email = 'Ingresa un email válido';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const validateStory = () => {
        let valid = true;
        const errors = {
            title: '',
            description: ''
        };

        if (!newStory.title.trim()) {
            errors.title = 'El título es obligatorio';
            valid = false;
        }

        if (!newStory.description.trim()) {
            errors.description = 'La descripción es obligatoria';
            valid = false;
        }

        setStoryErrors(errors);
        return valid;
    };

    const validateSprint = () => {
        let valid = true;
        const errors = {
            name: '',
            startDate: '',
            endDate: ''
        };

        if (!newSprint.name.trim()) {
            errors.name = 'El nombre es obligatorio';
            valid = false;
        }

        if (!newSprint.startDate) {
            errors.startDate = 'La fecha de inicio es obligatoria';
            valid = false;
        }

        if (!newSprint.endDate) {
            errors.endDate = 'La fecha de fin es obligatoria';
            valid = false;
        } else if (newSprint.startDate && new Date(newSprint.endDate) < new Date(newSprint.startDate)) {
            errors.endDate = 'La fecha de fin debe ser posterior a la de inicio';
            valid = false;
        }

        setSprintErrors(errors);
        return valid;
    };

    const [selectedSprint, setSelectedSprint] = useState(null);
    const [showEditSprintModal, setShowEditSprintModal] = useState(false);
    const [showDeleteSprintModal, setShowDeleteSprintModal] = useState(false);
    const [currentSprint, setCurrentSprint] = useState(null);
    const [editedSprintData, setEditedSprintData] = useState({
        name: '',
        startDate: '',
        endDate: ''
    });

    const handleSprintClick = (sprint) => {
        setSelectedSprint(selectedSprint === sprint.id ? null : sprint.id);
    };

    const openEditSprintModal = (sprint, e) => {
        e.stopPropagation();
        setCurrentSprint(sprint);
        setEditedSprintData({
            name: sprint.name,
            startDate: sprint.startDate,
            endDate: sprint.endDate
        });
        setShowEditSprintModal(true);
    };

    const openDeleteSprintModal = (sprint, e) => {
        e.stopPropagation();
        setCurrentSprint(sprint);
        setShowDeleteSprintModal(true);
    };

    const handleSaveSprintEdit = () => {
        setSprints(sprints.map(sprint =>
            sprint.id === currentSprint.id
                ? {
                    ...sprint,
                    name: editedSprintData.name,
                    startDate: editedSprintData.startDate,
                    endDate: editedSprintData.endDate
                }
                : sprint
        ));
        setShowEditSprintModal(false);
        setSelectedSprint(null);
    };

    const confirmDeleteSprint = () => {
        setSprints(sprints.filter(sprint => sprint.id !== currentSprint.id));
        setShowDeleteSprintModal(false);
        setSelectedSprint(null);
    };

    // Función para manejar la selección de historia
    const handleStoryClick = (story) => {
        setSelectedStory(selectedStory === story.id ? null : story.id);
    };

    // Función para abrir el modal de edición
    const openEditModal = (story, e) => {
        e.stopPropagation();
        setCurrentStory(story);
        setEditedData({
            title: story.title,
            description: story.description
        });
        setShowEditModal(true);
    };

    // Función para abrir el modal de borrado
    const openDeleteModal = (story, e) => {
        e.stopPropagation();
        setCurrentStory(story);
        setShowDeleteModal(true);
    };

    // Función para abrir el modal de tareas
    const openTasksModal = (story, e) => {
        e.stopPropagation();
        setCurrentStory(story);
        setShowTasksModal(true);
    };

    // Función para guardar los cambios de edición
    const handleSaveEdit = () => {
        setUserStories(userStories.map(story =>
            story.id === currentStory.id
                ? { ...story, title: editedData.title, description: editedData.description }
                : story
        ));
        setShowEditModal(false);
        setSelectedStory(null);
    };

    // Función para confirmar borrado
    const confirmDelete = () => {
        setUserStories(userStories.filter(story => story.id !== currentStory.id));
        setShowDeleteModal(false);
        setSelectedStory(null);
    };

    const toggleTaskCompletion = (storyId, taskId) => {
        setUserStories(prevStories =>
            prevStories.map(story => {
                if (story.id === storyId) {
                    return {
                        ...story,
                        tasks: story.tasks.map(task =>
                            task.id === taskId ? {
                                ...task,
                                completed: !task.completed
                            } : task
                        )
                    };
                }
                return story;
            })
        );
    };

    // Función para crear nueva historia
    const handleCreateStory = () => {
        if (validateStory()) {
            const newId = Math.max(...userStories.map(story => story.id), 0) + 1;
            setUserStories([
                ...userStories,
                {
                    id: newId,
                    title: newStory.title,
                    description: newStory.description,
                    tasks: []
                }
            ]);
            setShowCreateStoryModal(false);
            setNewStory({ title: '', description: '', tasks: [] });
            setStoryErrors({ title: '', description: '' });
        }
    };

    const handleCreateSprint = () => {
        if (validateSprint()) {
            const newId = sprints.length > 0 ? Math.max(...sprints.map(s => s.id)) + 1 : 1;
            setSprints(prevSprints => [
                ...prevSprints,
                {
                    id: newId,
                    name: newSprint.name,
                    startDate: newSprint.startDate,
                    endDate: newSprint.endDate,
                    stories: []
                }
            ]);
            setShowCreateSprintModal(false);
            setNewSprint({ name: '', startDate: '', endDate: '' });
            setSprintErrors({ name: '', startDate: '', endDate: '' });
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#F5F5F9',
            fontFamily: "'Poppins', sans-serif"
        }}>
            {/* Navbar */}
            <header style={{
                background: '#FFFFFF',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                padding: '10px 0',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 15px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                            src={logo}
                            alt="Logo"
                            style={{ width: '32px', height: '32px' }}
                        />
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            style={{
                                color: colors.primary,
                                fontWeight: '700',
                                fontSize: '24px',
                                cursor: 'pointer'
                            }}
                        >
                            Taktik
                        </motion.div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <img
                            src={avatar}
                            alt="User"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                    <AnimatePresence>
                        {dropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: '50px',
                                    background: colors.white,
                                    borderRadius: '8px',
                                    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                                    minWidth: '200px',
                                    overflow: 'hidden',
                                    zIndex: 101
                                }}
                            >
                                <div style={{ padding: '16px', borderBottom: `1px solid ${colors.border}` }}>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                        <img
                                            src={avatar}
                                            alt="User"
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <div>
                                            <div style={{
                                                fontWeight: '600',
                                                color: colors.text,
                                                marginBottom: '4px'
                                            }}>
                                                Nombre
                                            </div>
                                            <div style={{
                                                fontSize: '14px',
                                                color: colors.lightText
                                            }}>
                                                usuario@email.com
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ padding: '8px 0' }}>
                                    <motion.button
                                        whileHover={{ background: colors.light }}
                                        transition={{ type: 'tween', duration: 0.2 }}
                                        style={{
                                            width: '100%',
                                            textAlign: 'left',
                                            padding: '8px 16px',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: colors.text,
                                            fontSize: '14px'
                                        }}
                                    >
                                        Editar perfil
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ background: colors.light }}
                                        transition={{ type: 'tween', duration: 0.2 }}
                                        style={{
                                            width: '100%',
                                            textAlign: 'left',
                                            padding: '8px 16px',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: colors.text,
                                            fontSize: '14px'
                                        }}
                                    >
                                        Cerrar sesión
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </header>

            {/* Contenido principal */}
            <main style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '40px 24px'
            }}>
                {/* Pestañas Backlog/Sprints */}
                <div style={{
                    display: 'flex',
                    borderBottom: '1px solid #E5E5ED',
                    marginBottom: '24px'
                }}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab('backlog')}
                        style={{
                            padding: '12px 24px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '600',
                            color: activeTab === 'backlog' ? '#673DE6' : '#6D6D80',
                            borderBottom: activeTab === 'backlog' ? '2px solid #673DE6' : 'none',
                            fontSize: '16px'
                        }}
                    >
                        Backlog
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab('sprints')}
                        style={{
                            padding: '12px 24px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '600',
                            color: activeTab === 'sprints' ? '#673DE6' : '#6D6D80',
                            borderBottom: activeTab === 'sprints' ? '2px solid #673DE6' : 'none',
                            fontSize: '16px'
                        }}
                    >
                        Sprints
                    </motion.button>
                </div>

                {/* Botón de creación y título */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h2 style={{ color: '#2E2E48', fontSize: '20px', fontWeight: '600' }}>
                        {activeTab === 'backlog' ? 'Historias de Usuario' : 'Sprints'}
                    </h2>

                    <motion.button
                        whileHover={{ boxShadow: "0px 0px 15px rgba(103, 61, 230, 0.7)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => activeTab === 'backlog' ? setShowCreateStoryModal(true) : setShowCreateSprintModal(true)}
                        style={{
                            background: '#673DE6',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        {activeTab === 'backlog' ? 'Crear Historia' : 'Crear Sprint'}
                    </motion.button>
                </div>

                {/* Contenido de las pestañas */}
                <div style={{ display: 'flex', gap: '24px' }}>
                    {/* Columna principal (Backlog o Sprints) */}
                    <div style={{ flex: 3 }}>
                        <AnimatePresence mode="wait">
                            {activeTab === 'backlog' ? (
                                <motion.div
                                    key="backlog"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {userStories.length > 0 ? (
                                        <>
                                            {/* Card para crear nueva historia */}
                                            <motion.div
                                                whileHover={{ y: -2 }}
                                                onClick={() => setShowCreateStoryModal(true)}
                                                style={{
                                                    background: 'rgb(232, 226, 255)',
                                                    borderRadius: '8px',
                                                    padding: '16px',
                                                    marginBottom: '12px',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                                    cursor: 'pointer',
                                                    borderLeft: '4px solid #673DE6',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px'
                                                }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    width="20"
                                                    height="20"
                                                    fill={colors.secondary}
                                                >
                                                    <path
                                                        fill={colors.secondary}
                                                        d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1"
                                                    ></path>
                                                </svg>
                                                <span style={{ color: colors.secondary, fontWeight: 'bold' }}>
                                                    Crear nueva historia
                                                </span>
                                            </motion.div>

                                            {/* Lista de historias existentes */}
                                            {userStories.map(story => (
                                                <motion.div
                                                    key={story.id}
                                                    whileHover={{ y: -2 }}
                                                    onClick={() => handleStoryClick(story)}
                                                    style={{
                                                        background: '#FFFFFF',
                                                        borderRadius: '8px',
                                                        padding: '16px',
                                                        marginBottom: '12px',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                                        cursor: 'pointer',
                                                        borderLeft: '4px solid #673DE6'
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <h3 style={{
                                                            color: '#2E2E48',
                                                            fontSize: '16px',
                                                            fontWeight: '600',
                                                        }}>{story.title}</h3>
                                                    </div>

                                                    <AnimatePresence>
                                                        {selectedStory === story.id && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                                style={{
                                                                    overflow: 'hidden',
                                                                    paddingTop: '12px'
                                                                }}
                                                            >
                                                                <div style={{
                                                                    color: colors.lightText,
                                                                    fontSize: '14px',
                                                                    marginBottom: '12px'
                                                                }}>
                                                                    {story.description}
                                                                </div>

                                                                <div style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center'
                                                                }}>
                                                                    <motion.button
                                                                        whileHover={{ background: '#717171', color: "#f0f0f0" }}
                                                                        whileTap={{ scale: 0.98 }}
                                                                        onClick={(e) => openTasksModal(story, e)}
                                                                        style={{
                                                                            background: '#f0f0f0',
                                                                            border: 'none',
                                                                            borderRadius: '8px',
                                                                            padding: '6px 12px',
                                                                            fontSize: '12px',
                                                                            color: '#4e4e4e',
                                                                            cursor: 'pointer',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: '4px'
                                                                        }}
                                                                    >
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 24 24"
                                                                            width="1em"
                                                                            height="1em"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            strokeWidth="2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        >
                                                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                                            <polyline points="14 2 14 8 20 8"></polyline>
                                                                            <line x1="16" y1="13" x2="8" y2="13"></line>
                                                                            <line x1="16" y1="17" x2="8" y2="17"></line>
                                                                            <polyline points="10 9 9 9 8 9"></polyline>
                                                                        </svg>
                                                                        Tareas ({story.tasks.length})
                                                                    </motion.button>

                                                                    <div style={{ display: 'flex', gap: '8px' }}>
                                                                        <motion.button
                                                                            whileHover={{ backgroundColor: '#673DE6', color: '#ddeeff' }}
                                                                            onClick={(e) => openEditModal(story, e)}
                                                                            style={{
                                                                                background: '#ddeeff',
                                                                                border: 'none',
                                                                                borderRadius: '50%',
                                                                                padding: '3px 5px',
                                                                                fontSize: '14px',
                                                                                color: '#673DE6',
                                                                                cursor: 'pointer'
                                                                            }}
                                                                        >
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                viewBox="0 0 21 21"
                                                                                width="1.35em"
                                                                                height="1.35em"
                                                                                style={{ paddingRight: '1px' }}
                                                                            >
                                                                                <path
                                                                                    fill="currentColor"
                                                                                    d="M13.249 8.837a.75.75 0 0 1 .274 1.025l-3.07 5.32a.75.75 0 1 1-1.3-.75l3.072-5.32a.75.75 0 0 1 1.024-.275"
                                                                                ></path>
                                                                                <path
                                                                                    fill="currentColor"
                                                                                    fillRule="evenodd"
                                                                                    d="m16.788 9.877l1.117-1.934a2.58 2.58 0 0 0-.276-2.966a5.62 5.62 0 0 0-3.227-1.863a2.58 2.58 0 0 0-2.706 1.244l-1.118 1.937l-.013.021l-3.922 6.794c-.272.47-.45.777-.577 1.108a4.5 4.5 0 0 0-.245.908c-.056.35-.057.704-.06 1.247l-.011 2.973v.067c0 .132.003.259.013.37c.014.161.05.415.218.645c.204.282.518.463.864.5c.284.029.521-.066.669-.135c.144-.067.31-.164.477-.261l1.643-.957l.007-.004l.826-.482c.469-.273.775-.451 1.05-.675q.367-.299.664-.666c.222-.276.4-.583.67-1.053l3.922-6.791zm-1.533-.344a4.94 4.94 0 0 0-3.611-2.085L7.97 13.809c-.31.538-.425.74-.505.948q-.113.295-.164.607c-.035.22-.038.452-.04 1.073l-.001.121a3.17 3.17 0 0 1 2.295 1.326l.105-.061c.537-.313.736-.431.909-.572q.245-.2.444-.446c.14-.173.258-.373.568-.91z"
                                                                                    clipRule="evenodd"
                                                                                ></path>
                                                                            </svg>
                                                                        </motion.button>
                                                                        <motion.button
                                                                            whileHover={{ backgroundColor: 'red', color: '#ffdddd' }}
                                                                            onClick={(e) => openDeleteModal(story, e)}
                                                                            style={{
                                                                                background: '#ffdddd',
                                                                                border: 'none',
                                                                                borderRadius: '50%',
                                                                                padding: '3px 5.5px',
                                                                                fontSize: '14px',
                                                                                color: 'red',
                                                                                cursor: 'pointer',
                                                                                transition: 'all 0.4s ease'
                                                                            }}
                                                                        >
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                viewBox="0 0 24 24"
                                                                                width="1.3em"
                                                                                height="1.3em"
                                                                                style={{ marginTop: "1.5px" }}
                                                                            >
                                                                                <path
                                                                                    fill="currentColor"
                                                                                    fillRule="evenodd"
                                                                                    d="m18.412 6.5l-.801 13.617A2 2 0 0 1 15.614 22H8.386a2 2 0 0 1-1.997-1.883L5.59 6.5H3.5v-1A.5.5 0 0 1 4 5h16a.5.5 0 0 1 .5.5v1zM10 2.5h4a.5.5 0 0 1 .5.5v1h-5V3a.5.5 0 0 1 .5-.5M9 9l.5 9H11l-.4-9zm4.5 0l-.5 9h1.5l.5-9z"
                                                                                ></path>
                                                                            </svg>
                                                                        </motion.button>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.div>
                                            ))}
                                        </>
                                    ) : (
                                        <div style={{
                                            background: '#FFFFFF',
                                            borderRadius: '8px',
                                            padding: '24px',
                                            textAlign: 'center',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                            justifyItems: 'center',
                                            cursor: 'pointer'
                                        }} onClick={() => setShowCreateStoryModal(true)}>
                                            <div style={{
                                                width: "6rem",
                                                height: "6rem",
                                                backgroundColor: "#F5F3FF",
                                                borderRadius: "50%",
                                                margin: '0 auto 2rem',
                                                alignItems: 'center',
                                                color: colors.secondary
                                            }}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 16 16"
                                                    width="3em"
                                                    height="3em"
                                                    style={{ padding: '1.4rem' }}
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        d="M5.085 2A1.5 1.5 0 0 1 6.5 1h3a1.5 1.5 0 0 1 1.415 1h.585A1.5 1.5 0 0 1 13 3.5V6H8a3 3 0 0 0-3 3v4c0 .768.289 1.47.764 2H4.5A1.5 1.5 0 0 1 3 13.5v-10A1.5 1.5 0 0 1 4.5 2zM6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM8 7a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm.5 2h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1M8 12.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <p style={{ color: '#6D6D80' }}>No hay historias de usuario creadas aún</p>
                                            <motion.button
                                                whileHover={{ boxShadow: "0px 0px 15px rgba(103, 61, 230, 0.7)" }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowCreateStoryModal(true);
                                                }}
                                                style={{
                                                    background: '#673DE6',
                                                    color: '#FFFFFF',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    padding: '10px 20px',
                                                    marginTop: '2rem',
                                                    cursor: 'pointer',
                                                    fontSize: '14px'
                                                }}
                                            >
                                                Crear Historia
                                            </motion.button>
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="sprints"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {sprints && sprints.length > 0 ? (
                                        <>
                                            {/* Card para crear nuevo sprint */}
                                            <motion.div
                                                whileHover={{ y: -2 }}
                                                onClick={() => setShowCreateSprintModal(true)}
                                                style={{
                                                    background: 'rgb(232, 226, 255)',
                                                    borderRadius: '8px',
                                                    padding: '16px',
                                                    marginBottom: '12px',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                                    cursor: 'pointer',
                                                    borderLeft: '4px solid #673DE6',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px'
                                                }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    width="20"
                                                    height="20"
                                                    fill={colors.secondary}
                                                >
                                                    <path
                                                        fill={colors.secondary}
                                                        d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1"
                                                    ></path>
                                                </svg>
                                                <span style={{ color: colors.secondary, fontWeight: 'bold' }}>
                                                    Crear nuevo sprint
                                                </span>
                                            </motion.div>

                                            {/* Lista de sprints existentes */}
                                            {(sprints || []).map(sprint => (
                                                <motion.div
                                                    key={sprint.id}
                                                    whileHover={{ y: -2 }}
                                                    onClick={() => handleSprintClick(sprint)}
                                                    style={{
                                                        background: '#FFFFFF',
                                                        borderRadius: '8px',
                                                        padding: '16px',
                                                        marginBottom: '12px',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                                        cursor: 'pointer',
                                                        borderLeft: '4px solid #673DE6'
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <h3 style={{
                                                            color: '#2E2E48',
                                                            fontSize: '16px',
                                                            fontWeight: '600',
                                                        }}>{sprint.name}</h3>
                                                    </div>

                                                    <AnimatePresence>
                                                        {selectedSprint === sprint.id && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                                style={{
                                                                    overflow: 'hidden',
                                                                    paddingTop: '12px',
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center'
                                                                }}
                                                            >
                                                                <div style={{
                                                                    color: colors.lightText,
                                                                    fontSize: '14px',
                                                                    marginTop: '8px'
                                                                }}>
                                                                    {new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}
                                                                </div>

                                                                <div style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center'
                                                                }}>
                                                                    <div style={{ display: 'flex', gap: '8px' }}>
                                                                        <motion.button
                                                                            whileHover={{ backgroundColor: '#673DE6', color: '#ddeeff' }}
                                                                            onClick={(e) => openEditSprintModal(sprint, e)}
                                                                            style={{
                                                                                background: '#ddeeff',
                                                                                border: 'none',
                                                                                borderRadius: '50%',
                                                                                padding: '3px 5px',
                                                                                fontSize: '14px',
                                                                                color: '#673DE6',
                                                                                cursor: 'pointer'
                                                                            }}
                                                                        >
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                viewBox="0 0 21 21"
                                                                                width="1.35em"
                                                                                height="1.35em"
                                                                                style={{ paddingRight: '1px' }}
                                                                            >
                                                                                <path
                                                                                    fill="currentColor"
                                                                                    d="M13.249 8.837a.75.75 0 0 1 .274 1.025l-3.07 5.32a.75.75 0 1 1-1.3-.75l3.072-5.32a.75.75 0 0 1 1.024-.275"
                                                                                ></path>
                                                                                <path
                                                                                    fill="currentColor"
                                                                                    fillRule="evenodd"
                                                                                    d="m16.788 9.877l1.117-1.934a2.58 2.58 0 0 0-.276-2.966a5.62 5.62 0 0 0-3.227-1.863a2.58 2.58 0 0 0-2.706 1.244l-1.118 1.937l-.013.021l-3.922 6.794c-.272.47-.45.777-.577 1.108a4.5 4.5 0 0 0-.245.908c-.056.35-.057.704-.06 1.247l-.011 2.973v.067c0 .132.003.259.013.37c.014.161.05.415.218.645c.204.282.518.463.864.5c.284.029.521-.066.669-.135c.144-.067.31-.164.477-.261l1.643-.957l.007-.004l.826-.482c.469-.273.775-.451 1.05-.675q.367-.299.664-.666c.222-.276.4-.583.67-1.053l3.922-6.791zm-1.533-.344a4.94 4.94 0 0 0-3.611-2.085L7.97 13.809c-.31.538-.425.74-.505.948q-.113.295-.164.607c-.035.22-.038.452-.04 1.073l-.001.121a3.17 3.17 0 0 1 2.295 1.326l.105-.061c.537-.313.736-.431.909-.572q.245-.2.444-.446c.14-.173.258-.373.568-.91z"
                                                                                    clipRule="evenodd"
                                                                                ></path>
                                                                            </svg>
                                                                        </motion.button>
                                                                        <motion.button
                                                                            whileHover={{ backgroundColor: 'red', color: '#ffdddd' }}
                                                                            onClick={(e) => openDeleteSprintModal(sprint, e)}
                                                                            style={{
                                                                                background: '#ffdddd',
                                                                                border: 'none',
                                                                                borderRadius: '50%',
                                                                                padding: '3px 5.5px',
                                                                                fontSize: '14px',
                                                                                color: 'red',
                                                                                cursor: 'pointer',
                                                                                transition: 'all 0.4s ease'
                                                                            }}
                                                                        >
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                viewBox="0 0 24 24"
                                                                                width="1.3em"
                                                                                height="1.3em"
                                                                                style={{ marginTop: "1.5px" }}
                                                                            >
                                                                                <path
                                                                                    fill="currentColor"
                                                                                    fillRule="evenodd"
                                                                                    d="m18.412 6.5l-.801 13.617A2 2 0 0 1 15.614 22H8.386a2 2 0 0 1-1.997-1.883L5.59 6.5H3.5v-1A.5.5 0 0 1 4 5h16a.5.5 0 0 1 .5.5v1zM10 2.5h4a.5.5 0 0 1 .5.5v1h-5V3a.5.5 0 0 1 .5-.5M9 9l.5 9H11l-.4-9zm4.5 0l-.5 9h1.5l.5-9z"
                                                                                ></path>
                                                                            </svg>
                                                                        </motion.button>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.div>
                                            ))}
                                        </>
                                    ) : (
                                        <div style={{
                                            background: '#FFFFFF',
                                            borderRadius: '8px',
                                            padding: '24px',
                                            textAlign: 'center',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                            justifyItems: 'center',
                                            cursor: 'pointer'
                                        }} onClick={() => setShowCreateSprintModal(true)}>
                                            <div style={{
                                                width: "6rem",
                                                height: "6rem",
                                                backgroundColor: "#F5F3FF",
                                                borderRadius: "50%",
                                                margin: '0 auto 2rem',
                                                alignItems: 'center'
                                            }}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 14 14"
                                                    width="3em"
                                                    height="3em"
                                                    style={{ color: colors.secondary, padding: "1.4rem" }}
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        fillRule="evenodd"
                                                        d="M5.5 0A1.5 1.5 0 0 0 4 1.5v1.191A5.24 5.24 0 0 0 1.75 7c0 1.784.89 3.36 2.25 4.309V12.5A1.5 1.5 0 0 0 5.5 14h3a1.5 1.5 0 0 0 1.5-1.5v-1.191A5.24 5.24 0 0 0 12.25 7c0-1.784-.89-3.36-2.25-4.309V1.5A1.5 1.5 0 0 0 8.5 0zM3.25 7a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0m4.438-1.956a.625.625 0 1 0-1.25 0v1.912c0 .166.065.325.183.442l1.125 1.125a.625.625 0 1 0 .883-.884l-.941-.942z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <p style={{ color: '#6D6D80' }}>No hay sprints creados aún</p>
                                            <motion.button
                                                whileHover={{ boxShadow: "0px 0px 15px rgba(103, 61, 230, 0.7)" }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowCreateSprintModal(true);
                                                }}
                                                style={{
                                                    background: '#673DE6',
                                                    color: '#FFFFFF',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    padding: '10px 20px',
                                                    marginTop: '2rem',
                                                    cursor: 'pointer',
                                                    fontSize: '14px'
                                                }}
                                            >
                                                Crear Sprint
                                            </motion.button>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {showEditSprintModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 1000
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                transition={{ type: 'spring', damping: 10 }}
                                style={{
                                    backgroundColor: '#FFFFFF',
                                    padding: '24px',
                                    borderRadius: '12px',
                                    maxWidth: '500px',
                                    width: '90%',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                                }}
                            >
                                <h3 style={{
                                    color: '#2E2E48',
                                    fontSize: '20px',
                                    fontWeight: '600',
                                    marginBottom: '20px'
                                }}>
                                    Editar Sprint
                                </h3>

                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        color: '#2E2E48',
                                        fontWeight: '500'
                                    }}>Nombre*</label>
                                    <input
                                        type="text"
                                        value={editedSprintData.name}
                                        onChange={(e) => setEditedSprintData({ ...editedSprintData, name: e.target.value })}
                                        style={{
                                            width: '95%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #E5E5ED',
                                            fontSize: '14px'
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        color: '#2E2E48',
                                        fontWeight: '500'
                                    }}>Fecha de inicio*</label>
                                    <input
                                        type="date"
                                        value={editedSprintData.startDate}
                                        onChange={(e) => setEditedSprintData({ ...editedSprintData, startDate: e.target.value })}
                                        style={{
                                            width: '95%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #E5E5ED',
                                            fontSize: '14px'
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        color: '#2E2E48',
                                        fontWeight: '500'
                                    }}>Fecha de fin*</label>
                                    <input
                                        type="date"
                                        value={editedSprintData.endDate}
                                        min={editedSprintData.startDate || ''}
                                        onChange={(e) => setEditedSprintData({ ...editedSprintData, endDate: e.target.value })}
                                        style={{
                                            width: '95%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #E5E5ED',
                                            fontSize: '14px'
                                        }}
                                    />
                                </div>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    gap: '12px'
                                }}>
                                    <motion.button
                                        whileHover={{ background: '#ececec' }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setShowEditSprintModal(false)}
                                        style={{
                                            background: '#F5F5F9',
                                            border: 'none',
                                            borderRadius: '8px',
                                            padding: '10px 20px',
                                            fontSize: '14px',
                                            color: '#2E2E48',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Cancelar
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ boxShadow: "0px 0px 10px rgba(103, 61, 230, 0.7)", background: '#673DE6' }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleSaveSprintEdit}
                                        style={{
                                            background: 'rgba(103, 61, 230, 0.8)',
                                            border: 'none',
                                            borderRadius: '8px',
                                            padding: '10px 20px',
                                            fontSize: '14px',
                                            color: '#FFFFFF',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Guardar
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {showDeleteSprintModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 1000
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                transition={{ type: 'spring', damping: 10 }}
                                style={{
                                    backgroundColor: '#FFFFFF',
                                    padding: '24px',
                                    borderRadius: '12px',
                                    maxWidth: '400px',
                                    width: '90%',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                                }}
                            >
                                <h3 style={{
                                    color: '#2E2E48',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    marginBottom: '16px'
                                }}>
                                    Confirmar borrado
                                </h3>
                                <p style={{
                                    color: '#6D6D80',
                                    fontSize: '14px',
                                    marginBottom: '24px'
                                }}>
                                    ¿Estás seguro que quieres borrar el sprint "{currentSprint?.name}"?
                                </p>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    gap: '12px'
                                }}>
                                    <motion.button
                                        whileHover={{ background: '#ececec' }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setShowDeleteSprintModal(false)}
                                        style={{
                                            background: '#F5F5F9',
                                            border: 'none',
                                            borderRadius: '8px',
                                            padding: '10px 20px',
                                            fontSize: '14px',
                                            color: '#2E2E48',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Cancelar
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ boxShadow: "0px 0px 10px rgba(255, 0, 0, 0.7)", background: 'red' }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={confirmDeleteSprint}
                                        style={{
                                            background: '#FF5252',
                                            border: 'none',
                                            borderRadius: '8px',
                                            padding: '10px 20px',
                                            fontSize: '14px',
                                            color: '#FFFFFF',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Borrar
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Panel lateral (Miembros) */}
                    <div style={{ flex: 1 }}>
                        <div style={{
                            background: colors.white,
                            borderRadius: '8px',
                            padding: '16px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            minWidth: '150px'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '16px'
                            }}>
                                <h3 style={{
                                    color: colors.text,
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    margin: 0
                                }}>Miembros</h3>
                                <motion.button
                                    whileHover={{ boxShadow: "0px 0px 15px rgba(103, 61, 230, 0.7)" }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setShowMemberModal(true)}
                                    style={{
                                        background: colors.secondary,
                                        color: colors.white,
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '28px',
                                        height: '28px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        fontSize: '16px'
                                    }}
                                >
                                    +
                                </motion.button>
                            </div>

                            {/* Modal para añadir miembro */}
                            {showMemberModal && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 1000
                                    }}
                                >
                                    <motion.div
                                        initial={{ scale: 0.9, y: 20 }}
                                        animate={{ scale: 1, y: 0 }}
                                        transition={{ type: 'spring', damping: 10 }}
                                        style={{
                                            backgroundColor: '#FFFFFF',
                                            padding: '24px',
                                            borderRadius: '12px',
                                            maxWidth: '350px',
                                            width: '90%',
                                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        <h3 style={{
                                            color: '#2E2E48',
                                            fontSize: '20px',
                                            fontWeight: '600',
                                            marginBottom: '20px'
                                        }}>
                                            Añadir Miembro
                                        </h3>

                                        {/* Campos del formulario */}
                                        <div style={{ marginBottom: '16px' }}>
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                                color: '#2E2E48',
                                                fontWeight: '500'
                                            }}>Nombre*</label>
                                            <input
                                                type="text"
                                                value={newMember.name}
                                                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                                                style={{
                                                    width: '92%',
                                                    padding: '12px',
                                                    borderRadius: '8px',
                                                    border: errors.name ? `1px solid ${colors.error}` : '1px solid #E5E5ED',
                                                    fontSize: '14px'
                                                }}
                                            />
                                            {errors.name && (
                                                <div style={{
                                                    color: colors.error,
                                                    fontSize: '12px',
                                                    marginTop: '4px'
                                                }}>{errors.name}</div>
                                            )}
                                        </div>

                                        <div style={{ marginBottom: '16px' }}>
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                                color: '#2E2E48',
                                                fontWeight: '500'
                                            }}>Rol*</label>
                                            <select
                                                value={newMember.role}
                                                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                                                style={{
                                                    width: '100%',
                                                    padding: '12px',
                                                    borderRadius: '8px',
                                                    border: errors.role ? `1px solid ${colors.error}` : '1px solid #E5E5ED',
                                                    fontSize: '14px',
                                                    backgroundColor: 'white',
                                                    appearance: 'none',
                                                    backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236D6D80%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'right 10px center',
                                                    backgroundSize: '12px'
                                                }}
                                            >
                                                <option value="" style={{ borderRadius: "8px" }}>Seleccionar rol</option>
                                                <option value="Stakeholder">Stakeholder</option>
                                                <option value="Product Owner">Product Owner</option>
                                                <option value="Scrum Master">Scrum Master</option>
                                                <option value="Developer">Developer</option>
                                            </select>
                                            {errors.role && (
                                                <div style={{
                                                    color: colors.error,
                                                    fontSize: '12px',
                                                    marginTop: '4px'
                                                }}>{errors.role}</div>
                                            )}
                                        </div>

                                        <div style={{ marginBottom: '24px' }}>
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                                color: '#2E2E48',
                                                fontWeight: '500'
                                            }}>Email*</label>
                                            <input
                                                type="email"
                                                value={newMember.email}
                                                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                                                style={{
                                                    width: '92%',
                                                    padding: '12px',
                                                    borderRadius: '8px',
                                                    border: errors.email ? `1px solid ${colors.error}` : '1px solid #E5E5ED',
                                                    fontSize: '14px'
                                                }}
                                            />
                                            {errors.email && (
                                                <div style={{
                                                    color: colors.error,
                                                    fontSize: '12px',
                                                    marginTop: '4px'
                                                }}>{errors.email}</div>
                                            )}
                                        </div>

                                        {/* Botones con validación */}
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            gap: '12px'
                                        }}>
                                            <motion.button
                                                whileHover={{ background: '#ececec' }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => {
                                                    setShowMemberModal(false);
                                                    setNewMember({ name: '', role: '', email: '' });
                                                    setErrors({ name: '', role: '', email: '' });
                                                }}
                                                style={{
                                                    background: '#F5F5F9',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    padding: '10px 20px',
                                                    fontSize: '14px',
                                                    color: '#2E2E48',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Cancelar
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ boxShadow: "0px 0px 10px rgba(103, 61, 230, 0.7)", background: '#673DE6', }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => {
                                                    if (validateFields()) {
                                                        // Persistencia: Añadir nuevo miembro
                                                        const newId = Math.max(...members.map(m => m.id)) + 1;
                                                        setMembers([
                                                            ...members,
                                                            {
                                                                id: newId,
                                                                name: newMember.name,
                                                                role: newMember.role,
                                                                email: newMember.email
                                                            }
                                                        ]);

                                                        // Cerrar modal y resetear formulario
                                                        setShowMemberModal(false);
                                                        setNewMember({ name: '', role: '', email: '' });
                                                        setErrors({ name: '', role: '', email: '' });
                                                    }
                                                }}
                                                style={{
                                                    background: 'rgba(103, 61, 230, 0.8)',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    padding: '10px 20px',
                                                    fontSize: '14px',
                                                    color: '#FFFFFF',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Guardar
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}

                            {members.map(member => (
                                <div key={member.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px 0'
                                }}>
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        background: '#F5F3FF',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: colors.secondary,
                                        fontWeight: '600'
                                    }}>
                                        {member.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div style={{
                                            fontWeight: '600',
                                            color: colors.text,
                                            fontSize: '14px',
                                            marginBottom: '3px'
                                        }}>{member.name}</div>
                                        <div style={{
                                            color: colors.lightText,
                                            fontSize: '12px'
                                        }}>{member.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal de creación de historia */}
            {showCreateStoryModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: 'spring', damping: 10 }}
                        style={{
                            backgroundColor: '#FFFFFF',
                            padding: '24px',
                            borderRadius: '12px',
                            maxWidth: '500px',
                            width: '90%',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                        }}
                    >
                        <h3 style={{
                            color: '#2E2E48',
                            fontSize: '20px',
                            fontWeight: '600',
                            marginBottom: '20px'
                        }}>
                            Crear Nueva Historia
                        </h3>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: '#2E2E48',
                                fontWeight: '500'
                            }}>Título*</label>
                            <input
                                type="text"
                                value={newStory.title}
                                onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                                style={{
                                    width: '95%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: storyErrors.title ? `1px solid ${colors.error}` : '1px solid #E5E5ED',
                                    fontSize: '14px'
                                }}
                            />
                            {storyErrors.title && (
                                <div style={{
                                    color: colors.error,
                                    fontSize: '12px',
                                    marginTop: '4px'
                                }}>{storyErrors.title}</div>
                            )}
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: '#2E2E48',
                                fontWeight: '500'
                            }}>Descripción*</label>
                            <textarea
                                value={newStory.description}
                                onChange={(e) => setNewStory({ ...newStory, description: e.target.value })}
                                style={{
                                    width: '95%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: storyErrors.description ? `1px solid ${colors.error}` : '1px solid #E5E5ED',
                                    fontSize: '14px',
                                    minHeight: '100px',
                                    fontFamily: "'Poppins', sans-serif",
                                    resize: "vertical",
                                    maxHeight: '250px'
                                }}
                            />
                            {storyErrors.description && (
                                <div style={{
                                    color: colors.error,
                                    fontSize: '12px',
                                    marginTop: '4px'
                                }}>{storyErrors.description}</div>
                            )}
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '12px'
                        }}>
                            <motion.button
                                whileHover={{ background: '#ececec' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    setShowCreateStoryModal(false);
                                    setStoryErrors({ title: '', description: '' });
                                }}
                                style={{
                                    background: '#F5F5F9',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '10px 20px',
                                    fontSize: '14px',
                                    color: '#2E2E48',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancelar
                            </motion.button>
                            <motion.button
                                whileHover={{ boxShadow: "0px 0px 10px rgba(103, 61, 230, 0.7)", background: '#673DE6' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCreateStory}
                                style={{
                                    background: 'rgba(103, 61, 230, 0.8)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '10px 20px',
                                    fontSize: '14px',
                                    color: '#FFFFFF',
                                    cursor: 'pointer'
                                }}
                            >
                                Crear
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Modal de creación de sprint */}
            {showCreateSprintModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: 'spring', damping: 10 }}
                        style={{
                            backgroundColor: '#FFFFFF',
                            padding: '24px',
                            borderRadius: '12px',
                            maxWidth: '500px',
                            width: '90%',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                        }}
                    >
                        <h3 style={{
                            color: '#2E2E48',
                            fontSize: '20px',
                            fontWeight: '600',
                            marginBottom: '20px'
                        }}>
                            Crear Nuevo Sprint
                        </h3>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: '#2E2E48',
                                fontWeight: '500'
                            }}>Nombre del Sprint*</label>
                            <input
                                type="text"
                                value={newSprint.name}
                                onChange={(e) => setNewSprint({ ...newSprint, name: e.target.value })}
                                style={{
                                    width: '95%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: sprintErrors.name ? `1px solid ${colors.error}` : '1px solid #E5E5ED',
                                    fontSize: '14px'
                                }}
                            />
                            {sprintErrors.name && (
                                <div style={{
                                    color: colors.error,
                                    fontSize: '12px',
                                    marginTop: '4px'
                                }}>{sprintErrors.name}</div>
                            )}
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: '#2E2E48',
                                fontWeight: '500'
                            }}>Fecha de inicio*</label>
                            <input
                                type="date"
                                value={newSprint.startDate}
                                onChange={(e) => setNewSprint({ ...newSprint, startDate: e.target.value })}
                                style={{
                                    width: '95%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: sprintErrors.startDate ? `1px solid ${colors.error}` : '1px solid #E5E5ED',
                                    fontSize: '14px'
                                }}
                            />
                            {sprintErrors.startDate && (
                                <div style={{
                                    color: colors.error,
                                    fontSize: '12px',
                                    marginTop: '4px'
                                }}>{sprintErrors.startDate}</div>
                            )}
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: '#2E2E48',
                                fontWeight: '500'
                            }}>Fecha de fin*</label>
                            <input
                                type="date"
                                value={newSprint.endDate}
                                onChange={(e) => setNewSprint({ ...newSprint, endDate: e.target.value })}
                                min={newSprint.startDate || ''}
                                style={{
                                    width: '95%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: sprintErrors.endDate ? `1px solid ${colors.error}` : '1px solid #E5E5ED',
                                    fontSize: '14px'
                                }}
                            />
                            {sprintErrors.endDate && (
                                <div style={{
                                    color: colors.error,
                                    fontSize: '12px',
                                    marginTop: '4px'
                                }}>{sprintErrors.endDate}</div>
                            )}
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '12px'
                        }}>
                            <motion.button
                                whileHover={{ background: '#ececec' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    setShowCreateSprintModal(false);
                                    setSprintErrors({ name: '', startDate: '', endDate: '' });
                                }}
                                style={{
                                    background: '#F5F5F9',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '10px 20px',
                                    fontSize: '14px',
                                    color: '#2E2E48',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancelar
                            </motion.button>
                            <motion.button
                                whileHover={{ boxShadow: "0px 0px 10px rgba(103, 61, 230, 0.7)", background: '#673DE6' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCreateSprint}
                                style={{
                                    background: 'rgba(103, 61, 230, 0.8)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '10px 20px',
                                    fontSize: '14px',
                                    color: '#FFFFFF',
                                    cursor: 'pointer'
                                }}
                            >
                                Crear
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Modal de edición */}
            {showEditModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: 'spring', damping: 10 }}
                        style={{
                            backgroundColor: '#FFFFFF',
                            padding: '24px',
                            borderRadius: '12px',
                            maxWidth: '500px',
                            width: '90%',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                        }}
                    >
                        <h3 style={{
                            color: '#2E2E48',
                            fontSize: '20px',
                            fontWeight: '600',
                            marginBottom: '20px'
                        }}>
                            Editar Historia
                        </h3>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: '#2E2E48',
                                fontWeight: '500'
                            }}>Título</label>
                            <input
                                type="text"
                                value={editedData.title}
                                onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
                                style={{
                                    width: '95%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #E5E5ED',
                                    fontSize: '14px'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: '#2E2E48',
                                fontWeight: '500'
                            }}>Descripción</label>
                            <textarea
                                value={editedData.description}
                                onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                                style={{
                                    width: '95%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #E5E5ED',
                                    fontSize: '14px',
                                    minHeight: '100px',
                                    fontFamily: "'Poppins', sans-serif",
                                    resize: "vertical",
                                    maxHeight: '250px'
                                }}
                            />
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '12px'
                        }}>
                            <motion.button
                                whileHover={{ background: '#ececec' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowEditModal(false)}
                                style={{
                                    background: '#F5F5F9',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '10px 20px',
                                    fontSize: '14px',
                                    color: '#2E2E48',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancelar
                            </motion.button>
                            <motion.button
                                whileHover={{ boxShadow: "0px 0px 10px rgba(103, 61, 230, 0.7)", background: '#673DE6' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSaveEdit}
                                style={{
                                    background: 'rgba(103, 61, 230, 0.8)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '10px 20px',
                                    fontSize: '14px',
                                    color: '#FFFFFF',
                                    cursor: 'pointer'
                                }}
                            >
                                Guardar
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Modal de confirmación para borrar */}
            {showDeleteModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: 'spring', damping: 10 }}
                        style={{
                            backgroundColor: '#FFFFFF',
                            padding: '24px',
                            borderRadius: '12px',
                            maxWidth: '400px',
                            width: '90%',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                        }}
                    >
                        <h3 style={{
                            color: '#2E2E48',
                            fontSize: '18px',
                            fontWeight: '600',
                            marginBottom: '16px'
                        }}>
                            Confirmar borrado
                        </h3>
                        <p style={{
                            color: '#6D6D80',
                            fontSize: '14px',
                            marginBottom: '24px'
                        }}>
                            ¿Estás seguro que quieres borrar la historia "{currentStory?.title}"?
                        </p>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '12px'
                        }}>
                            <motion.button
                                whileHover={{ background: '#ececec' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowDeleteModal(false)}
                                style={{
                                    background: '#F5F5F9',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '10px 20px',
                                    fontSize: '14px',
                                    color: '#2E2E48',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancelar
                            </motion.button>
                            <motion.button
                                whileHover={{ boxShadow: "0px 0px 10px rgba(255, 0, 0, 0.7)", background: 'red' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={confirmDelete}
                                style={{
                                    background: '#FF5252',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '10px 20px',
                                    fontSize: '14px',
                                    color: '#FFFFFF',
                                    cursor: 'pointer'
                                }}
                            >
                                Borrar
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Modal de tareas */}
            {showTasksModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ type: 'spring', damping: 10 }}
                        style={{
                            backgroundColor: '#FFFFFF',
                            padding: '24px',
                            borderRadius: '12px',
                            maxWidth: '500px',
                            width: '90%',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                        }}
                    >
                        <h3 style={{
                            color: '#2E2E48',
                            fontSize: '20px',
                            fontWeight: '600',
                            marginBottom: '20px'
                        }}>
                            Tareas: {currentStory?.title}
                        </h3>

                        {currentStory?.tasks.length > 0 ? (
                            <div style={{ marginBottom: '20px' }}>
                                {currentStory.tasks.map(task => (
                                    <div key={task.id} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '12px',
                                        borderBottom: `1px solid ${colors.border}`,
                                        background: task.completed ? '#F0F8FF' : 'transparent',
                                        borderRadius: '4px',
                                        transition: 'background 0.3s ease'
                                    }}>
                                        <input
                                            type="checkbox"
                                            checked={task.completed || false}
                                            onChange={() => toggleTaskCompletion(currentStory.id, task.id)}
                                            style={{
                                                width: '18px',
                                                height: '18px',
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <span style={{ flex: 1 }}>
                                            {task.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{
                                textAlign: 'center',
                                justifyItems: 'center',
                                padding: '20px',
                                color: colors.lightText,
                                marginBottom: '20px'
                            }}>
                                <div style={{
                                    width: "6rem",
                                    height: "6rem",
                                    backgroundColor: "#efeaff",
                                    borderRadius: "50%",
                                    marginBottom: "2rem",
                                    alignItems: 'center',
                                }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="3em"
                                        height="3em"
                                        style={{ color: colors.secondary, padding: "1.4rem" }}
                                    >
                                        <g fill="none" fillRule="evenodd">
                                            <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path>
                                            <path
                                                fill="currentColor"
                                                d="M7.416 3A5 5 0 0 0 7 5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2c0-.711-.148-1.388-.416-2H18a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM12 14H9a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2m3-4H9a1 1 0 0 0-.117 1.993L9 12h6a1 1 0 1 0 0-2m-3-8a3 3 0 0 1 2.236 1c.428.478.704 1.093.755 1.772L15 5H9c0-.725.257-1.39.685-1.908L9.764 3c.55-.614 1.348-1 2.236-1"
                                            ></path>
                                        </g>
                                    </svg>
                                </div>
                                No hay tareas asignadas a esta historia de usuario.
                            </div>
                        )}

                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '12px'
                        }}>
                            <motion.button
                                whileHover={{ background: '#ececec' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowTasksModal(false)}
                                style={{
                                    background: '#F5F5F9',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '10px 20px',
                                    fontSize: '14px',
                                    color: '#2E2E48',
                                    cursor: 'pointer'
                                }}
                            >
                                Cerrar
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default ProjectScreen;