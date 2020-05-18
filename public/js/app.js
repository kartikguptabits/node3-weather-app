console.log('client side loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorPara = document.querySelector('#Error')
const successPara = document.querySelector('#Success')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    errorPara.textContent = 'Checking the weather....'
    successPara.textContent = ''
    fetch('/weather?place=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorPara.textContent = data.error
            }
            else {
                errorPara.textContent = ''
                successPara.textContent = data.forecast
            }
        })
    })

    
})