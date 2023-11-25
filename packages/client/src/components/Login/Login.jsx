import { VStack, ButtonGroup, Button, Heading } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextField from './TextField';
import { useNavigate } from 'react-router-dom';
import * as FormSchema from '@whatsapp.clone/common';

const Login = () => {
    const navigate = useNavigate();
    const { formSchema } = FormSchema;

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={Yup.object(formSchema)}
            onSubmit={(values, actions) => {
                const vals = { ...values };
                actions.resetForm();
                fetch('http://localhost:4000/auth/login', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(vals),
                })
                    .catch((err) => {
                        console.log(err);
                        return;
                    })
                    .then((res) => {
                        if (!res || !res.ok || res.status >= 400) {
                            return;
                        }
                    })
                    .then((data) => {
                        if (!data) return;
                        console.log(data);
                    });
            }}
        >
            <VStack
                as={Form}
                w={{ base: '90%', md: '500px' }}
                m="auto"
                justify="center"
                h="100vh"
                spacing="1rem"
            >
                <Heading>Log In</Heading>
                <TextField
                    name="username"
                    placeholder="Enter username"
                    autoComplete="off"
                    label="Username"
                />
                <TextField
                    name="password"
                    placeholder="Enter password"
                    autoComplete="off"
                    label="Password"
                />
                <ButtonGroup pt="1rem">
                    <Button colorScheme="teal" type="submit">
                        Log In
                    </Button>
                    <Button onClick={() => navigate('/register')}>
                        Create Account
                    </Button>
                </ButtonGroup>
            </VStack>
        </Formik>
    );
};

export default Login;
