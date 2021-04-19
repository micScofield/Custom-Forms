import { Fragment } from 'react'
import { connect } from 'react-redux'

import formatDate from '../utility/formatDate'
import Card from '../UI/Card/Card'

const ListForms = props => {

    //fetching existed forms
    const existed = localStorage.getItem('question')
    let forms = existed ? JSON.parse(existed) : []

    // Calculating responses for each form
    if (forms.length !== 0) {
        const responses = JSON.parse(localStorage.getItem('responses'))
        const formNames = []
        responses && responses.filter(response => formNames.push(response.formName))

        var counts = {};

        for (var i = 0; i < formNames.length; i++) {
            var num = formNames[i];
            counts[num] = counts[num] ? counts[num] + 1 : 1;
        }

        console.log(counts)
    }

    //specifying alert classes
    const alertClasses = ['alert']
    if (props.alertType === 'success') alertClasses.push('alert-primary')
    else alertClasses.push('alert-danger')

    let content = forms.length === 0 ? <h1 style={{textAlign: 'center'}}>No forms to display !</h1> : (<Fragment>

        {forms.map(form => <div id={form.id} className='my-bottom-1'>
            {props.alertMsg && <p className={alertClasses.join(' ')}>{props.alertMsg}</p>}

            <Card>
                <p className='medium'>Form name: <strong>{form.formName}</strong></p>
                <p id="url" onClick={() => props.history.push(`/${form.id}`)} style={{ cursor: 'pointer' }}>{form.url}</p>
                <p>Created At: {formatDate(form.date)}</p>
                <p>Total responses till date: {counts[form.formName] ? counts[form.formName] : 0}</p>
            </Card>
        </div>)}
    </Fragment>)

    return <Fragment>
        <button className='btn btn-light btn-large' style={{ marginLeft: '20%' }} onClick={() => props.history.goBack()}>Go Back</button>
        <button className='btn btn-light btn-large' onClick={() => props.history.push('/')}>Go Home</button>
        {content}
    </Fragment>
}

const mapStateToProps = state => ({
    alertMsg: state.alert.msg,
    alertType: state.alert.type
})

export default connect(mapStateToProps)(ListForms)