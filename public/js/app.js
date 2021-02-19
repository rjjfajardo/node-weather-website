

// fetch('http://puzzle.mead.io/puzzle').then((response) => { // asycn IO operation
//     response.json().then((data) => {
//        console.log(data)
        
//     })
// }) 

// fetch('http://localhost:3000/weather?address=').then((response) => {
//     response.json().then((data) => {
//     if(data.error){
//         console.log(data.error)
//     }else{
//         // const det = JSON.parse(data); res.text is not parse in to json so you need to parse the object before it can be use
//         // console.log(det.loc)
//         // console.log(det.forecast)
//          console.log(data.loc)
//         console.log(data.forecast)
//     }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
// messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const locationValue = search.value


    messageOne.textContent = 'Waiting for response....'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    
    
    fetch('/weather?address=' + locationValue).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.loc
            messageTwo.textContent = data.forecast
            messageThree.textContent = data.lat
            messageFour.textContent= data.long
        }
    })
})

})

