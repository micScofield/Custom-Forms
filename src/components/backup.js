import { Fragment, useState } from 'react'
// import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import uuid from 'react-uuid'

import { setAlert, addForm } from '../store/actions'

import './modalContent.css'

const ModalContent = ({ setAlert, alertMsg, alertType, addForm, formName, history }) => {

    const [showTextarea, setShowTextarea] = useState(false)
    const [showQuestionForm, setShowQuestionForm] = useState(true)
    const [showPromptForMoreQuestions, setShowPromptForMoreQuestions] = useState(false)
    // const [customLink, setCustomLink] = useState(null)
    const [formId, setFormId] = useState('')
    const [isFormGenerated, setIsFormGenerated] = useState(false)

    // determining values entered by user when creating question
    const [questionText, setQuestionText] = useState('')
    const [selectedDropdownItem, setSelectedDropdownItem] = useState('')
    const [enteredValues, setEnteredValues] = useState('')

    const dropdownItemHandler = e => {
        setSelectedDropdownItem(e.target.innerText)

        if (e.target.innerText === 'Multichoice' || e.target.innerText === 'Radio') setShowTextarea(true)
        else setShowTextarea(false)
    }

    const textAreaChangeHandler = e => {
        setEnteredValues(e.target.value)
    }

    const addQuestionHandler = () => {
        const arr = enteredValues.split('\n')
        if (questionText.trim().length === 0) {
            setAlert('danger', 'Question cant be empty !')
        } else if (selectedDropdownItem === '') {
            setAlert('danger', 'Please choose an answer type !')
        } else if (selectedDropdownItem !== 'Text' && arr.length < 2) {
            setAlert('danger', 'Please enter at least 2 values !')
        } else {
            const existed = sessionStorage.getItem('question')
            let items = existed ? JSON.parse(existed) : []
            items.push({
                text: questionText,
                type: selectedDropdownItem,
                values: arr.filter(val => val.length !== 0)
            })

            sessionStorage.setItem('question', JSON.stringify(items))

            setShowQuestionForm(false)
            setShowPromptForMoreQuestions(true)
        }
    }

    const addMoreQuestionsHandler = () => {
        setQuestionText('')
        setSelectedDropdownItem('')
        setEnteredValues('')
        setShowPromptForMoreQuestions(false)
        setShowQuestionForm(true)
    }

    const saveFormHandler = () => {
        const questionSet = JSON.parse(sessionStorage.getItem('question'))
        const id = uuid()
        const additionalDetails = { 
            url: `localhost:3000/${id}`,
            date: new Date()
        }
        const formObj = { id, formName, questions: { ...questionSet }, ...additionalDetails }
        console.log(formObj)

        //dispatch an action to store form in the database
        // addForm(formObj)
        setFormId(id)
        setIsFormGenerated(true)

        const existed = localStorage.getItem('question')
        let forms = existed ? JSON.parse(existed) : []
        forms.push(formObj)
        localStorage.setItem('question', JSON.stringify(forms))
        sessionStorage.removeItem('question')
    }

    const redirectToFormHandler = () => {
        history.push(`/${formId}`)
    }

    //specifying alert classes
    const alertClasses = ['alert']
    if (alertType === 'success') alertClasses.push('alert-primary')
    else alertClasses.push('alert-danger')

    //JSX for question form
    var questionForm = (
        <Fragment>
            <label>Type your question</label><br />
            <input type='text' value={questionText} onChange={e => setQuestionText(e.target.value)} autoFocus /><br />

            <label>Select answer type</label>
            <div className="dropdown">
                <button id="dropdown-value" className="btn btn-large btn-dark" style={{ padding: '0.5rem', marginLeft: '1rem' }}>Choose any one <i className='fa fa-angle-down'></i></button>
                <div className="dropdown-content" onClick={e => dropdownItemHandler(e)}>
                    <span>Text</span>
                    <span>Multichoice</span>
                    <span>Radio</span>
                </div>
            </div>

            {/* display text area in case of radio and multichoice */}
            {selectedDropdownItem && <p> You selected: {selectedDropdownItem}</p>}

            {showTextarea && <Fragment>
                <textarea rows='4' placeholder='Please enter the values separated by line breaks' onChange={e => textAreaChangeHandler(e)} />
            </Fragment>}

            {alertMsg && <p className={alertClasses.join(' ')}>{alertMsg}</p>}

            <br /><button className='btn btn-large btn-primary' onClick={addQuestionHandler}>Add</button>
        </Fragment>
    )

    var promptForMoreQuestions = (
        <Fragment>
            <h3 className='my-bottom-1'>Question added successfully !</h3>
            <button className='btn btn-primary btn-large' onClick={addMoreQuestionsHandler}>Want to add more ?</button>
            <button className='btn btn-large btn-danger my-bottom-1' onClick={saveFormHandler}>Save form</button><br />

            {isFormGenerated && <Fragment>
                <span>Success !!! Your form {formName} is generated. </span>
                <button className='btn btn-large btn-dark my-bottom-1' onClick={redirectToFormHandler}>Click to open</button><br />

                <button className='btn btn-primary btn-large' onClick={() => window.location.reload()}>Want to create another form ?</button>  
            </Fragment>}
        </Fragment>
    )

    return <Fragment>
        <div className='modal-content'>
            <h3 className='my-bottom-1'>Let's create your form !</h3>

            {showQuestionForm && questionForm}

            {showPromptForMoreQuestions && promptForMoreQuestions}

        </div>
    </Fragment>
}

const mapStateToProps = state => ({
    alertMsg: state.alert.msg,
    alertType: state.alert.type
})

export default connect(mapStateToProps, { setAlert, addForm })(ModalContent)