import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Form, Field, withFormik  } from 'formik'
import *as Yup from 'yup';
import styled from 'styled-components';
// style User form
const MainTitle = styled.h1 `

    color: whitesmoke;
    text-shadow:
        -1px -1px 0 firebrick,
        1px -1px 0 firebrick,
        -1px 1px 0 firebrick,
        1px 1px 0 firebrick; 
`
const UForm = styled.div `

    padding: 4%;

`
const CheckBox = styled.label `

    display: block;
    position: relative;
    padding-left: 35px;
    margin-top: 32px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: white;
    text-shadow:
        -1px -1px 0 firebrick,
        1px -1px 0 firebrick,
        -1px 1px 0 firebrick,
        1px 1px 0 firebrick; 
  
`
const NewUser = styled.ul `

    color: white;
    text-shadow:
        -1px -1px 0 firebrick,
        1px -1px 0 firebrick,
        -1px 1px 0 firebrick,
        1px 1px 0 firebrick; 

`

const Button = styled.button`
    
    width: 12%;
    background-color: lemonchiffon;
    font-size: .85rem;
    color: midnightblue;
    border-radius: 3px
    
`

const UserForm = ({ errors, touched, values, status }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status])
    return (
        <UForm>
            <MainTitle>User Form</MainTitle>
            <Form>
             
                <Field 
                type='text'
                name='name'
                placeholder='your name' />
                {touched.name && errors.name && (
                <p className='error'>{errors.name}</p>
                )}
                <br />
                <Field type="text" name="email" placeholder="email" />
                {touched.email && errors.email && (
                <p className="error">{errors.email}</p>
                )}
                <br />
                <Field type="password" name="password" placeholder="Password" />
                {touched.password && errors.password && (
                <p className="error">{errors.password}</p>
                )}
                <br />
                <CheckBox>
                I agree to Terms of Service
                <Field 
                type='checkbox'
                name='terms'
                checked={values.terms}
                />
                <span/>
                </CheckBox>
                <br />
                <Button type="submit">Submit!</Button>
                
            </Form>
            {users.map(user => (
                <NewUser key={user.id}>
                    <span>Users: {user.name} </span><br />
                    
                    <span>Email: {user.email} </span><br />
                    
                    <span>Password: {user.password} </span>
                </NewUser>
            ))}
        </UForm>
    );
};
const FormikUserForm = withFormik({
    mapPropsToValues({name, email, terms, password}) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || ''
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('put your name already!'),
        email: Yup.string().required('everybody needs an email'),
        password: Yup.string().required('at least enter 1234!')
    }),
    handleSubmit(values, {setStatus}) {
        axios.post('https://reqres.in/api/users', values)
        .then(res => {
            setStatus(res.data);            
        })
        .catch(err => console.log(err.res)
        );
    }
}) (UserForm);

export default FormikUserForm;