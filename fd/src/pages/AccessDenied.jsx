
import { useNavigate } from 'react-router-dom'

function AccessDenied() {

    const navigate = useNavigate()


    return (
    <div className='h-[500px] w-screen flex items-center gap-10 justify-center flex-col'>

            <h1 className='text-4xl'> Access Denied You Have to Login to Access Download Links </h1>

            <button onClick={() => {
                navigate("/login")
            }} className='btn btn-primary'>Go To Login Page</button>

    </div>
  )
}

export default AccessDenied