import React, { useState } from 'react';
import { Membro, PlanoDeTreino, Exercicio, Instrutor } from './types/modelos';
import Modal from './components/Modal';
import GerenciarMembro from './components/GerenciarMembro';
import GerenciarPlanos from './components/GerenciarPlanos';
import GerenciarExercicios from './components/GerenciarExercicios';
import GerenciarInstrutor from './components/GerenciarInstrutor';
import './App.css';


const initialInstrutores: Instrutor[] = [
  { id: 1, nome: 'Marcelo' },
  { id: 2, nome: 'Thiago' },
];
const initialExercicios: Exercicio[] = [
  { id: 101, nome: 'Supino Reto', grupoMuscular: 'Peito' },
  { id: 102, nome: 'Agachamento Livre', grupoMuscular: 'Pernas' },
  { id: 103, nome: 'Barra Fixa', grupoMuscular: 'Costas' },
  { id: 104, nome: 'Elevação frontal', grupoMuscular: 'Ombros' },
];
const initialPlanos: PlanoDeTreino[] = [
  { id: 201, nome: 'Hipertrofia - Peito/Tríceps', exercicioIds: [101, 104] },
  { id: 202, nome: 'Força - Costas/Bíceps', exercicioIds: [103] },
];
const initialMembros: Membro[] = [
  { id: 301, nome: 'Luis Eduardo', email: 'luiseduardomartins@gmail.com', instrutorId: 1, planoId: 201 },
  { id: 302, nome: 'Bruno', email: 'brunoufc@gmail.com', instrutorId: 2, planoId: 202 },
];
type ModalType = 'membro' | 'plano' | 'exercicio' | 'instrutor' | null;

