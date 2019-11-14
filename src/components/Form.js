import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Form, Field, withFormik  } from 'formik'
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
                <label 
                className='checkbox-container'>
                Terms of Service
                <Field 
                type='checkbox'
                name='terms'
                checked={values.terms}
                />
                <span className='checkmark'/>
                </label>
                <br />
                <button type="submit">Submit!</button>
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <span>Users: {user.name} </span><br />
                    <span>Email: {user.email} </span><br />
                    <span>Password: {user.password} </span>
                </ul>
            ))}
        </div>
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
    vaspandationSchema: Yup.object().shape({
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