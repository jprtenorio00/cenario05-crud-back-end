import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiTrash2, FiPower } from 'react-icons/fi';
import api from '../../services/api'

import './style.css';

export default function Login() {
  const [tarefas, setTarefas] = useState([]);

  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    api.get('tarefas', {
      headers: {
        Authorization: user_id,
      }
    }).then(response => {
      setTarefas(response.data)
    })
  }, [user_id])

  const history = useHistory();

  async function handleDeleteTarefa(id) {
    try {
      await api.delete(`tarefas/${id}`, {
        headers: {
          Authorization: user_id,
        }
      })

      setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
    } catch (error) {
      alert('Você não tem permissão para deletar essa tarefa.')
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <span>Spotify</span>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      {/* <h1>Tarefas cadastradas</h1>

      <ul>
        {tarefas.map(tarefas => (
          <li key={tarefas.id}>
            <strong>Titulo:</strong>
            <p>{tarefas.title}</p>

            <strong>Descrição:</strong>
            <p>{tarefas.description}</p>

            <button onClick={() => handleDeleteTarefa(tarefas.id)} type='button' >
              <FiTrash2 size={20} color="#a8ab3" />
            </button>
          </li>
        ))}
      </ul> */}

    </div>
  );
}