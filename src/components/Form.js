import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Form, Field, withFormik, yupToFormErrors  } from 'formik'
import *as Yup from 'yup';

const UserForm = ({ errors, touched, values, status }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status])
    return (
        <div className='user-form'>
            <h1>User Form</h1>
            <Form>
                <Field 
                type='text'
                name='name'
                placeholder='your name' />
                {touched.name && errors.name && (
                <p className='error'>{errors.name}</p>
                )}
                <Field type="text" name="email" placeholder="email" />
                {touched.email && errors.email && (
                <p className="error">{errors.email}</p>
                )}
                <label 
                className='checkbox-container'>
                Terms of Service
                <Field 
                type='checkbox'
                name='tos'
                checked={values.tos}
                />
                <span className='checkmark'/>
                </label>
                <button type="submit">Submit!</button>
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <li>Users: {user.name} </li>
                    <li>Users: {user.email} </li>
                    <li>Users: {user.password} </li>
                </ul>
            ))}
        </div>
    );
};
const FormikUserForm = withFormik({
    mapPropsToValues({name, email, tos}) {
        return {
            name: name || '',
            email: email || ''
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required()
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