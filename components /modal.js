
import { View, Text, Modal, TouchableOpacity  , StyleSheet} from 'react-native';
//import styles from '../styles/style';
const ConfirmModal = ({ visible, onClose, onConfirm, message }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalDeleteButton]}
              onPress={onConfirm}
            >
              <Text style={styles.modalButtonText}>Oui</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalCancelButton]}
              onPress={onClose}
            >
              <Text style={styles.modalButtonText}>Non</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  modalText: {
    color: '#000000ff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 15,
  },
  modalButton: {
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 25,
    minWidth: 80,
    alignItems: 'center',
  },
  modalDeleteButton: {
    backgroundColor: '#f15151ff',
  },
  modalCancelButton: {
    backgroundColor: '#84cb86ff',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});