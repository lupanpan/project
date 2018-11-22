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

    /**
     * A custom <input> that dynamically reads and resizes image files before
     * submitting them to the server as data URLs. Also, shows a preview of the image.
     * 一个自定义<input>，在此之前动态读取和调整图像文件的大小以数据url的形式提交给服务器。同时，显示图像的预览。
     */
    class ImageInput extends React.Component {

    }
}



