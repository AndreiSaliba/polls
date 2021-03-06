import { useRef, useState } from "react";
import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    IconButton,
} from "@chakra-ui/react";
import { FaRegTrashAlt } from "react-icons/fa";

const DeleteAlert = ({ deletePoll, pollID }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef();

    return (
        <>
            <IconButton
                ml="1.5"
                colorScheme="red"
                borderRadius="md"
                onClick={() => setIsOpen(true)}
            >
                <FaRegTrashAlt />
            </IconButton>

            <AlertDialog
                leastDestructiveRef={cancelRef}
                isCentered
                isOpen={isOpen}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Poll
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete this poll? You
                            can&apos;t undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                ml={3}
                                colorScheme="red"
                                onClick={() => {
                                    deletePoll(pollID);
                                    onClose();
                                }}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default DeleteAlert;
