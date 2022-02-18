import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';
import { FormEntry } from '../../types/EntryTypes'

interface Props {
  modalOpenness: boolean;
  closeModal: () => void;
  onSubmit: (values: FormEntry) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpenness, closeModal, onSubmit, error }: Props) => (
  <Modal open={modalOpenness} onClose={closeModal} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm onSubmit={onSubmit} onCancel={closeModal} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;