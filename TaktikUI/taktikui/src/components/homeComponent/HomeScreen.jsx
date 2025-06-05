import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/Taktik.png';
import avatar from '../../assets/Avatar.png';
import { getProjects, addProject } from '../service/apiHome.js';

const HomeScreen = () => {
    const [projects, setProjects] = useState([]);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newProject, setNewProject] = useState({
        name: '',
        description: ''
    });
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const colors = {
        primary: '#2F1C6A',
        secondary: '#673DE6',
        accent: '#FFD74A',
        light: '#F5F5F9',
        text: '#2E2E48',
        lightText: '#6D6D80',
        white: '#FFFFFF',
        border: '#E5E5ED'
    };

    const [isCreating, setIsCreating] = useState(false);

    const handleCreateProject = async () => {
        if (!newProject.name.trim() || isCreating) return;

        setIsCreating(true);
        try {
            const createdProject = await addProject({
                name: newProject.name,
                description: newProject.description
            });

            setProjects([...projects, createdProject]);
            setNewProject({ name: '', description: '' });
            setShowCreateModal(false);
        } catch (error) {
            console.error("Error al crear proyecto:", error);
        } finally {
            setIsCreating(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProject(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const fetchedProjects = await getProjects();
                setProjects(fetchedProjects || []);
            } catch (error) {
                console.error("Error al cargar proyectos:", error);
            }
        }
        fetchProjects();
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            background: colors.light,
            fontFamily: "'Poppins', sans-serif"
        }}>
            {/* Navbar */}
            <header style={{
                background: colors.white,
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

                    <div style={{ position: 'relative' }}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer'
                            }}
                        >
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
                        </motion.div>

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
                </div>
            </header>

            {/* Contenido */}
            <main style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '40px 24px',
                marginBottom: '-20px'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '32px'
                }}>
                    <h1 style={{
                        color: colors.primary,
                        fontSize: '28px',
                        fontWeight: '600',
                        margin: 0
                    }}>Mis Proyectos</h1>

                    <motion.button
                        whileHover={{ boxShadow: "0px 0px 15px rgba(103, 61, 230, 0.7)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowCreateModal(true)}
                        style={{
                            background: colors.secondary,
                            color: colors.white,
                            border: 'none',
                            borderRadius: '8px',
                            padding: '12px 24px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill="currentColor"
                                d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1"
                            ></path>
                        </svg>
                        Nuevo Proyecto
                    </motion.button>
                </div>

                {projects.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        marginTop: '3rem'
                    }}>
                        <div style={{
                            width: '120px',
                            height: '120px',
                            background: '#F5F3FF',
                            borderRadius: '50%',
                            display: 'flex',
                            border: '4px solid #673DE6',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px'
                        }}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 7.5C3 5.84315 4.34315 4.5 6 4.5H18C19.6569 4.5 21 5.84315 21 7.5V16.5C21 18.1569 19.6569 19.5 18 19.5H6C4.34315 19.5 3 18.1569 3 16.5V7.5Z" stroke={colors.secondary} strokeWidth="2" />
                                <path d="M3 9H21" stroke={colors.secondary} strokeWidth="2" strokeLinecap="round" />
                                <path d="M9 13H15" stroke={colors.secondary} strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h3 style={{
                            color: colors.text,
                            fontSize: '20px',
                            fontWeight: '600',
                            marginBottom: '12px'
                        }}>No tienes proyectos aún</h3>
                        <p style={{
                            color: colors.lightText,
                            marginBottom: '24px',
                            maxWidth: '400px',
                            margin: '0 auto 24px'
                        }}>Comienza creando tu primer proyecto para gestionar tus tareas y colaboradores</p>

                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '24px'
                    }}>
                        {projects.map(project => (
                            <motion.div
                                key={project.id}
                                whileHover={{ y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    background: colors.white,
                                    borderRadius: '12px',
                                    padding: '24px',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                                    border: `1px solid ${colors.border}`,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: '#F5F3FF',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '16px'
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 7.5C3 5.84315 4.34315 4.5 6 4.5H18C19.6569 4.5 21 5.84315 21 7.5V16.5C21 18.1569 19.6569 19.5 18 19.5H6C4.34315 19.5 3 18.1569 3 16.5V7.5Z" stroke={colors.secondary} strokeWidth="2" />
                                        <path d="M3 9H21" stroke={colors.secondary} strokeWidth="2" strokeLinecap="round" />
                                        <path d="M9 13H15" stroke={colors.secondary} strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <h3 style={{
                                    color: colors.text,
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    margin: '0 0 8px 0'
                                }}>{project.name}</h3>
                                <p style={{
                                    color: colors.lightText,
                                    fontSize: '14px',
                                    margin: '0 0 16px 0'
                                }}>{project.description}</p>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span style={{
                                        fontSize: '12px',
                                        color: colors.secondary,
                                        background: '#F5F3FF',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontWeight: '500'
                                    }}>#{project.id}</span>

                                </div>
                            </motion.div>
                        ))}

                        <motion.div
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowCreateModal(true)}
                            style={{
                                background: colors.white,
                                borderRadius: '12px',
                                padding: '24px',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                                border: `2px dashed ${colors.border}`,
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: '#F5F3FF',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '16px'
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 4V20M4 12H20" stroke={colors.secondary} strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h3 style={{
                                color: colors.text,
                                fontSize: '16px',
                                fontWeight: '600',
                                margin: '0 0 8px 0'
                            }}>Crear nuevo proyecto</h3>
                            <p style={{
                                color: colors.lightText,
                                fontSize: '14px',
                                margin: 0
                            }}>Comienza un nuevo proyecto desde cero</p>
                        </motion.div>
                    </div>
                )}
            </main>

            {/* Crear proyecto */}
            <AnimatePresence>
                {showCreateModal && (
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
                            background: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000,
                            padding: '20px'
                        }}
                        onClick={() => setShowCreateModal(false)}
                    >
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            style={{
                                background: colors.white,
                                borderRadius: '12px',
                                width: '100%',
                                maxWidth: '500px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                overflow: 'hidden'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div style={{
                                padding: '24px',
                                borderBottom: `1px solid ${colors.border}`
                            }}>
                                <h2 style={{
                                    margin: 0,
                                    color: colors.text,
                                    fontSize: '20px',
                                    fontWeight: '600'
                                }}>Crear nuevo proyecto</h2>
                            </div>

                            <div style={{ padding: '24px' }}>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        color: colors.text,
                                        fontWeight: '500',
                                        fontSize: '14px'
                                    }}>Nombre del proyecto</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newProject.name}
                                        onChange={handleInputChange}
                                        placeholder="Ej: Mi Sitio Web"
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            borderRadius: '8px',
                                            border: `1px solid ${colors.border}`,
                                            fontSize: '14px',
                                            outline: 'none',
                                            transition: 'all 0.2s ease'
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        color: colors.text,
                                        fontWeight: '500',
                                        fontSize: '14px'
                                    }}>Descripción (opcional)</label>
                                    <textarea
                                        name="description"
                                        value={newProject.description}
                                        onChange={handleInputChange}
                                        placeholder="Breve descripción del proyecto..."
                                        style={{
                                            fontFamily: "'Poppins', sans-serif",
                                            width: '100%',
                                            padding: '12px 16px',
                                            borderRadius: '8px',
                                            border: `1px solid ${colors.border}`,
                                            fontSize: '14px',
                                            minHeight: '100px',
                                            resize: 'vertical',
                                            outline: 'none',
                                            transition: 'all 0.2s ease'
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{
                                padding: '16px 24px',
                                background: '#F9F9FB',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '12px'
                            }}>
                                <motion.button
                                    whileHover={{ background: '#E5E5ED' }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setShowCreateModal(false)}
                                    style={{
                                        background: 'none',
                                        border: `1px solid ${colors.border}`,
                                        borderRadius: '8px',
                                        padding: '10px 20px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        color: colors.text,
                                        fontSize: '14px'
                                    }}
                                >
                                    Cancelar
                                </motion.button>

                                <motion.button
                                    whileHover={{
                                        background: '#5A2FCA',
                                        boxShadow: '0 4px 12px rgba(103, 61, 230, 0.2)'
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleCreateProject}
                                    disabled={!newProject.name.trim() || isCreating}
                                    style={{
                                        background: colors.secondary,
                                        color: colors.white,
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '10px 20px',
                                        fontWeight: '500',
                                        cursor: newProject.name.trim() && !isCreating ? 'pointer' : 'not-allowed',
                                        opacity: newProject.name.trim() && !isCreating ? 1 : 0.7,
                                        fontSize: '14px'
                                    }}
                                >
                                    {isCreating ? 'Creando...' : 'Crear proyecto'}
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HomeScreen;