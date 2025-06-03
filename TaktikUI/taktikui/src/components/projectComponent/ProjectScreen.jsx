import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import avatar from '../../assets/Avatar.png';

// Definición de colores
const colors = {
    white: '#FFFFFF',
    text: '#2E2E48',
    lightText: '#6D6D80',
    secondary: '#673DE6',
    border: '#E5E5ED'
};

const ProjectScreen = () => {
    const { projectName } = useParams();
    const navigate = useNavigate();

    const [showMemberModal, setShowMemberModal] = useState(false);
    const [newMember, setNewMember] = useState({
        name: '',
        role: '',
        email: ''
    });

    // Datos de las historias de usuario (sin estado)
    const userStories = [
        {
            id: 1,
            title: 'Crear página de inicio',
        },
        {
            id: 2,
            title: 'Implementar autenticación',
        },
        {
            id: 3,
            title: 'Diseñar base de datos',
        }
    ];

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
    const [currentStory, setCurrentStory] = useState(null);
    const [editedData, setEditedData] = useState({
        title: '',
    });

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
        });
        setShowEditModal(true);
    };

    // Función para abrir el modal de borrado
    const openDeleteModal = (story, e) => {
        e.stopPropagation();
        setCurrentStory(story);
        setShowDeleteModal(true);
    };

    // Función para guardar los cambios de edición
    const handleSaveEdit = () => {
        // En una implementación real, aquí actualizarías los datos
        alert(`Historia "${currentStory.title}" actualizada a:
        Título: ${editedData.title}`);
        setShowEditModal(false);
        setSelectedStory(null);
    };

    // Función para confirmar borrado
    const confirmDelete = () => {
        // En una implementación real, aquí borrarías la historia
        alert(`Historia "${currentStory.title}" borrada`);
        setShowDeleteModal(false);
        setSelectedStory(null);
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
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            onClick={() => navigate('/project')}
                            style={{
                                color: '#2F1C6A',
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
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
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
                                    <h2 style={{
                                        color: '#2E2E48',
                                        fontSize: '20px',
                                        fontWeight: '600',
                                        marginBottom: '16px'
                                    }}>Historias de Usuario</h2>

                                    {userStories.map(story => (
                                        <motion.div
                                            key={story.id}
                                            whileHover={{ y: -2 }}
                                            onClick={() => handleStoryClick(story)}
                                            initial={{ opacity: 1, height: 'auto' }}
                                            animate={{
                                                opacity: 1,
                                                height: selectedStory === story.id ? 'auto' : 'auto'
                                            }}
                                            transition={{ duration: 0.2 }}
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
                                                            paddingTop: '12px',
                                                            display: 'flex',
                                                            justifyContent: 'flex-end',
                                                            gap: '8px'
                                                        }}
                                                    >
                                                        <button
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
                                                        </button>
                                                        <button
                                                            onClick={(e) => openDeleteModal(story, e)}
                                                            style={{
                                                                background: '#ffdddd',
                                                                border: 'none',
                                                                borderRadius: '50%',
                                                                padding: '3px 5.5px',
                                                                fontSize: '14px',
                                                                color: 'red',
                                                                cursor: 'pointer'
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
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="sprints"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <h2 style={{
                                        color: '#2E2E48',
                                        fontSize: '20px',
                                        fontWeight: '600',
                                        marginBottom: '16px'
                                    }}>Sprints</h2>
                                    <div style={{
                                        background: '#FFFFFF',
                                        borderRadius: '8px',
                                        padding: '24px',
                                        textAlign: 'center',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                                    }}>
                                        <p style={{ color: '#6D6D80' }}>No hay sprints creados aún</p>
                                        <motion.button
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            style={{
                                                background: '#673DE6',
                                                color: '#FFFFFF',
                                                border: 'none',
                                                borderRadius: '8px',
                                                padding: '10px 20px',
                                                marginTop: '16px',
                                                cursor: 'pointer',
                                                fontSize: '14px'
                                            }}
                                        >
                                            Crear Sprint
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

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
                                    whileHover={{ scale: 1.05 }}
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
                                            maxHeight: '350px',
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
                                            }}>Nombre</label>
                                            <input
                                                type="text"
                                                value={newMember.name}
                                                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                                                style={{
                                                    width: '92%',
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
                                            }}>Rol</label>
                                            <input
                                                type="text"
                                                value={newMember.role}
                                                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                                                style={{
                                                    width: '92%',
                                                    padding: '12px',
                                                    borderRadius: '8px',
                                                    border: '1px solid #E5E5ED',
                                                    fontSize: '14px'
                                                }}
                                            />
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
                                                    border: '1px solid #E5E5ED',
                                                    fontSize: '14px'
                                                }}
                                            />
                                        </div>

                                        {/* Botones con validación */}
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            gap: '12px'
                                        }}>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => {
                                                    setShowMemberModal(false);
                                                    setNewMember({ name: '', role: '', email: '' }); // Reset form
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
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => {
                                                    // Validación básica
                                                    if (!newMember.name.trim() || !newMember.email.trim()) {
                                                        alert('Nombre y email son campos obligatorios');
                                                        return;
                                                    }

                                                    // Validación de email simple
                                                    if (!newMember.email.includes('@')) {
                                                        alert('Por favor ingresa un email válido');
                                                        return;
                                                    }

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
                                                }}
                                                style={{
                                                    background: '#673DE6',
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
                                    padding: '12px 0',
                                    borderBottom: `1px solid ${colors.border}`
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
                                            fontSize: '14px'
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

                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '12px'
                        }}>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
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
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSaveEdit}
                                style={{
                                    background: '#673DE6',
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
                                whileHover={{ scale: 1.02 }}
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
                                whileHover={{ scale: 1.02 }}
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
        </div>
    );
};

export default ProjectScreen;