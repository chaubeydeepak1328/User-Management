import axios from "axios";
import React, { useState } from "react";
import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";
import { UserState } from "../Context/UserProvider";

const UserCard = ({
  firstName,
  lastName,
  phoneNumber,
  email,
  address,
  sno,
  userId,
}) => {
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [editData, setEditData] = useState({
    firstName,
    lastName,
    phoneNumber,
    email,
    address,
  });

  const { users, setUsers } = UserState();

  // Handle input change during editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update user data
  const updateUser = async () => {
    try {
      await axios.put(`/api/user/${userId}`, editData);
      toast({
        title: "User updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setIsEditing(false);

      // dynaimcally update the user by fitering through userId
      // remove the user from array
      const deletedUser = users.filter((user) => user._id !== userId);
      // add the users into the array
      setUsers(() => {
        return [...deletedUser, editData];
      });
    } catch (error) {
      toast({
        title: "Failed to update user",
        description: error.response?.data || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  // Delete user data
  const deleteUser = async () => {
    try {
      await axios.delete(`/api/user/${userId}`);
      toast({
        title: "User deleted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // here we are going to dynamically delete the candidate details

      const UpdatedUsers = users.filter((user) => user._id !== userId);
      setUsers(UpdatedUsers);
    } catch (error) {
      toast({
        title: "Failed to delete user",
        description: error.response?.data || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <tr>
        <td>{sno}</td>
        <td>
          {firstName} {lastName}
        </td>
        <td>{email}</td>
        <td className="view-icon">
          <svg
            onClick={() => setIsViewing(true)}
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
          >
            <g
              fill="none"
              stroke="green"
              strokeLinejoin="round"
              strokeWidth="0.93"
            >
              <path d="M8 3.895C12.447 3.895 14.5 8 14.5 8s-2.053 4.105-6.5 4.105S1.5 8 1.5 8S3.553 3.895 8 3.895Z" />
              <path d="M9.94 8a2 2 0 1 1-3.999 0a2 2 0 0 1 4 0Z" />
            </g>
          </svg>
        </td>
        <td className="edit-icon">
          <svg
            onClick={() => setIsEditing(true)}
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="blue"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
              <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
            </g>
          </svg>
        </td>
        <td className="delete-icon">
          <svg
            onClick={deleteUser}
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="red"
              d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
            />
          </svg>
        </td>
      </tr>

      {/* View Modal */}
      <Modal isOpen={isViewing} onClose={() => setIsViewing(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>View User Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb={2}>
              First Name:
            </Text>
            <Text mb={4}>{firstName}</Text>

            <Text fontWeight="bold" mb={2}>
              Last Name:
            </Text>
            <Text mb={4}>{lastName}</Text>

            <Text fontWeight="bold" mb={2}>
              Email:
            </Text>
            <Text mb={4}>{email}</Text>

            <Text fontWeight="bold" mb={2}>
              Phone Number:
            </Text>
            <Text mb={4}>{phoneNumber}</Text>

            <Text fontWeight="bold" mb={2}>
              Address:
            </Text>
            <Text>{address}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={() => setIsViewing(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              name="firstName"
              placeholder="First Name"
              value={editData.firstName}
              onChange={handleInputChange}
              mb={3}
            />
            <Input
              name="lastName"
              placeholder="Last Name"
              value={editData.lastName}
              onChange={handleInputChange}
              mb={3}
            />
            <Input
              name="email"
              placeholder="Email"
              value={editData.email}
              onChange={handleInputChange}
              mb={3}
            />
            <Input
              name="phoneNumber"
              placeholder="Phone Number"
              value={editData.phoneNumber}
              onChange={handleInputChange}
              mb={3}
            />
            <Input
              name="address"
              placeholder="Address"
              value={editData.address}
              onChange={handleInputChange}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={updateUser}>
              Save
            </Button>
            <Button variant="ghost" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserCard;
