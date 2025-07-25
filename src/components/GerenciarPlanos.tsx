import React from 'react';
import { PlanoDeTreino, Exercicio } from '../types/modelos';

interface Props {
  planos: PlanoDeTreino[];
  exercicios: Exercicio[];
  onEdit: (plano: PlanoDeTreino) => void;
  onDelete: (id: number) => void;
}

const GerenciarPlano: React.FC<Props> = ({ planos, exercicios, onEdit, onDelete }) => {
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
            <button onClick={() => onEdit(plano)}>Editar✏️</button>
            <button onClick={() => onDelete(plano.id)}>Apagar🗑️</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GerenciarPlano;