import React, { Component } from 'react';

const UserContext = React.createContext({
  currentUser: 'Guest',
  isAuthenticated: false,
  signIn: () => {},
  signOut: () => {}
});

class UserContextWrapper extends Component {
  constructor(props) {
    super(props);

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.getToken = this.getToken.bind(this);
    this._updateToken = this._updateToken.bind(this);

    this.state = {
      currentUser: 'Guest',
      isAuthenticated: false,
      signIn: this.signIn,
      signOut: this.signOut,
      getToken: this.getToken,
      _updateToken: this._updateToken
    };
  }

  getToken() {
    return this._getToken('_dvAccessToken');
  }

  // storeItem(key, _value) {
  //   if (!localStorage) return;

  //   try {
  //     return localStorage.setItem(key, _value);
  //   } catch (err) {
  //     console.error(`Error storing item ${key} to localStoragee`, err);
  //   }
  // }

  _updateToken(token) {
    if (!(token && token.length > 0)) return;
    localStorage.setItem('_dvAccessToken', token);

    // debugger;

    let cUser = Object.assign({}, this.state.currentUser);
    cUser.jwt = token;

    this.setState({ currentUser: cUser });

    // this.setState(function(prevState, token) {
    //   return {
    //     currentUser: {
    //       jwt: token,
    //       id: prevState.currentUser.id
    //     }
    //   };
    // });
  }

  _getToken(key) {
    if (!localStorage) return;

    try {
      return localStorage.getItem(key);
    } catch (err) {
      console.error(`Could not fetch the needed ${key} from localStorage`, err);
    }
  }

  signIn(args) {
    if (!args) {
      return;
    }

    if (args.jwt && args.id) {
      localStorage.setItem('_dvAccessToken', args.jwt);
      localStorage.setItem('_dvAccessId', args.id);

      this.setState({
        currentUser: args,
        isAuthenticated: true
      });
    }
  }

  signOut() {
    this.setState({
      currentUser: 'Guest',
      isAuthenticated: false
    });

    localStorage.removeItem('_dvAccessToken');
    localStorage.removeItem('_dvAccessId');
  }

  componentWillMount() {
    let _accessToken = this.getToken();
    let _accessId = this._getToken('_dvAccessId');

    if (_accessToken && _accessId) {
      this.setState({
        currentUser: { jwt: _accessToken, id: _accessId },
        isAuthenticated: true
      });
    } else {
      this.signOut();
    }
  }

  // componentDidMount() {
  //   // let _token = this.getToken();
  //   // if (_token) {
  //   //   console.log('foundToken');
  //   //   this.setState({
  //   //     currentUser: { jwt: _token },
  //   //     isAuthenticated: true
  //   //   });
  //   // } else {
  //   //   console.log('didNotFindToken');
  //   // }
  // }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export { UserContextWrapper, UserContext };