function App() {
  const [membros, setMembros] = useState<Membro[]>(initialMembros);
  const [planos, setPlanos] = useState<PlanoDeTreino[]>(initialPlanos);
  const [exercicios, setExercicios] = useState<Exercicio[]>(initialExercicios);
  const [instrutores, setInstrutores] = useState<Instrutor[]>(initialInstrutores);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  const openModal = (type: ModalType, item: any = null) => {
    setModalType(type);
    setEditingItem(item);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setEditingItem(null);
  };
  const handleMemberSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const novoMembro = {
      id: editingItem?.id || Date.now(),
      nome: formData.get('nome') as string,
      email: formData.get('email') as string,
      instrutorId: Number(formData.get('instrutorId')),
      planoId: Number(formData.get('planoId')),
    };
    if (editingItem) {
      setMembros(membros.map(m => m.id === novoMembro.id ? novoMembro : m));
    } else {
      setMembros([...membros, novoMembro]);
    }
    closeModal();
  };
  const deleteMembro = (id: number) => setMembros(membros.filter(m => m.id !== id));
  const handlePlanoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectExercicios = e.currentTarget.elements.namedItem('exercicioIds') as HTMLSelectElement;
    const exerciciosSelecionados = Array.from(selectExercicios.selectedOptions).map(option => Number(option.value));
    
    const novoPlano = {
      id: editingItem?.id || Date.now(),
      nome: formData.get('nome') as string,
      exercicioIds: exerciciosSelecionados,
    };
    if (editingItem) {
      setPlanos(planos.map(p => p.id === novoPlano.id ? novoPlano : p));
    } else {
      setPlanos([...planos, novoPlano]);
    }
    closeModal();
  };
  const deletePlano = (id: number) => setPlanos(planos.filter(p => p.id !== id));
  const handleExercicioSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const novoExercicio = {
      id: editingItem?.id || Date.now(),
      nome: formData.get('nome') as string,
      grupoMuscular: formData.get('grupoMuscular') as string,
    };
    if (editingItem) {
      setExercicios(exercicios.map(ex => ex.id === novoExercicio.id ? novoExercicio : ex));
    } else {
      setExercicios([...exercicios, novoExercicio]);
    }
    closeModal();
  };
  const deleteExercicio = (id: number) => setExercicios(exercicios.filter(ex => ex.id !== id));
  const handleInstrutorSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const novoInstrutor = {
      id: editingItem?.id || Date.now(),
      nome: formData.get('nome') as string,
    };
    if (editingItem) {
      setInstrutores(instrutores.map(i => i.id === novoInstrutor.id ? novoInstrutor : i));
    } else {
      setInstrutores([...instrutores, novoInstrutor]);
    }
    closeModal();
  };
  const deleteInstrutor = (id: number) => setInstrutores(instrutores.filter(i => i.id !== id));


  return (
    <div className="App">
      <header className="App-header">
        <h1>Fitguys: A Academia do momento</h1>
      </header>

      <main className="main-grid">
        <div className="column">
          <h2>
            Membros
            <button className="add-button" onClick={() => openModal('membro')}>+</button>
          </h2>
          <GerenciarMembro
            membros={membros}
            planos={planos}
            instrutores={instrutores}
            onEdit={(membro) => openModal('membro', membro)}
            onDelete={deleteMembro}
          />
        </div>

        <div className="column">
          <h2>
            Planos de Treino
            <button className="add-button" onClick={() => openModal('plano')}>+</button>
          </h2>
          <GerenciarPlanos
            planos={planos}
            exercicios={exercicios}
            onEdit={(plano) => openModal('plano', plano)}
            onDelete={deletePlano}
          />
        </div>

        <div className="column">
          <h2>
            Exercícios
            <button className="add-button" onClick={() => openModal('exercicio')}>+</button>
          </h2>
          <GerenciarExercicios
            exercicios={exercicios}
            onEdit={(exercicio) => openModal('exercicio', exercicio)}
            onDelete={deleteExercicio}
          />
        </div>

        <div className="column">
          <h2>
            Instrutores
            <button className="add-button" onClick={() => openModal('instrutor')}>+</button>
          </h2>
          <GerenciarInstrutor
            instrutores={instrutores}
            onEdit={(instrutor) => openModal('instrutor', instrutor)}
            onDelete={deleteInstrutor}
          />
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalType === 'membro' && (
          <form className="modal-form" onSubmit={handleMemberSubmit}>
            <h3>{editingItem ? 'Editar Membro' : 'Novo Membro'}</h3>
            <label>Nome</label>
            <input name="nome" defaultValue={editingItem?.nome} required />
            <label>Email</label>
            <input name="email" type="email" defaultValue={editingItem?.email} required />
            <label>Instrutor</label>
            <select name="instrutorId" defaultValue={editingItem?.instrutorId} required>
              {instrutores.map(i => <option key={i.id} value={i.id}>{i.nome}</option>)}
            </select>
            <label>Plano de Treino</label>
            <select name="planoId" defaultValue={editingItem?.planoId} required>
              {planos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
            </select>
            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={closeModal}>Cancelar</button>
              <button type="submit" className="btn-primary">Salvar</button>
            </div>
          </form>
        )}
        {modalType === 'plano' && (
          <form className="modal-form" onSubmit={handlePlanoSubmit}>
            <h3>{editingItem ? 'Editar Plano' : 'Novo Plano'}</h3>
            <label>Nome do Plano</label>
            <input name="nome" defaultValue={editingItem?.nome} required />
            <label>Exercícios (segure Ctrl/Cmd para selecionar vários)</label>
            <select name="exercicioIds" multiple defaultValue={editingItem?.exercicioIds || []} required>
              {exercicios.map(ex => <option key={ex.id} value={ex.id}>{ex.nome}</option>)}
            </select>
            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={closeModal}>Cancelar</button>
              <button type="submit" className="btn-primary">Salvar</button>
            </div>
          </form>
        )}
        {modalType === 'exercicio' && (
          <form className="modal-form" onSubmit={handleExercicioSubmit}>
            <h3>{editingItem ? 'Editar Exercício' : 'Novo Exercício'}</h3>
            <label>Nome do Exercício</label>
            <input name="nome" defaultValue={editingItem?.nome} required />
            <label>Grupo Muscular</label>
            <input name="grupoMuscular" defaultValue={editingItem?.grupoMuscular} required />
            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={closeModal}>Cancelar</button>
              <button type="submit" className="btn-primary">Salvar</button>
            </div>
          </form>
        )}
        {modalType === 'instrutor' && (
          <form className="modal-form" onSubmit={handleInstrutorSubmit}>
            <h3>{editingItem ? 'Editar Instrutor' : 'Novo Instrutor'}</h3>
            <label>Nome</label>
            <input name="nome" defaultValue={editingItem?.nome} required />
            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={closeModal}>Cancelar</button>
              <button type="submit" className="btn-primary">Salvar</button>
            </div>
          </form>
        )}
      </Modal>

      <footer style={{padding: "2rem", color: "#FFFFFF"}}>
        <p><a href="https://github.com/LuisEduMartins/trabalhoweb2">Link do repositorio</a></p>
      </footer>
    </div>
  );
}

export default App;