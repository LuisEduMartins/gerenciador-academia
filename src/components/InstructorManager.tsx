import React from 'react';
import { Instrutor } from '../types/models';

interface Props {
  instrutores: Instrutor[];
  onEdit: (instrutor: Instrutor) => void;
  onDelete: (id: number) => void;
}

const InstructorManager: React.FC<Props> = ({ instrutores, onEdit, onDelete }) => {
  return (
    <ul>
      {instrutores.map(instrutor => (
        <li key={instrutor.id}>
          <div className="item-info">
            <strong>{instrutor.nome}</strong>
          </div>
          <div className="item-controls">
            <button onClick={() => onEdit(instrutor)}>✏️</button>
            <button onClick={() => onDelete(instrutor.id)}>🗑️</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default InstructorManager;