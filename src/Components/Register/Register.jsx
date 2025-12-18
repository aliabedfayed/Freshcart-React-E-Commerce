import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

function Register() {
    const navigate = useNavigate()

    function registerApi(values) {
        return axios.post("/auth/signup", values)
    }

    const registerMutation = useMutation({
        mutationFn: registerApi,

        onSuccess: () => {
            navigate("/login");
        }
    });


    let mySchema = Yup.object({
        name: Yup.string().required("Name is required").min(3, "Name must be at least 3 characters").max(20, "Name can't be more than 20 characters"),
        email: Yup.string().required("Email is required").email("Invalid email address"),
        password: Yup.string().required("Password is required").matches(/^[A-Z][a-z0-9]{3,9}$/, "Invalid password"),
        rePassword: Yup.string().required("Re-password is required").oneOf([Yup.ref("password")], "Passwords don't match"),
        phone: Yup.string().required("Phone is required").matches(/^(002)?01[0125][0-9]{8}$/, "Invalid phone")
    })

    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        }, validationSchema: mySchema
        , onSubmit: (values) => {
            registerMutation.mutate(values);
        }
    })

    return (
        <>
            <div className='w-3/4 mx-auto my-5'>
                <h2 className='text-main font-bold text-3xl my-5'>Register now :</h2>
                <form onSubmit={formik.handleSubmit}>
                    <input type="text" placeholder="Enter Your Name" className="main-input my-5" name='name' onChange={formik.handleChange}
                        value={formik.values.name} onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ?
                        <div role="alert" className="alert alert-error">{formik.errors.name}</div>
                        : null
                    }
                    <input type="email" placeholder="Enter Your Email" className="main-input my-5" name='email' onChange={formik.handleChange}
                        value={formik.values.email} onBlur={formik.handleBlur} />
                    {formik.touched.email && formik.errors.email ?
                        <div role="alert" className="alert alert-error">{formik.errors.email}</div>
                        : null
                    }
                    <input type="password" placeholder="Create Your Password" className="main-input my-5" name='password' onChange={formik.handleChange}
                        value={formik.values.password} onBlur={formik.handleBlur} />
                    {formik.touched.password && formik.errors.password ?
                        <div role="alert" className="alert alert-error">{formik.errors.password}</div>
                        : null
                    }
                    <input type="password" placeholder="Type Your Password Again" className="main-input my-5" name='rePassword' onChange={formik.handleChange}
                        value={formik.values.rePassword} onBlur={formik.handleBlur} />
                    {formik.touched.rePassword && formik.errors.rePassword ?
                        <div role="alert" className="alert alert-error">{formik.errors.rePassword}</div>
                        : null
                    }
                    <input type="tel" placeholder="Enter Your Phone" className="main-input my-5" name='phone' onChange={formik.handleChange}
                        value={formik.values.phone} onBlur={formik.handleBlur} />
                    {formik.touched.phone && formik.errors.phone ?
                        <div role="alert" className="alert alert-error my-5">{formik.errors.phone}</div>
                        : null
                    }
                    {registerMutation.isSuccess && (
                        <div className="alert alert-success alert-soft my-5">
                            Account created successfully
                        </div>
                    )}
                    {registerMutation.isError && (
                        <div className="alert alert-error alert-soft my-5">
                            {registerMutation.error.response?.data?.message}
                        </div>
                    )}
                    <button type='submit' className='main-btn opacity-100 translate-y-0 my-0'>{registerMutation.isPending ? <i className='fa fa-spinner fa-spin'> </i> : null} Register</button>
                </form>
            </div>
        </>
    )
}

export default Register
