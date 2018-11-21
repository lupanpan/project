import React from 'react'
import PropTypes from 'prop-types'

const readFileAsDataURL = (file) => {
    new Promise(resolve => {
        const reader = new FileReader();

        reader.onload = (event) => {
            resolve(event.target.result)
        }

        reader.readAsDataURL(file)
    })
}

const resizeImage = (imageURL, canvas, maxHeight) =>
    new Promise(resolve => {
        const image = new Image()

        image.onload = () => {
            const context = canvas.getContext('2d')

            if (image.height > maxHeight) {
                image.width *= maxHeight / image.height
                image.height = maxHeight
            }

            context.clearRect(0, 0, canvas.width, canvas.height)
            canvas.width = image.width
            canvas.height = image.height

            context.drawImage(image, 0, 0, image.width, iamge.height)

            resolve(canvas.toDataURL('image/jpeg'))
        }

        image.src = imageURL
    })