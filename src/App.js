import React, { Component, Fragment } from 'react';
import Friend from './Friend';
import Message from './Message';
import friends from './friends.json';
import messages from './messages.json';
import './App.css';

class App extends Component {
  state = {
    chatWith: '',
    messages,
    friends
  }

  componentDidMount() {
    setTimeout(() => this.setState(prevState => {
      const friends = prevState.friends.map(f => (
        f.name === 'Lana' ? { ...f, online: true } : { ...f }
      ));
      this.setState({ friends });
    }), 3000);
  }

  openChat = name => {
    const messages = this.state.messages
      .map(msg => (!msg.read && msg.from === name) ? { ...msg, read: true } : msg);
    this.setState({
      chatWith: name,
      messages
    });
  }

  closeChat = () => {
    this.setState({ chatWith: '' });
  }

  render() {
    const { chatWith, messages, friends } = this.state;
    const notread = messages.filter(m => !m.read);
    const filtered = messages.filter(msg => msg.from === chatWith);
    return (
      <div className="App">
        <nav>
          <span className="Title">WildBook</span>
          <span className="icon-bubble2" />
          <span className="Notif">{notread.length}</span>
        </nav>
        <div className="Wrapper">
          <main>
            <div className={`Chat-wrapper ${chatWith ? 'expand': ''}`}>
              <div className="Chat-collapse">
                <div className="Chat-header">
                  <span className="friend-name">{chatWith}</span>
                  <span className="close icon-cross" onClick={this.closeChat} />
                </div>
                <div className="Messages-inner">
                  {
                    filtered.map(m => (
                      <Message {...m} />
                    ))
                  }
                </div>
                <textarea rows="5" />
              </div>
            </div>
          </main>
          <aside>
            {
              friends.map(f => (
                <Friend
                  key={f.name}
                  {...f}
                  onClick={() => this.openChat(f.name)}
                />
              ))
            }
          </aside>
        </div>
      </div>
    );
  }
}

export default App;
