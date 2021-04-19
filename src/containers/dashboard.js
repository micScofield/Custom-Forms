import { Fragment, useState } from 'react'
import { connect } from 'react-redux'

import Modal from '../UI/Modal/Modal'
import ModalContent from '../components/modalContent'
import { setAlert } from '../store/actions'

const Dashboard = ({ alertType, alertMsg, setAlert, history }) => {

    const [formName, setFormName] = useState('')

    const [showModal, setShowModal] = useState(false)

    const addQuestionsHandler = () => {
        if (formName.trim().length === 0) {
            setAlert('danger', 'Form name cant be empty')
        } else {
            setShowModal(true)
        }
    }

    const backdropHandler = () => setShowModal(false)

    //specifying alert classes
    const alertClasses = ['alert']
    if (alertType === 'success') alertClasses.push('alert-primary')
    else alertClasses.push('alert-danger')

    return <Fragment>
        <div className='container'>
            <div style={{ textAlign: 'center' }}>
                <h1>Create Custom Forms</h1>
                <input type='text' className='my-top-1 my-bottom-1' placeholder='Enter form name here' value={formName} onChange={e => setFormName(e.target.value)} autoFocus /><br />

                <button className='btn btn-large btn-primary my-top-1 my-bottom-1' onClick={addQuestionsHandler}>Add Questions</button>
                <button className='btn btn-large btn-light' onClick={() => history.push('/listForms')}>List All Forms</button>

                {alertMsg && <p className={alertClasses.join(' ')}>{alertMsg}</p>}
            </div>

            {/* Show modal here */}
            {showModal && <Modal showModal backdropClicked={backdropHandler} >
                <ModalContent formName={formName} history={history} />
            </Modal>}

        </div>
    </Fragment>
}

const mapStateToProps = state => ({
    alertType: state.alert.type,
    alertMsg: state.alert.msg
})

export default connect(mapStateToProps, { setAlert })(Dashboard)