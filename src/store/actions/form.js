import axios from 'axios'

export const addForm = (form) => async dispatch => {
    console.log(form)
    // dispatch(formsStart())
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        await axios.post('http://localhost:5000/api/forms', JSON.stringify(form), config)
        // await axios.Form('/api/Forms', text, config)
        // dispatch(loadForms())
    } catch (error) {
        console.log(error, error.response)
        // dispatch(FormsError(error.response.data.msg))
    }
}