import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import UserCard from './Components/UserCard';
import { UserState } from './Context/UserProvider';

const App = () => {
  const toast = useToast();
  const { users, setUsers } = UserState();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const registerUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/user/reg-user", userData);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUsers((prevData) => [...prevData, data]);
      setUserData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        address: "",
      });
      setLoading(false);
      onClose();
    } catch (error) {
      setLoading(false);
      toast({
        title: "Registration Failed",
        description: error.response?.data || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/user");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [setUsers]);

  const filterUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  return (
    <>
      <div className="app-container">
        <div className="header">
          <h2>User Management</h2>
        </div>

        <div className="search-user">
          <input
            type="text"
            placeholder="Search user..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="actions">
          <Button colorScheme="blue" onClick={onOpen}>
            Register New
          </Button>
        </div>

        <table className="user-table">
          <thead>
            <tr>
              <th>Sno.</th>
              <th>Name</th>
              <th>Email</th>
              <th>View</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filterUsers.map((user, index) => (
              <UserCard
                key={index}
                sno={index + 1}
                firstName={user.firstName}
                lastName={user.lastName}
                phoneNumber={user.phoneNumber}
                email={user.email}
                address={user.address}
                userId={user._id}
              />
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Registration</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing="5px">
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  placeholder="Enter Your First Name"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  placeholder="Enter Your Last Name"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Phone</FormLabel>
                <Input
                  placeholder="Phone no."
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Enter Your Email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  placeholder="Enter Your Address"
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              width="100%"
              onClick={registerUser}
              isLoading={loading}
            >
              Register
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default App;
