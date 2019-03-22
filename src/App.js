import React, { Component, Fragment } from 'react';
import Friend from './Friend';
import Message from './Message';
import friends from './friends.json';
import messages from './messages.json';
import './App.css';

class App extends Component {
  state = {
    showMsg: false,
    name: '',
    messages,
    friends,
    filtered: []
  }

  componentDidMount() {
    setTimeout(() => this.setState(prevState => {
      const friends = prevState.friends.map(f => (
        f.name === 'Lana' ? { ...f, online: true } : { ...f }
      ));
      this.setState({ friends });
    }), 3000);
  }

  showMessages = name => {
    const messages = this.state.messages
      .map(msg => (!msg.read && msg.from === name) ? { ...msg, read: true } : msg);
    const filtered = messages.filter(msg => msg.from === name);
    this.setState({
      showMsg: true,
      name,
      messages,
      filtered
    });
  }
  render() {
    const { showMsg, messages, friends, filtered, name } = this.state;
    const notread = messages.filter(m => !m.read);
    return (
      <div className="App">
        <nav>
          <span className="Title">WildBook</span>
          <span className="Notif">{notread.length}</span>
        </nav>
        <div className="Wrapper">
          <main>
            <div className={`Messages-wrapper ${showMsg ? 'expand': ''}`}>
              <div className="Messages-collapse">
                <div className="Friend-name">{name}</div>
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
                  onClick={() => this.showMessages(f.name)}
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
