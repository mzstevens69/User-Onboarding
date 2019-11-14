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
                <Field type="text" name="email" placeholder="email" />
                {touched.email && errors.email && (
                <p className="error">{errors.email}</p>
        )}

            </Form>
        </div>
    )
}

export default Form;