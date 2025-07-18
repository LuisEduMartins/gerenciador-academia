import React from 'react';
import { PlanoDeTreino, Exercicio } from '../types/models';

interface Props {
  planos: PlanoDeTreino[];
  exercicios: Exercicio[];
  onEdit: (plano: PlanoDeTreino) => void;
  onDelete: (id: number) => void;
}

const PlanManager: React.FC<Props> = ({ planos, exercicios, onEdit, onDelete }) => {
  return (
    <ul>
      {planos.map(plano => (
        <li key={plano.id}>
          <div className="item-info">
            <strong>{plano.nome}</strong>
            <div className="sub-info">
              {plano.exercicioIds
                .map(id => exercicios.find(e => e.id === id)?.nome)
                .filter(Boolean)
                .join(', ')}
            </div>
          </div>
          <div className="item-controls">
            <button onClick={() => onEdit(plano)}>✏️</button>
            <button onClick={() => onDelete(plano.id)}>🗑️</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PlanManager;