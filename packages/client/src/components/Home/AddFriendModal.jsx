import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import TextField from '../TextField';
import { Form, Formik } from 'formik';
import { friendSchema } from '@whatsapp.clone/common';

const AddFriendModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a friend!</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <Formik
          initialValues={{ friendName: '' }}
          onSubmit={(values) => {
            console.log(values);
            onClose();
          }}
          validationSchema={friendSchema}
        >
          <Form>
            <ModalBody>
              <TextField
                label="Friend's name"
                placeholder="Enter friend's username.."
                autoComplete="off"
                name="friendName"
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" type="submit">
                Submit
              </Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default AddFriendModal;
