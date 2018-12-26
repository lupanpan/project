import React from 'react'
import PropTypes from 'prop-types'

function ListContacts(props) {
    return (
        <ol className='contact-list'>
            {props.contacts.map((contacts) => (
                <li key={contacts.id} className='contact-list-item'>
                    <div className="contact-avatar" style={{
                        backgroundImage: `url(${contacts.avatarURL})`
                    }}></div>
                    <div className="contact-details">
                        <p>{contacts.name}</p>
                        <p>{contacts.email}</p>
                    </div>
                    <button onClick={() => props.onDeleteContact(contacts)} className="contact-remove">
                        remove
                    </button>
                </li>
            ))}
        </ol>
    )
}

// class ListContacts extends Component {
//     render() {
//
//     }
// }

ListContacts.propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
}

export default ListContacts