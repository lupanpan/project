import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    // 搜索控件的受阻控件，input修改时更改值
    updateQuery = (query) => {
        this.setState({query: query.trim()})
    }

    // 清空搜索内容
    clearQuery = () => {
        this.setState({query: ''})
    }

    render() {
        // 解构赋值，提取出变量
        const {contacts, onDeleteContact} = this.props
        const {query} = this.state

        let showingContacts
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            showingContacts = contacts.filter((contact) => match.test(contact.name))
        }
        else {
            showingContacts = contacts
        }

        return (
            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input
                        className='search-contacts'
                        type="text"
                        placeholder='earch contacts'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>

                {showingContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>Now Showing {showingContacts.length} of {contacts.length} total</span>
                        <button onClick={this.clearQuery}>Show all</button>
                    </div>
                )}

                <ol className='contact-list'>
                    {showingContacts.map((contacts) => (
                        <li key={contacts.id} className='contact-list-item'>
                            <div className="contact-avatar" style={{
                                backgroundImage: `url(${contacts.avatarURL})`
                            }}></div>
                            <div className="contact-details">
                                <p>{contacts.name}</p>
                                <p>{contacts.email}</p>
                            </div>
                            <button onClick={() => onDeleteContact(contacts)} className="contact-remove">
                                remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default ListContacts