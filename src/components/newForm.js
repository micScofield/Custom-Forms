import { Fragment } from 'react'
import { connect } from 'react-redux'
import { setAlert } from '../store/actions'

import Card from '../UI/Card/Card'
import './newForm.css'

const NewForm = props => {

    const { formId } = props.match.params

    const forms = JSON.parse(localStorage.getItem('question'))
    const form = forms.filter(form => form.id === formId)[0]

    let questionsArray = []
    for (let i in form.questions) {
        questionsArray.push(form.questions[i])
    }

    const submitResponseHandler = () => {

        const textArr = Array.from(document.querySelectorAll('input[id="userAnswer"]'))
        const textFields = []
        textArr.forEach(el => {
            let obj = {}
            let key = el.name
            obj[key] = el.value
            textFields.push(obj)
        })
        console.log(textFields)

        const radioArr = Array.from(document.querySelectorAll('input[id="radio"]'))
        const selectedRadioArr = radioArr.filter(el => el.checked ? el : null)
        const radioFields = []
        selectedRadioArr.forEach(el => {
            let obj = {}
            let key = el.name
            obj[key] = el.value
            radioFields.push(obj)
        })
        console.log(radioFields)

        const checkboxArr = Array.from(document.querySelectorAll('input[id="checkbox"]'))
        const selectedcheckboxArr = checkboxArr.filter(el => el.checked ? el : null)
        const checkboxFields = []
        selectedcheckboxArr.forEach(el => {
            let obj = {}
            let key = el.name
            obj[key] = el.value
            checkboxFields.push(obj)
        })
        console.log(checkboxFields)

        const existedResponses = localStorage.getItem('responses')
        let formResponses = existedResponses ? JSON.parse(existedResponses) : []

        const tempObj = {
            formName: form.formName,
            textFields,
            radioFields,
            checkboxFields
        }

        formResponses.push(tempObj)

        localStorage.setItem('responses', JSON.stringify(formResponses))
        props.setAlert('success', 'Your response was submitted succesfully')
        props.history.push('/listForms')
    }

    return <Fragment>
        <div className='container-newForm'>
            <button className='btn btn-light btn-large' style={{marginLeft: '20%'}} onClick={() => props.history.goBack()}>Go Back</button>
            <button className='btn btn-light btn-large my-bottom-1' onClick={() => props.history.push('/')}>Go Home</button>
            <div style={{ textAlign: 'center' }}>
                <span className='large'>Form name: {form.formName}</span>

                {/* Loop through questions in the form and display  */}

                {questionsArray.map(question => <div id={question.text} className='newForm'>
                    <Card>
                        <p>{question.text}</p>

                        <p>{question.type === 'Text' && <input type='text' id='userAnswer' name={question.text} placeholder='type your answer here' />}</p>

                        <p>{question.type === 'Multichoice' && question.values.map(value => <div id={value} className="multiChoiceValues">
                            <input type='checkbox' name={question.text} id="checkbox" value={value} /><label>{value}</label><br />
                        </div>)}</p>

                        <p>{question.type === 'Radio' && question.values.map(value => <div id={value} className="multiChoiceValues">
                            <input type='radio' id="radio" name={question.text} value={value} /><label>{value}</label><br />
                        </div>)}</p>

                    </Card>
                </div>)}

                <button className='btn btn-danger btn-large' style={{ marginLeft: '20%', marginTop: '2rem', marginBottom: '2rem' }} onClick={submitResponseHandler}>Submit Response</button>

            </div>
        </div>
    </Fragment>
}

export default connect(null, { setAlert })(NewForm)