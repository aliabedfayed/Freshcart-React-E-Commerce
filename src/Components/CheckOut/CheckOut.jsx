import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { onlinePayment } from '../../Redux/cartSlice'

function CheckOut() {
    const dispatch = useDispatch()

    let formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        }, onSubmit: (values) => {
            dispatch(onlinePayment(values))
        }
    })

    return (
        <>
            <div className='w-1/2 mx-auto my-5'>
                <h2 className='text-main font-bold text-3xl my-5'>Your Address</h2>
                <form onSubmit={formik.handleSubmit}>
                    <input type="text" placeholder="Enter Your City" className="main-input my-5" name='city' onChange={formik.handleChange}
                        value={formik.values.city} onBlur={formik.handleBlur} />
                    {formik.touched.city && formik.errors.city ?
                        <div role="alert" className="alert alert-error">{formik.errors.city}</div>
                        : null
                    }
                    <input type="tel" placeholder="Enter Your Phone" className="main-input my-5" name='phone' onChange={formik.handleChange}
                        value={formik.values.phone} onBlur={formik.handleBlur} />
                    {formik.touched.phone && formik.errors.phone ?
                        <div role="alert" className="alert alert-error my-5">{formik.errors.phone}</div>
                        : null
                    }
                    <input type="text" placeholder="Enter Your Details" className="main-input my-5" name='details' onChange={formik.handleChange}
                        value={formik.values.details} onBlur={formik.handleBlur} />
                    {formik.touched.details && formik.errors.details ?
                        <div role="alert" className="alert alert-error">{formik.errors.details}</div>
                        : null
                    }
                    <button type='submit' className='main-btn opacity-100 translate-y-0 my-0'>Pay</button>
                </form>
            </div>
        </>
    )
}

export default CheckOut
