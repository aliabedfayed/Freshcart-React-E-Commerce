import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setToken } from '../../Redux/authSlice';

function Login() {
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function loginApi(values) {
        return axios.post("/auth/signin", values)
    }

    const loginMutation = useMutation({
        mutationFn: loginApi,
        onSuccess: (res) => {
            dispatch(setToken(res.data.token))
            setErrorMessage(null)
            setSuccessMessage(res.data.message)
            navigate("/")
        },
        onError: (err) => {
            setSuccessMessage(null)
            setErrorMessage(err.response.data.message)
        }
    })

    const mySchema = Yup.object({
        email: Yup.string().required("Email is required").email("Invalid email address"),
        password: Yup.string().required("Password is required").matches(/^[A-Z][a-z0-9]{3,9}$/, "Invalid password"),
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        }, validationSchema: mySchema
        , onSubmit: (values) => {
            loginMutation.mutate(values)
        }
    })

    return (
        <>
            <div className='w-3/4 mx-auto my-5'>
                <h2 className='text-main font-bold text-3xl my-5'>Login now :</h2>
                <form onSubmit={formik.handleSubmit}>
                    <input type="email" placeholder="Enter Your Email" className="main-input my-5" name='email' onChange={formik.handleChange}
                        value={formik.values.email} onBlur={formik.handleBlur} />
                    {formik.touched.email && formik.errors.email ?
                        <div role="alert" className="alert alert-error">{formik.errors.email}</div>
                        : null
                    }
                    <input type="password" placeholder="Enter Your Password" className="main-input my-5" name='password' onChange={formik.handleChange}
                        value={formik.values.password} onBlur={formik.handleBlur} />
                    {formik.touched.password && formik.errors.password ?
                        <div role="alert" className="alert alert-error my-5">{formik.errors.password}</div>
                        : null
                    }
                    {successMessage ? <div role="alert" className="alert alert-success alert-soft my-5"><span>{successMessage}</span></div> : null}
                    {errorMessage ? <div role="alert" className="alert alert-error alert-soft my-5"><span>{errorMessage}</span></div> : null}
                    <button type='submit' className='main-btn opacity-100 translate-y-0 my-0'>{loginMutation.isPending ? <i className='fa fa-spinner fa-spin'> </i> : null} Login</button>
                    <p className="mt-4 text-sm">
                        Don't have an account?
                        <Link to="/register" class="text-main font-semibold cursor-pointer">
                            Register here
                        </Link>
                    </p>
                </form>

            </div>
        </>
    )
}

export default Login
